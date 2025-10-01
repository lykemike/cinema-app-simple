// FILE: /app/api/seats/[showtimeId]/route.ts
// PURPOSE: Fetches seat availability for a specific showtime
// METHOD: GET
// PARAMS: showtimeId - The ID of the showtime

// GET /api/seats/:showtimeId
export async function GET(
  request: Request,
  { params }: { params: Promise<{ showtimeId: string }> }
) {
  const { showtimeId: showtimeIdParam } = await params;
  const showtimeId = parseInt(showtimeIdParam);

  // Mock data - map showtimes to their configurations
  const showtimeConfig: Record<number, { total: number; booked: number[] }> = {
    1: { total: 50, booked: [2, 5, 8, 15, 23] },
    2: { total: 40, booked: [1, 3, 7, 12, 18, 25, 30, 35] },
    3: {
      total: 60,
      booked: [
        2, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 33, 35, 38, 40, 42, 45, 47,
        50, 52, 55, 57, 58, 59, 60, 11, 13, 16, 19, 21, 24,
      ],
    },
    4: {
      total: 80,
      booked: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64, 65,
      ],
    },
    5: { total: 30, booked: [5, 15] },
  };

  const config = showtimeConfig[showtimeId] || { total: 50, booked: [2, 5, 8] };

  const seats = Array.from({ length: config.total }, (_, i) => ({
    number: i + 1,
    isBooked: config.booked.includes(i + 1),
  }));

  return Response.json({
    totalSeats: config.total,
    availableSeats: config.total - config.booked.length,
    seats,
  });
}
