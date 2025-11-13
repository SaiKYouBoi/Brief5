let destinations = [];
let accommodations = [];

// fetch both destinations and accommodations
function getDestinations() {
  return Promise.all([
    fetch("destinations.json").then(response => response.json()),
    fetch("accommodations.json").then(response => response.json())
  ])
  .then(([destinationsData, accommodationsData]) => {
    destinations = Array.isArray(destinationsData.destinations) ? destinationsData.destinations : [];
    accommodations = Array.isArray(accommodationsData.accommodations) ? accommodationsData.accommodations : [];
    initDestinationSelect();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    destinations = [];
    accommodations = [];
  });
}

// elements
const destinationSelect = document.getElementById("destinationselect");
const acoomContainer = document.getElementById("acoomContainer");

function initDestinationSelect() {
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = `${destination.name} (${destination.planet})`;
    destinationSelect.appendChild(option);
  });
}

// display accommodations for the selected destination
function displayAccommodations(destinationId) {
  const selectedDestination = destinations.find(
    (dest) => dest.id == destinationId
  );
 

  acoomContainer.innerHTML = "";

  if (!selectedDestination) {
    acoomContainer.innerHTML = "<div>Please select a destination.</div>";
    return;
  }

//console.log(selectedDestination)

 let accomcont = "";
  selectedDestination.accommodations.forEach((accomId) => {
    // find the accommodation by id
    const accomDetails = accommodations.find(acc => acc.id === accomId);
    // console.log(accomId)
    const price = accomDetails ? `$${accomDetails.pricePerDay}/day` : "Price not available";
    
    accomcont += `
      <div class="accom flex-1 h-full py-3 px-4">
        <h3 class="font-orbitron text-lg mb-2 text-glow text-neon-blue">${accomDetails ? accomDetails.name : accomId}</h3>
        <p>${price}</p>
      </div>
    `;
  });

  acoomContainer.innerHTML = accomcont;
}

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  getDestinations();

  destinationSelect.addEventListener("change", function () {
    displayAccommodations(this.value);
    // console.log(this.value);
  });
});

