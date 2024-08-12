using AutoMapper;
using Lab.Api.DTO;
using Lab.Api.Models;
using Lab.Api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Lab.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsuariosController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetUsuarios")]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _unitOfWork.UsuarioRepository.GetAsync();
            return Ok(_mapper.Map<List<UsuarioDTO>>(usuarios));
        }

        [HttpGet("GetUsuarioByGuid/{GUID}")]
        public async Task<IActionResult> GetUsuarioByGuid(string GUID)
        {
            var usuarios = await _unitOfWork.UsuarioRepository.GetSingleAsync(x=>x.Guid==GUID);
            return Ok(_mapper.Map<UsuarioDTO>(usuarios));
        }

        [HttpPost("CreateUsuario")]
        public async Task<IActionResult> CreatetUsuarios(UsuarioDTO dto)
        {
            var usuarios = _mapper.Map<Usuario>(dto);
            usuarios.Guid = Guid.NewGuid().ToString();
            usuarios.Codigo = usuarios.Codigo ?? string.Empty;
            usuarios.Pass = BCrypt.Net.BCrypt.HashPassword(dto.Pass);

            if (string.IsNullOrWhiteSpace(usuarios.Vigencia.ToString()))
            {
                usuarios.Vigencia = null;
            }

            await _unitOfWork.UsuarioRepository.Add(usuarios);
            await _unitOfWork.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("UpdateUsuario")]
        public async Task<IActionResult> UpdateUsuario(UsuarioDTO dto)
        {
            var data = await _unitOfWork.UsuarioRepository.GetSingleAsync(x=>x.Id==dto.Id);
            if (data == null)
            {
                return BadRequest();
            }
            _mapper.Map(dto, data);
            _unitOfWork.UsuarioRepository.Update(data);
            await _unitOfWork.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("DeleteUsuario/{Id}")]
        public async Task<IActionResult> DeleteUsuario(int Id)
        {
            var data = await _unitOfWork.UsuarioRepository.GetSingleAsync(x => x.Id == Id);
            if (data == null)
            {
                return BadRequest("El empleado no existe");
            }
            _unitOfWork.UsuarioRepository.Delete(data);
            await _unitOfWork.SaveChangesAsync();
            return Ok();
        }
    }
}
