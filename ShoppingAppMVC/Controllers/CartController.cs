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
    public class CartController : Controller
    {
        private readonly shoppingDBContext _context = new shoppingDBContext();

        public async Task<IActionResult> Index()
        {
            return _context.Items != null ?
                View(await _context.Carts.ToListAsync()) :
                Problem("Entity set 'shoppingDBContext.Carts' is null.");
        }

        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddToCart([Bind("ItemName,Cost,Quantity")]Cart product)
        {
            if (ModelState.IsValid)
            {
                this._context.Carts.Add(product);
                await _context.SaveChangesAsync();
                //return View(product);
            }

            return View(product);
        }
    }
}