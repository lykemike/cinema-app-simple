// FILE: /app/api/bookings/route.ts
// PURPOSE: Creates a new booking
// METHOD: POST

interface BookingRequest {
  movieId: number;
  showtimeId: number;
  seats: number[];
  numTickets: number;
  totalPrice: number;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    // Validate the booking data
    if (
      !body.movieId ||
      !body.showtimeId ||
      !body.seats ||
      body.seats.length === 0
    ) {
      return Response.json(
        { success: false, error: "Data pemesanan tidak lengkap" },
        { status: 400 }
      );
    }

    // Generate booking ID and confirmation code
    const bookingId = `BK${Date.now()}${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
    const confirmationCode = `${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // In a real application, you would:
    // 1. Verify seat availability
    // 2. Lock the seats
    // 3. Process payment
    // 4. Store booking in database
    // 5. Send confirmation email

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return Response.json({
      success: true,
      bookingId,
      confirmationCode,
      totalPrice: body.totalPrice,
      seats: body.seats,
      movieId: body.movieId,
      showtimeId: body.showtimeId,
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return Response.json(
      { success: false, error: "Gagal memproses pemesanan" },
      { status: 500 }
    );
  }
}
