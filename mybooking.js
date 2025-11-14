const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const container = document.getElementById("mybookingsbontainer");

bookings.forEach((b) => {
    container.innerHTML += `
        <div class="booking-card p-4 login-card mb-4">
            <h2 class="font-orbitron text-xl">Booking #${b.id}</h2>
            <p><strong>Destination:</strong> ${b.destination.name}</p>
            <p><strong>Passengers:</strong> ${b.passengers.length}</p>
            <p><strong>Total:</strong> ${b.totalCost} USD</p>
            <p><strong>Date:</strong> ${b.bookingDate}</p>
        </div>`;
});