﻿namespace ShoppingAppMVC.Models.EF
{
    public partial class Cart
    {
        public int Id { get; set; }
        public string? ItemName { get; set; }
        public decimal? Cost { get; set; }
        public int? Quantity { get; set; }
        public virtual Item? ItemNameNavigation { get; set; }
    }
}
