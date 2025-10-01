// FILE: /app/api/showtimes/[movieId]/route.ts
// PURPOSE: Fetches showtimes for a specific movie
// METHOD: GET
// PARAMS: movieId - The ID of the movie

interface Showtime {
  id: number;
  time: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  bookedSeats: number[];
}

export async function GET(
  request: Request,
  context: { params: Promise<{ movieId: string }> }
) {
  const { movieId: movieIdParam } = await context.params;
  const movieId = parseInt(movieIdParam);

  // Mock data - map movies to their showtimes
  const movieShowtimes: Record<number, Showtime[]> = {
    1: [
      {
        id: 1,
        time: "10:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 50,
        availableSeats: 45,
        bookedSeats: [2, 5, 8, 15, 23],
      },
      {
        id: 2,
        time: "14:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 40,
        availableSeats: 32,
        bookedSeats: [1, 3, 7, 12, 18, 25, 30, 35],
      },
      {
        id: 3,
        time: "19:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 60,
        availableSeats: 28,
        bookedSeats: [
          2, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 33, 35, 38, 40, 42, 45,
          47, 50, 52, 55, 57, 58, 59, 60, 11, 13, 16, 19, 21, 24,
        ],
      },
    ],
    2: [
      {
        id: 4,
        time: "11:30",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 80,
        availableSeats: 15,
        bookedSeats: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
          55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
        ],
      },
      {
        id: 5,
        time: "16:30",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 30,
        availableSeats: 28,
        bookedSeats: [5, 15],
      },
    ],
    3: [
      {
        id: 6,
        time: "13:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 50,
        availableSeats: 47,
        bookedSeats: [10, 20, 30],
      },
      {
        id: 7,
        time: "18:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 50,
        availableSeats: 45,
        bookedSeats: [5, 15, 25, 35, 45],
      },
    ],
    4: [
      {
        id: 8,
        time: "12:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 60,
        availableSeats: 55,
        bookedSeats: [1, 2, 3, 4, 5],
      },
      {
        id: 9,
        time: "17:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 60,
        availableSeats: 50,
        bookedSeats: [10, 20, 30, 40, 50, 11, 21, 31, 41, 51],
      },
      {
        id: 10,
        time: "21:00",
        date: "Sabtu, 5 Oktober 2025",
        totalSeats: 60,
        availableSeats: 58,
        bookedSeats: [25, 26],
      },
    ],
  };

  const showtimes = movieShowtimes[movieId] || [];

  return Response.json(showtimes);
}
