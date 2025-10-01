// FILE: /app/api/movies/route.ts
// PURPOSE: Fetches the list of available movies
// METHOD: GET

export async function GET() {
  const movies = [
    {
      id: 1,
      title: "The Last Voyage",
      genre: "Sci-Fi Adventure",
      duration: "2h 30m",
      rating: "PG-13",
      poster: "🚀",
      price: 50000,
    },
    {
      id: 2,
      title: "Shadows of Tomorrow",
      genre: "Thriller",
      duration: "1h 55m",
      rating: "R",
      poster: "🕵️",
      price: 45000,
    },
    {
      id: 3,
      title: "Love in Paris",
      genre: "Romance",
      duration: "2h 10m",
      rating: "PG",
      poster: "💕",
      price: 40000,
    },
    {
      id: 4,
      title: "Dragon Warrior",
      genre: "Action Fantasy",
      duration: "2h 45m",
      rating: "PG-13",
      poster: "🐉",
      price: 55000,
    },
  ];

  return Response.json(movies);
}
