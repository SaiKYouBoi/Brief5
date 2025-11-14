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
            <div class="booking-card p-4 login-card mb-4">
                <h2 class="font-orbitron text-xl">Booking #${b.id}</h2>
                <p><strong>Destination:</strong> ${b.destination.name}</p>
                <p><strong>Passengers:</strong> ${b.passengers.length}</p>
                <p><strong>Total:</strong> ${b.totalCost} USD</p>
                <p><strong>Date:</strong> ${b.bookingDate}</p>
            </div>`;
    });
}
