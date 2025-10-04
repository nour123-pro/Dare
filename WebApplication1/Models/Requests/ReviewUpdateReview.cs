namespace WebApplication1.Models.Requests
{
    public class ReviewUpdateRequest
{
    public Guid ReviewId { get; set; }
    public Guid AccountId { get; set; }
    public Guid ProductId { get; set; }
    public string ReviewContent { get; set; }
    public int RatingNumber { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
}

}