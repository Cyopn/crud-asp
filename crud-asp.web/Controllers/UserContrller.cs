using crud_asp.web.Services;
using Microsoft.AspNetCore.Mvc;

namespace crud_asp.web.Controllers
{
    public class UserContrller : Controller
    {
        private readonly IUserService _userService;
        public UserContrller(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task<IActionResult> Index()
        {
            var users = await _userService.GetUsers();
            return View(users);
        }
    }
}
