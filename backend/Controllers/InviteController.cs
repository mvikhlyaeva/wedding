using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/invite")]
public class InviteController(AppDbContext db) : ControllerBase
{
    [HttpGet("{code}")]
    public async Task<IActionResult> Get(string code)
    {
        var guest = await db.Guests
            .Include(g => g.Persons)
            .Include(g => g.Rsvp)
            .FirstOrDefaultAsync(g => g.Code == code);

        if (guest is null)
            return NotFound(new { error = "Приглашение не найдено" });

        return Ok(new
        {
            code = guest.Code,
            name = guest.Name,
            persons = guest.Persons.Select(p => new
            {
                id = p.Id,
                name = p.Name,
                attending = p.Attending,
                dietaryRestrictions = p.DietaryRestrictions,
            }),
            rsvp = guest.Rsvp is null ? null : new
            {
                note = guest.Rsvp.Note,
                updatedAt = guest.Rsvp.UpdatedAt,
            },
        });
    }
}
