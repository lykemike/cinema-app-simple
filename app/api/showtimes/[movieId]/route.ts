// FILE: /app/api/showtimes/[movieId]/route.ts
// PURPOSE: Fetches available showtimes for a specific movie
// METHOD: GET
// PARAMS: movieId - The ID of the movie

// GET /api/showtimes/:movieId
export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  // In production, filter by movieId and fetch from database
  const showtimes = [
    {
      id: 1,
      time: "10:00 AM",
      date: "2025-10-03",
      totalSeats: 50,
      availableSeats: 45,
      bookedSeats: [2, 5, 8, 15, 23],
    },
    {
      id: 2,
      time: "1:30 PM",
      date: "2025-10-03",
      totalSeats: 40,
      availableSeats: 32,
      bookedSeats: [1, 3, 7, 12, 18, 25, 30, 35],
    },
    {
      id: 3,
      time: "4:45 PM",
      date: "2025-10-03",
      totalSeats: 60,
      availableSeats: 28,
      bookedSeats: [
        2, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 33, 35, 38, 40, 42, 45, 47,
        50, 52, 55, 57, 58, 59, 60, 11, 13, 16, 19, 21, 24,
      ],
    },
    {
      id: 4,
      time: "7:30 PM",
      date: "2025-10-03",
      totalSeats: 80,
      availableSeats: 15,
      bookedSeats: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64, 65,
      ],
    },
    {
      id: 5,
      time: "10:15 PM",
      date: "2025-10-03",
      totalSeats: 30,
      availableSeats: 28,
      bookedSeats: [5, 15],
    },
  ];

  return Response.json(showtimes);
}
