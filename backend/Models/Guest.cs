namespace backend.Models;

public class Guest
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public List<GuestPerson> Persons { get; set; } = [];
    public Rsvp? Rsvp { get; set; }
}
