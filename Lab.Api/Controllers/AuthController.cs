using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Lab.Api.Repository;
using Lab.Api.DTO;

namespace Lab.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO loginDto)
        {
            var data = await _unitOfWork.UsuarioRepository.GetSingleAsync(x => x.Correo == loginDto.Correo);
            if (data == null || !BCrypt.Net.BCrypt.Verify(loginDto.Pass, data.Pass))
            {
                return Unauthorized();
            }

            var (token, expiration) = GenerateJwtToken(_mapper.Map<UsuarioDTO>(data));
            return Ok(new { Token = token, Expiration = expiration });
        }

        [HttpGet("validar-correo/{correo}")]
        public async Task<IActionResult> ValidateCorreo(string correo)
        {
            // Validar el correo
            var usuario = await _unitOfWork.UsuarioRepository.GetSingleAsync(x => x.Correo == correo);
            if (usuario == null)
            {
                return BadRequest("Correo no existe");
            }

            // Generar el codigo de verificacion
            usuario.Codigo = new Random().Next(1000, 9999).ToString();
            usuario.Vigencia = DateTime.Now.AddMinutes(5);
            _unitOfWork.UsuarioRepository.Update(usuario);
            await _unitOfWork.SaveChangesAsync();
            // Enviar el correo con el codigo de verificacion

            return Ok();
        }

        [HttpGet("validar-codigo/{correo}/{codigo}")]
        public async Task<IActionResult> ValidateCodigo(string correo, string codigo)
        {
            var usuario = await _unitOfWork.UsuarioRepository.GetSingleAsync(x => x.Correo == correo);
            if (usuario == null)
            {
                return BadRequest("Correo no existe");
            }

            if (usuario.Codigo != codigo || usuario.Vigencia < DateTime.Now)
            {
                return BadRequest("Codigo invalido o expirado");
            }

            return Ok();
        }

        // cambiar contrasñea
        [HttpPost("cambiar-contrasena")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDto)
        {
            var usuario = await _unitOfWork.UsuarioRepository.GetSingleAsync(x => x.Correo == changePasswordDto.Correo);
            if (usuario == null)
            {
                return BadRequest("Correo no existe");
            }

            if (usuario.Codigo != changePasswordDto.Codigo || usuario.Vigencia < DateTime.Now)
            {
                return BadRequest("Codigo invalido o expirado");
            }

            usuario.Pass = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.Contrasena);
            _unitOfWork.UsuarioRepository.Update(usuario);
            await _unitOfWork.SaveChangesAsync();

            var (token, expiration) = GenerateJwtToken(_mapper.Map<UsuarioDTO>(usuario));
            return Ok(new { Token = token, Expiration = expiration });
        }
        private (string token, DateTime expiration) GenerateJwtToken(UsuarioDTO usuario)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings.GetValue<string>("SecretKey");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Correo),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var expiration = DateTime.Now.AddMinutes(30);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"),
                audience: jwtSettings.GetValue<string>("Audience"),
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return (tokenString, expiration);
        }
    }
}
