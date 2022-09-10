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

        public async Task<IActionResult> AddToCart([Bind("ItemName,Cost,Quantity")]Cart product)
        {
            if (ModelState.IsValid)
            {
                this._context.Carts.Add(product);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index", "Cart");
        }


        public async Task<IActionResult> UpdateCart(int id, int quantity)
        {
            if (_context.Carts == null)
            {
                return Problem("Entity set 'shoppingDBContext.Cart' is null");
            }

            var product = await _context.Carts.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

        //Received an error that the element couldn't be translated. But I think this is the right way to do it
            _context.Carts.ElementAt(id).Quantity = quantity;
            await _context.SaveChangesAsync();

            return RedirectToAction("Index", "Cart");
        }


    //Working url to remove items from cart based on id ~Cart/RemoveFromCart?id=1
    //Can remove by ID in the Cart Table
    //Cannot reset ID back to 1
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            if (_context.Carts == null)
            {
                return Problem("Entity set 'shoppingDBContext.Cart' is null");
            }

            var product = await _context.Carts.FindAsync(id);
            if (product != null)
            {
                _context.Carts.Remove(product);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Index", "Cart");
        }
    }
}