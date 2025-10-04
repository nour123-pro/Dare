using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class SendReviewRequest
    {
       
       
        public string? accountid{ get; set; }
       [Required(ErrorMessage ="Review content is is required")]
        public string reviewcontent{ get; set; }
[Required(ErrorMessage ="username is  required")]
         public string username{ get; set; }
         [Required(ErrorMessage ="productid is  required")]

         public string productid{ get; set; }

         [Required(ErrorMessage ="Rating number is required")]
         public string ratingnumber{ get; set; }
    }
}