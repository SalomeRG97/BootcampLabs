using Lab.Api.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Lab.Api.Repository
{
    public interface IUnitOfWork
    {
        IRepository<Usuario> UsuarioRepository { get; set; }

        IDbContextTransaction BeginTransaction();
        void Dispose();
        Task SaveChangesAsync();
    }

    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IRepository<Usuario> UsuarioRepository { get; set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            UsuarioRepository = new Repository<Usuario>(context);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IDbContextTransaction BeginTransaction()
        {
            return _context.Database.BeginTransaction();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
