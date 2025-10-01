// FILE: /app/api/movies/route.ts
// PURPOSE: Fetches all available movies
// METHOD: GET

// GET /api/movies
export async function GET() {
  const movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      genre: "Sci-Fi",
      duration: "166 min",
      rating: "PG-13",
      poster: "🏜️",
      price: 50000,
    },
    {
      id: 2,
      title: "Oppenheimer",
      genre: "Biography",
      duration: "180 min",
      rating: "R",
      poster: "💣",
      price: 50000,
    },
    {
      id: 3,
      title: "The Marvels",
      genre: "Action",
      duration: "105 min",
      rating: "PG-13",
      poster: "⚡",
      price: 50000,
    },
  ];

  return Response.json(movies);
}
