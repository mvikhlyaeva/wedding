namespace backend.Models;

public class GuestPerson
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public string Name { get; set; } = string.Empty;

    public bool? Attending { get; set; }
    public string? DietaryRestrictions { get; set; }

    public Guest Guest { get; set; } = null!;
}
