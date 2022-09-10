using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ShoppingAppMVC.Controllers
{
    [Authorize]
    public class ShoppingController : Controller
    {
        public IActionResult Checkout()
        {
            return View();
        }
    }
}
