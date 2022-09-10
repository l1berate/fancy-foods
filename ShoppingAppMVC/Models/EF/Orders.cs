using System;
using System.Collections.Generic;

namespace ShoppingAppMVC.Models.EF
{
    public partial class Orders
    {
        public int OrderNo { get; set; }

        //I think we should implement a list of Item property that can be sent from the cart
        //Unsure how cookies interact but I think theoretically that is the correct way
        public string? ItemName { get; set; }
        public decimal? Cost { get; set; }
        public int? Quantity { get; set; }
        public int UserNo { get; set; }
        public virtual Item? ItemNameNavigation { get; set; }
        public virtual User? UserNoNavigation { get; set; }
    }
}