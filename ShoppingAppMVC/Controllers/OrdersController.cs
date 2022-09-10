using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ShoppingAppMVC.Models.EF;

namespace ShoppingAppMVC.Controllers
{
    public class OrdersController : Controller
    {
        private readonly shoppingDBContext _context = new shoppingDBContext();

        public async Task<IActionResult> Index()
        {
            return _context.Items != null ?
                View(await _context.Orders.ToListAsync()) :
                Problem("Entity set 'shoppingDBContext.Carts' is null.");
        }    
    }
}