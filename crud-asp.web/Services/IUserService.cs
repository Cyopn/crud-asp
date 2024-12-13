using crud_asp.web.Models;

namespace crud_asp.web.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserModel>> GetUsers();
    }
}
