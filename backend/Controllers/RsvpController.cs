using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/rsvp")]
public class RsvpController(AppDbContext db) : ControllerBase
{
    public record PersonAnswer(int Id, bool Attending, string? DietaryRestrictions);
    public record RsvpRequest(string Code, List<PersonAnswer> Persons, string? Note);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RsvpRequest request)
    {
        var guest = await db.Guests
            .Include(g => g.Persons)
            .Include(g => g.Rsvp)
            .FirstOrDefaultAsync(g => g.Code == request.Code);

        if (guest is null)
            return NotFound(new { error = "Приглашение не найдено" });

        if (guest.Rsvp is not null)
            return BadRequest(new { error = "Ответ уже отправлен. Используйте PUT для изменения." });

        ApplyPersonAnswers(guest, request.Persons);

        db.Rsvps.Add(new Rsvp
        {
            GuestId = guest.Id,
            Note = request.Note,
            UpdatedAt = DateTime.UtcNow,
        });

        await db.SaveChangesAsync();
        return Ok(new { message = "Ответ сохранён" });
    }

    [HttpPut("{code}")]
    public async Task<IActionResult> Update(string code, [FromBody] RsvpRequest request)
    {
        var guest = await db.Guests
            .Include(g => g.Persons)
            .Include(g => g.Rsvp)
            .FirstOrDefaultAsync(g => g.Code == code);

        if (guest is null)
            return NotFound(new { error = "Приглашение не найдено" });

        if (guest.Rsvp is null)
            return NotFound(new { error = "Ответ ещё не был отправлен. Используйте POST." });

        ApplyPersonAnswers(guest, request.Persons);

        guest.Rsvp.Note = request.Note;
        guest.Rsvp.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return Ok(new { message = "Ответ обновлён" });
    }

    private static void ApplyPersonAnswers(Models.Guest guest, List<PersonAnswer> answers)
    {
        foreach (var answer in answers)
        {
            var person = guest.Persons.FirstOrDefault(p => p.Id == answer.Id);
            if (person is null) continue;

            person.Attending = answer.Attending;
            person.DietaryRestrictions = answer.DietaryRestrictions;
        }
    }
}
