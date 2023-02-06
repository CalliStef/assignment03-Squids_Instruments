
using Microsoft.EntityFrameworkCore;


class SquidEndpoints
{
    public void Configure(RouteGroupBuilder router)
    {
        router.MapGet("/", GetSquids);
        router.MapPost("/", CreateSquid);
    
        router.MapPut("/{id}", async (SomethingContext db, int id, Squid squid) =>
        {
            if (id != squid.Id)
            {
                return Results.BadRequest();
            }
            db.Entry(squid).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
        router.MapDelete("/{id}", async (SomethingContext db, int id) =>
        {
            var squid = await db.Squids.FindAsync(id);
            if (squid == null)
            {
                return Results.NotFound();
            }
            db.Squids.Remove(squid);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }

    Task<List<Squid>> GetSquids(SomethingContext db) => db.Squids.ToListAsync();
    async Task<IResult> CreateSquid(SomethingContext db, Squid squid)
    {
        db.Squids.Add(squid);
        await db.SaveChangesAsync();
        return Results.Created($"/api/squids/{squid.Id}", squid);
    }

}

