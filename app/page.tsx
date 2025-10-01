// FILE: /app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Film, Clock, Users, CreditCard, CheckCircle } from "lucide-react";

// TYPE DEFINITIONS
interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  poster: string;
  price: number;
}

interface Showtime {
  id: number;
  time: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  bookedSeats: number[];
}

interface Seat {
  number: number;
  isBooked: boolean;
}

interface SeatsResponse {
  totalSeats: number;
  availableSeats: number;
  seats: Seat[];
}

interface BookingResult {
  success: boolean;
  bookingId: string;
  confirmationCode: string;
  totalPrice: number;
}

export default function CinemaBookingApp() {
  const [step, setStep] = useState<
    "movies" | "showtimes" | "seats" | "tickets" | "confirmation"
  >("movies");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(
    null
  );
  const [seatMap, setSeatMap] = useState<Seat[]>([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [numTickets, setNumTickets] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(
    null
  );

  useEffect(() => {
    loadMovies();
  }, []);

  /**
   * Fetches the list of movies from the API
   */
  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error loading movies:", error);
      alert("Gagal memuat film. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles movie selection and fetches showtimes
   */
  const selectMovie = async (movie: Movie) => {
    setSelectedMovie(movie);
    setLoading(true);

    try {
      const response = await fetch(`/api/showtimes/${movie.id}`);
      const data = await response.json();
      setShowtimes(data);
      setStep("showtimes");
    } catch (error) {
      console.error("Error loading showtimes:", error);
      alert("Gagal memuat jadwal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles showtime selection and fetches seat availability
   */
  const selectShowtime = async (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    setLoading(true);

    try {
      const response = await fetch(`/api/seats/${showtime.id}`);
      const data: SeatsResponse = await response.json();
      setSeatMap(data.seats);
      setTotalSeats(data.totalSeats);
      setSelectedSeats([]);
      setStep("seats");
    } catch (error) {
      console.error("Error loading seats:", error);
      alert("Gagal memuat kursi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggles seat selection
   */
  const toggleSeat = (seatNumber: number) => {
    const seat = seatMap.find((s) => s.number === seatNumber);
    if (!seat || seat.isBooked) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  /**
   * Proceeds to confirmation step
   */
  const proceedToTickets = () => {
    setNumTickets(selectedSeats.length);
    setStep("tickets");
  };

  /**
   * Confirms booking and sends to API
   */
  const confirmBooking = async () => {
    setLoading(true);

    const bookingData = {
      movieId: selectedMovie!.id,
      showtimeId: selectedShowtime!.id,
      seats: selectedSeats,
      numTickets: numTickets,
      totalPrice: numTickets * selectedMovie!.price,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      setBookingResult(result);
      setStep("confirmation");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Gagal membuat pemesanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets booking state
   */
  const resetBooking = () => {
    setStep("movies");
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setNumTickets(0);
    setSelectedSeats([]);
    setSeatMap([]);
    setTotalSeats(0);
    setBookingResult(null);
  };

  /**
   * Format price to IDR
   */
  const formatIDR = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  // Calculate seats per row for display
  const seatsPerRow = Math.ceil(Math.sqrt(totalSeats));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">CineBook</h1>
          </div>
          <p className="text-purple-200">
            Pesan tiket bioskop Anda dalam hitungan detik
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          <div
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium ${
              step === "movies"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 text-white"
            }`}
          >
            1. Film
          </div>
          <div
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium ${
              step === "showtimes"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 text-white"
            }`}
          >
            2. Jadwal
          </div>
          <div
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium ${
              step === "seats"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 text-white"
            }`}
          >
            3. Kursi
          </div>
          <div
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium ${
              step === "tickets"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 text-white"
            }`}
          >
            4. Konfirmasi
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 min-h-96">
          {/* STEP 1: Movies List */}
          {step === "movies" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Sedang Tayang
              </h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => selectMovie(movie)}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="text-6xl">{movie.poster}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {movie.genre} • {movie.rating}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="w-4 h-4" /> {movie.duration}
                          </p>
                          <p className="text-sm font-semibold text-purple-600 mt-2">
                            {formatIDR(movie.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Showtimes */}
          {step === "showtimes" && (
            <div>
              <button
                onClick={() => setStep("movies")}
                className="text-purple-600 mb-4 hover:underline"
              >
                ← Kembali ke film
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedMovie?.title}
              </h2>
              <p className="text-gray-600 mb-6">Pilih jadwal tayang</p>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {showtimes.map((showtime) => (
                    <div
                      key={showtime.id}
                      onClick={() => selectShowtime(showtime)}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {showtime.time}
                            </p>
                            <p className="text-sm text-gray-600">
                              {showtime.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {showtime.availableSeats} kursi tersisa
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Studio {showtime.totalSeats} kursi
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Seat Selection */}
          {step === "seats" && (
            <div>
              <button
                onClick={() => setStep("showtimes")}
                className="text-purple-600 mb-4 hover:underline"
              >
                ← Kembali ke jadwal
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Pilih Kursi Anda
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedMovie?.title} • {selectedShowtime?.time}
              </p>

              {/* Screen */}
              <div className="mb-8">
                <div className="bg-gray-800 text-white text-center py-2 rounded-t-3xl mb-6">
                  LAYAR
                </div>

                {/* Seats Grid */}
                <div className="flex justify-center mb-4">
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`,
                      maxWidth: "600px",
                    }}
                  >
                    {seatMap.map((seat) => (
                      <button
                        key={seat.number}
                        onClick={() => toggleSeat(seat.number)}
                        disabled={seat.isBooked}
                        className={`w-10 h-10 rounded-lg font-bold text-xs transition-all ${
                          seat.isBooked
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : selectedSeats.includes(seat.number)
                            ? "bg-purple-600 text-white shadow-lg scale-105"
                            : "bg-green-500 text-white hover:bg-green-600 hover:scale-105"
                        }`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                    <span className="text-gray-700">Tersedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded"></div>
                    <span className="text-gray-700">Dipilih</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <span className="text-gray-700">Terpesan</span>
                  </div>
                </div>
              </div>

              {/* Selected Seats Info */}
              {selectedSeats.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-gray-800">
                    Kursi Terpilih:{" "}
                    {selectedSeats.sort((a, b) => a - b).join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedSeats.length} tiket •{" "}
                    {formatIDR(selectedSeats.length * selectedMovie!.price)}
                  </p>
                </div>
              )}

              <button
                onClick={proceedToTickets}
                disabled={selectedSeats.length === 0}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjut ke Konfirmasi
              </button>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === "tickets" && (
            <div>
              <button
                onClick={() => setStep("seats")}
                className="text-purple-600 mb-4 hover:underline"
              >
                ← Kembali ke kursi
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Konfirmasi Pemesanan
              </h2>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="font-semibold text-gray-800">
                  {selectedMovie?.title}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedShowtime?.time} • {selectedShowtime?.date}
                </p>
                <p className="text-sm text-purple-600 font-medium mt-2">
                  Kursi: {selectedSeats.sort((a, b) => a - b).join(", ")}
                </p>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-600">Harga Tiket:</span>
                  <span className="text-gray-800">
                    {formatIDR(selectedMovie!.price)} × {numTickets}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-purple-600">
                    {formatIDR(numTickets * selectedMovie!.price)}
                  </span>
                </div>
              </div>

              <button
                onClick={confirmBooking}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Konfirmasi Pemesanan
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 5: Success */}
          {step === "confirmation" && bookingResult && (
            <div className="text-center py-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Pemesanan Berhasil!
              </h2>
              <p className="text-gray-600 mb-6">
                Tiket Anda telah berhasil dipesan
              </p>

              <div className="bg-purple-50 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-1">ID Pemesanan</p>
                <p className="font-mono font-bold text-lg text-purple-600 mb-4">
                  {bookingResult.bookingId}
                </p>

                <p className="text-sm text-gray-600 mb-1">Kode Konfirmasi</p>
                <p className="font-mono font-bold text-2xl text-gray-800 mb-4">
                  {bookingResult.confirmationCode}
                </p>

                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">
                    {selectedMovie?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedShowtime?.time} • {selectedShowtime?.date}
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    Kursi: {selectedSeats.sort((a, b) => a - b).join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {numTickets} Tiket • {formatIDR(bookingResult.totalPrice)}
                  </p>
                </div>
              </div>

              <button
                onClick={resetBooking}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Pesan Film Lainnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
