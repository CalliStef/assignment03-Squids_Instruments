using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");;
builder.Services.AddDbContext<SomethingContext>(opt => opt.UseNpgsql(connectionString));

var port = Environment.GetEnvironmentVariable("PORT") ?? "8081";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

// app.MapGet("/", ()  => "Hello World!");

var squidMapGroup = app.MapGroup("/api/squids");
var squidEndpoints = new SquidEndpoints();
squidEndpoints.Configure(squidMapGroup);

var instrumentMapGroup = app.MapGroup("/api/instruments");
var instrumentEndpoints = new InstrumentEndpoints();
instrumentEndpoints.Configure(instrumentMapGroup);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");


app.Run();



//builder.Configuration.GetConnectionString("DefaultConnection");