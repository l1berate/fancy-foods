using System;
using System.Collections.Generic;

namespace ShoppingAppMVC.Models.EF
{
    public partial class User
    {
        public int UserNo { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; } = null!;
    }
}
