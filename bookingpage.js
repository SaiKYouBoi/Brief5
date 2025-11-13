let destinations = [];
let accommodations = [];
let selectedPassengers = "SoloTravaler";
// fetch both destinations and accommodations
function getDestinations() {
  return Promise.all([
    fetch("destinations.json").then((response) => response.json()),
    fetch("accommodations.json").then((response) => response.json()),
  ])
    .then(([destinationsData, accommodationsData]) => {
      destinations = Array.isArray(destinationsData.destinations)
        ? destinationsData.destinations
        : [];
      accommodations = Array.isArray(accommodationsData.accommodations)
        ? accommodationsData.accommodations
        : [];
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
const pasengersinfos = document.getElementById("pasengersinfos");
const addingpassanger = document.getElementById("addpaasenger");

function initDestinationSelect() {
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    option.textContent = `${destination.name} (${destination.planet})(${destination.price}$)`;
    destinationSelect.appendChild(option);
  });
}

let selectedAccommodation = null;

// display accommodations for the selected destination
function displayAccommodations(destinationId) {
  const selectedDestination = destinations.find(
    (dest) => dest.id == destinationId
  );

  acoomContainer.innerHTML = "";

  selectedAccommodation = null;

  if (!selectedDestination) {
    acoomContainer.innerHTML = "<div>Please select a destination.</div>";
    return;
  }

  //console.log(selectedDestination)

  let accomcont = "";
  selectedDestination.accommodations.forEach((accomId) => {
    // find the accommodation by id
    const accomDetails = accommodations.find((acc) => acc.id === accomId);

    // console.log(accomId)

    const price = accomDetails
      ? `$${accomDetails.pricePerDay}/day`
      : "Price not available";

    accomcont += `
      <div class="accom flex-1 h-full py-3 px-4 border-2 border-gray-600 rounded-lg cursor-pointer hover:border-neon-blue transition-all duration-300" 
           onclick="selectAccommodation('${accomId}', this)">
        <h3 class="font-orbitron text-lg mb-2 text-glow text-neon-blue">${
          accomDetails ? accomDetails.name : accomId
        }</h3>
        <p>${price}</p>
      </div>
    `;
  });

  acoomContainer.innerHTML = accomcont;
}

// handle accommodation selection
function selectAccommodation(accomId, element) {
  // remove selection from all accommodations
  const allAccoms = acoomContainer.querySelectorAll(".accom");
  allAccoms.forEach((accom) => {
    accom.classList.remove("border-neon-blue", "bg-gray-800");
    accom.classList.add("border-gray-600");
  });

  element.classList.remove("border-gray-600");
  element.classList.add("border-neon-blue", "bg-gray-800");

  selectedAccommodation = accomId;
  //console.log(accomId);
}

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  getDestinations();

  destinationSelect.addEventListener("change", function () {
    displayAccommodations(this.value);
    // console.log(this.value);
  });

  const initialRadio = document.querySelector(
    'input[name="passengers"][value="SoloTravaler"]'
  );
  if (initialRadio) {
    initialRadio.checked = true;
  }

  addfroms();

  //radio button listeners
  const passengerRadios = document.querySelectorAll('input[name="passengers"]');
  passengerRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      selectedPassengers = this.value;
      //   console.log(selectedPassengers);
      addfroms();
    });
  });
});

function addfroms() {
  if (!pasengersinfos) return;
  pasengersinfos.innerHTML = "";

  let count = 1;
  if (selectedPassengers == "SoloTravaler") {
    addingpassanger.disabled = true;
    addingpassanger.classList.add("cursor-not-allowed", "opacity-60");
    addingpassanger.classList.remove("cursor-pointer");
    
  } else if (selectedPassengers == "Couple") {
    addingpassanger.disabled = true;
    addingpassanger.classList.add("cursor-not-allowed", "opacity-60");
    addingpassanger.classList.remove("cursor-pointer");
  } else if (selectedPassengers == "Group") {
    addingpassanger.disabled = false;
    addingpassanger.classList.remove("cursor-not-allowed", "opacity-60");
    addingpassanger.classList.add("cursor-pointer");
  }

  switch (selectedPassengers) {
    case "Couple":
      count = 2;
      break;
    case "Group":
      count = 3;
      break;
    case "SoloTravaler":
    default:
      count = 1;
  }

  for (let i = 0; i < count; i++) {
    pasengersinfos.innerHTML += `
    <div class="text-left mb-8 mt-4">
                            <h1 class="font-orbitron text-2xl mb-2 text-glow">Person N°${
                              i + 1
                            }: </h1>
                        </div>
    <div class="flex md:flex-row flex-col gap-4">
                                <div class="space-y-6 md:w-1/2">
                                    <div>
                                        <label class="block text-gray-300 mb-2">First Name</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your first name">
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Email Address</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your email">
                                    </div>
                                </div>
                                <div class="space-y-6 md:w-1/2">
                                    <div>
                                        <label class="block text-gray-300 mb-2">Last Name</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your last name">
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Phone Number</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your phone number">
                                    </div>
                                </div>
                            </div>

                            <div class="mt-[24px]">
                                <label class="block text-gray-300 mb-2">Special Requirements</label>
                                <textarea type="text" class="form-input w-full px-4 py-3"
                                    placeholder="Any special requirments or notes..."></textarea>
                            </div>
                            `;
  }
}

// THE DATA I NEED:
// Destination price
// Date
// numofpassangers
// acoom type:
// priceperday of th accom
// days: tDuration in the Destination JSON file
// travel cost = Destination price + priceperday * tDuration * 2
