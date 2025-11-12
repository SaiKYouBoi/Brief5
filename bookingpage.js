// Global variable to store destinations
var destinations = [];

// Fetch destinations and store in variable
function getDestinations() {
  return fetch("destinations.json")
    .then((response) => response.json())
    .then((data) => {
      destinations = Array.isArray(data.destinations) ? data.destinations : [];
    //   console.log(destinations);
    })
    .catch((error) => {
      console.error("Error fetching destinations:", error);
      destinations = [];
    });
}

// Elements
const destinationSelect = document.getElementById("destinationselect");
const acoomContainer = document.getElementById("acoomcontainer");

// Init the destination dropdown
function initDestinationSelect() {
  getDestinations().then(() => {
    destinations.forEach((destination) => {
    //   console.log("Destination:", destination);
      const option = document.createElement("option");
      option.value = destination.id;
      option.textContent = `${destination.name} (${destination.planet})`;
      destinationSelect.appendChild(option);
    });
  });
}

// Display accommodations for selected destination
function displayAccommodations(destinationId) {
  const selectedDestination = destinations.find((dest) => dest.id === destinationId);

  if (!selectedDestination) {
    acoomContainer.innerHTML =
      '<div class="no-selection">Please select a destination to view available accommodations</div>';
    return;
  }

  // Clear previous accommodations
  acoomContainer.innerHTML = "";

  // Create accommodation cards
  selectedDestination.accommodations.forEach((accommodationType) => {
    const card = document.createElement("div");
    card.className = "accommodation-card";

    const name = document.createElement("div");
    name.className = "accommodation-name";
    name.textContent =
      accommodationType.charAt(0).toUpperCase() +
      accommodationType.slice(1) +
      " Accommodation";

    const desc = document.createElement("div");
    desc.className = "accommodation-desc";
    desc.textContent =
      accommodationDescriptions[accommodationType] ||
      "Comfortable space accommodation for your journey.";

    card.appendChild(name);
    card.appendChild(desc);

    acoomContainer.appendChild(card);
  });
}

// Init page
document.addEventListener("DOMContentLoaded", function () {
  initDestinationSelect();
});
