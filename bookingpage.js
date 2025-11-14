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
  calculateTotalCost();
}

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  getDestinations();

  destinationSelect.addEventListener("change", function () {
    displayAccommodations(this.value);
    calculateTotalCost();
    // console.log(this.value);
  });

  const initialRadio = document.querySelector(
    'input[name="passengers"][value="SoloTravaler"]'
  );
  if (initialRadio) {
    initialRadio.checked = true;
  }

  addfroms();
  enableRealtimeValidation();
  //radio button listeners
  const passengerRadios = document.querySelectorAll('input[name="passengers"]');
  passengerRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      selectedPassengers = this.value;
      //   console.log(selectedPassengers);
      addfroms();
    });
  });

  // add passenger button listener
  if (addingpassanger) {
    addingpassanger.addEventListener("click", addPassengerformbtn);
  }
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
    <div class="passform">
    <div class="text-left mb-8 mt-4">
                            <h1 class="font-orbitron text-2xl mb-2 text-glow">Person N°${
                              i + 1
                            }: </h1>
                        </div>
    <div class="flex md:flex-row flex-col gap-4">
                                <div class="space-y-6 md:w-1/2">
                                    <div class="h-24">
                                        <label class="block text-gray-300 mb-2">First Name</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your first name">
                                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                                    </div>
                                    <div class="h-24">
                                        <label class="block text-gray-300 mb-2">Email Address</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your email">
                                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                                    </div>
                                </div>
                                <div class="space-y-6 md:w-1/2">
                                    <div class="h-24">
                                        <label class="block text-gray-300 mb-2">Last Name</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your last name">
                                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                                    </div>
                                    <div class="h-24">
                                        <label class="block text-gray-300 mb-2">Phone Number</label>
                                        <input type="text" class="form-input w-full px-4 py-3"
                                            placeholder="Enter your phone number">
                                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-[24px]">
                                <label class="block text-gray-300 mb-2">Special Requirements</label>
                                <textarea type="text" class="form-input w-full px-4 py-3"
                                    placeholder="Any special requirments or notes..."></textarea>
                                <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                            </div>
                            </div>
                            `;
  }
  calculateTotalCost();
}

function addPassengerformbtn(event) {
  event.preventDefault();
  const existingforms = pasengersinfos.querySelectorAll(".passform");
  console.log(existingforms);
  const nextpass = existingforms.length + 1;

  if (nextpass > 6) {
    alert("Maximum 6 passengers allowed for group bookings");
    return;
  }

  const newFormHTML = `
        <div class="passform">
            <div class="text-left mb-8 mt-4">
                <h1 class="font-orbitron text-2xl mb-2 text-glow">Person N°${nextpass}: </h1>
            </div>
            <div class="flex md:flex-row flex-col gap-4">
                <div class="space-y-6 md:w-1/2">
                    <div class="h-24">
                        <label class="block text-gray-300 mb-2">First Name</label>
                        <input type="text" class="form-input w-full px-4 py-3" placeholder="Enter your first name">
                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                    </div>
                    <div class="h-24">
                        <label class="block text-gray-300 mb-2">Email Address</label>
                        <input type="text" class="form-input w-full px-4 py-3" placeholder="Enter your email">
                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                        </div>
                </div>
                <div class="space-y-6 md:w-1/2">
                    <div class="h-24">
                        <label class="block text-gray-300 mb-2">Last Name</label>
                        <input type="text" class="form-input w-full px-4 py-3" placeholder="Enter your last name">
                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                        </div>
                    <div class="h-24">
                        <label class="block text-gray-300 mb-2">Phone Number</label>
                        <input type="text" class="form-input w-full px-4 py-3" placeholder="Enter your phone number">
                        <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                        </div>
                </div>
            </div>

            <div class="mt-[24px]">
                <label class="block text-gray-300 mb-2">Special Requirements</label>
                <textarea type="text" class="form-input w-full px-4 py-3" placeholder="Any special requirements or notes..."></textarea>
            <div class="error-text text-red-400 text-sm mt-1 hidden"></div>
                </div>
        </div>
    `;

  pasengersinfos.insertAdjacentHTML("beforeend", newFormHTML);

  if (nextpass === 6) {
    addingpassanger.disabled = true;
    addingpassanger.classList.add("cursor-not-allowed", "opacity-60");
    addingpassanger.classList.remove("cursor-pointer");
  }
  calculateTotalCost();
}

// THE DATA I NEED:
// Destination price
// Date
// numofpassangers
// acoom type:
// priceperday of th accom
// days: tDuration in the Destination JSON file
// travel cost = Destination price + priceperday * tDuration * 2

function calculateTotalCost() {
  const totalCostSpan = document.getElementById("totalCost");

  const destinationId = destinationSelect.value;
  const destination = destinations.find((dest) => dest.id === destinationId);

  if (!destination) {
    totalCostSpan.textContent = "0";
    return;
  }

  const accommodation = accommodations.find(
    (acc) => acc.id === selectedAccommodation
  );

  if (!accommodation) {
    totalCostSpan.textContent = destination.price; // only destination price
    return;
  }

  const destPrice = destination.price;
  const pricePerDay = accommodation.pricePerDay;
  const duration = destination.tDuration;

  const numberOfPassengers =
    pasengersinfos.querySelectorAll(".passform").length;

  const accomPerPerson = pricePerDay * duration * 2;

  const total = destPrice + accomPerPerson * numberOfPassengers;

  totalCostSpan.textContent = total.toLocaleString();
}

const confirmbooking = document.getElementById("confirmbooking");

confirmbooking.addEventListener("click", function (event) {
  event.preventDefault();

  if (destinationSelect.value === "") {
    alert("Please select a destination.");
    return;
  }

  const dateinput = document.getElementById("departuredate");
  if (!dateinput.value) {
    alert("Please select a departure date.");
    return;
  }

  if (!validateAllPassengers()) {
    alert("Please fix the highlighted fields.");
    return;
  }

  if (!selectedAccommodation) {
    alert("Please select an accommodation type.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));

  //booking if not logged in
  if (!user || !user.isLoggedIn) {
    alert("You must log in to confirm a booking.");
    window.location.href = "login.html";
    return;
  }

  alert("Booking confirmed!");

  const booking = collectBookingData();
  saveBooking(booking);

  alert("Your booking has been successfully saved!");

  window.location.href = "mybooking.html";
});

//form validation for tehe fields
function validateField(input, regex, message) {
  const errorDiv = input.nextElementSibling;

  if (!regex.test(input.value.trim())) {
    input.classList.add("border-red-500");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
    errorDiv.classList.add("fade-in");
    return false;
  } else {
    input.classList.remove("border-red-500");
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
    errorDiv.classList.remove("fade-in");
    return true;
  }
}

function validateAllPassengers() {
  const forms = pasengersinfos.querySelectorAll(".passform");
  let allValid = true;

  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+212|0)(6|7)[0-9]{8}$/;

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input");

    const firstName = inputs[0];
    const email = inputs[1];
    const lastName = inputs[2];
    const phone = inputs[3];

    const validFN = validateField(
      firstName,
      nameRegex,
      "First name must be at least 2 letters."
    );
    const validEmail = validateField(
      email,
      emailRegex,
      "Enter a valid email (example@mail.com)."
    );
    const validLN = validateField(
      lastName,
      nameRegex,
      "Last name must be at least 2 letters."
    );
    const validPhone = validateField(
      phone,
      phoneRegex,
      "Phone number must start with 06/07 or +2126/+2127."
    );

    if (!validFN || !validEmail || !validLN || !validPhone) {
      allValid = false;
    }
  });

  return allValid;
}

function enableRealtimeValidation() {
  pasengersinfos.addEventListener("input", function (e) {
    validateAllPassengers();
    toggleSubmitButton();
  });
}

function toggleSubmitButton() {
  const valid = validateAllPassengers();

  confirmbooking.disabled = !valid;

  if (!valid) {
    confirmbooking.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    confirmbooking.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

// get passangers data
function getAllPassengerData() {
  const passengerForms = pasengersinfos.querySelectorAll(".passform");
  const passengerData = [];

  passengerForms.forEach((form, index) => {
    const passengerNumber = index + 1;

    const inputs = form.querySelectorAll("input");
    const textarea = form.querySelector("textarea");

    const data = {
      passengerNumber: passengerNumber,
      firstName: inputs[0]?.value || "",
      email: inputs[1]?.value || "",
      lastName: inputs[2]?.value || "",
      phone: inputs[3]?.value || "",
      requirements: textarea?.value || "",
    };

    passengerData.push(data);
  });
  console.log(passengerData);
  return passengerData;
}

// colelcting booking data

function collectBookingData() {
  
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return null;

  const destinationId = destinationSelect.value;
  const destination = destinations.find((d) => d.id === destinationId);

  const accommodation = accommodations.find(
    (a) => a.id === selectedAccommodation
  );

  const passengers = getAllPassengerData();

  const booking = {
    id: "bk-" + Date.now(),
    userId: user.id,
    destination: {
      id: destination.id,
      name: destination.name,
      price: destination.price,
      tDuration: destination.tDuration,
    },
    accommodation: {
      id: accommodation.id,
      name: accommodation.name,
      pricePerDay: accommodation.pricePerDay,
    },
    passengers: passengers,
    totalCost: document.getElementById("totalCost").textContent,
    bookingDate: document.getElementById("departuredate").value,
  };

  return booking;
}

function saveBooking(booking) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // hadi for saftey
  if (!user) return;

  const key = "bookings_" + user.id;
  
   const all = JSON.parse(localStorage.getItem(key)) || [];
    all.push(booking);

  all.push(booking);

  localStorage.setItem(key, JSON.stringify(all));
}
