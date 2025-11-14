const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  document.getElementById("mybookingsbontainer").innerHTML =
    "<p>You must log in to view your bookings.</p>";
} else {
  const key = "bookings_" + user.id;
  const bookings = JSON.parse(localStorage.getItem(key)) || [];

  const container = document.getElementById("mybookingsbontainer");

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings yet.</p>";
  }

  bookings.forEach((b) => {
    container.innerHTML += `
            <div class="booking-card p-4 login-card mb-4 flex justify-between">
                <div>
                <h2 class="font-orbitron text-xl">Booking #${b.id}</h2>
                <p><strong>Destination:</strong> ${b.destination.name}</p>
                <p><strong>Passengers:</strong> ${b.passengers.length}</p>
                <p><strong>Total:</strong> ${b.totalCost} USD</p>
                <p><strong>Date:</strong> ${b.bookingDate}</p>
                </div>
                <div>
                <button onclick="printBooking('${b.id}')"
                    class="printbutton px-4 py-2 bg-blue-600 rounded mt-3">
                    Print
                </button>
                </div>
            </div>`;
  });
}


function printBooking(bookingId) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const key = "bookings_" + user.id;
    const bookings = JSON.parse(localStorage.getItem(key)) || [];

    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Create printable content
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <html>
        <head>
            <title>Booking #${booking.id}</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 20px;
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 18px;
                    margin: 4px 0;
                }
                .box {
                    border: 1px solid #333;
                    padding: 20px;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>Booking Receipt</h1>
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p><strong>Destination:</strong> ${booking.destination.name}</p>
                <p><strong>Passengers:</strong> ${booking.passengers.length}</p>
                <p><strong>Accommodation:</strong> ${booking.accommodation.name}</p>
                <p><strong>Total Cost:</strong> ${booking.totalCost} USD</p>
                <p><strong>Departure Date:</strong> ${booking.bookingDate}</p>
            </div>
            <script>
                window.print();
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
}