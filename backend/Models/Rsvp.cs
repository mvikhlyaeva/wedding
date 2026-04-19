namespace backend.Models;

public class Rsvp
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public string? Note { get; set; }
    public DateTime UpdatedAt { get; set; }

    public Guest Guest { get; set; } = null!;
}
