namespace Lab.Api.DTO
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Correo { get; set; }
        public string Pass { get; set; }
        public string Nombre { get; set; }
        public string Guid { get; set; }
        public DateTime? Vigencia { get; set; }
        public string Codigo { get; set; }
    }

}
