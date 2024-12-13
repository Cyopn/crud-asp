using crud_asp.web.Helpers;
using crud_asp.web.Models;

namespace crud_asp.web.Services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;
        public const string Path = "/api/getUsers";
        public UserService(HttpClient httpClient)
        {
            _httpClient = httpClient??throw new ArgumentNullException(nameof(httpClient));
        }
        public async Task<IEnumerable<UserModel>> GetUsers()
        {
            var response =await _httpClient.GetAsync(Path);
            return await response.ReadContentAsync<List<UserModel>>();
        }
    }
}
