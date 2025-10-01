// FILE: /app/api/bookings/route.ts
// PURPOSE: Creates a new booking
// METHOD: POST
// BODY: { movieId, showtimeId, seats, numTickets, totalPrice }

// POST /api/bookings
export async function POST(request: Request) {
  const body = await request.json();

  // In production:
  // 1. Validate seats are still available
  // 2. Save to database
  // 3. Mark seats as booked
  // 4. Process payment
  // 5. Send confirmation email

  const booking = {
    success: true,
    bookingId: `BK${Date.now()}`,
    confirmationCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
    currency: "IDR",
    bookingDate: new Date().toISOString(),
    ...body,
  };

  return Response.json(booking);
}
