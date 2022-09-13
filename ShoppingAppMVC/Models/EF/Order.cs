using System;
using System.Collections.Generic;

namespace ShoppingAppMVC.Models.EF
{
    public partial class Order
    {
        public int OrderNumber { get; set; }
        public string? ItemsList { get; set; }
        public string? FullName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Address { get; set; }
        public string? CardNumber { get; set; }
        public string? ExpDate { get; set; }
        public string? CvvNumber { get; set; }
    }
}
