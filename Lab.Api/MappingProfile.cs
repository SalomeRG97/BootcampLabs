using AutoMapper;
using Lab.Api.DTO;
using Lab.Api.Models;

namespace Lab.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioLoginDTO>().ReverseMap();
            CreateMap<Usuario, ChangePasswordDTO>().ReverseMap();
        }
    }
}
