const driversList = document.getElementById("driversList");
const searchBar = document.getElementById("searchBar");
let f1Drivers = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredDrivers = f1Drivers.filter((driver) => {
    return (
      driver.FamilyName.toLowerCase().includes(searchString) ||
      driver.GivenName.toLowerCase().includes(searchString)
    );
  });
  displayDrivers(filteredDrivers);
});

const loadDrivers = async () => {
  try {
    fetch("./2022drivers.json")
      .then((response) => response.json())
      .then((json) => {
        f1Drivers = json;
        displayDrivers(f1Drivers);
      });
  } catch (err) {
    console.error(err);
  }
};

const displayDrivers = (drivers) => {
  const htmlString = drivers
    .map((driver) => {
      return `
            <li class="driver">
                <h2>${driver.PermanentNumber}</h2>
                <p>${driver.GivenName} ${driver.FamilyName}</p>
                <p2>Date of Birth: ${driver.DateOfBirth}</p2>
                <p3>Nationality: ${driver.Nationality}</p3>
                <a href="${driver.Link}" target="_blank" class="driver-link">Go To Drivers F1 Page</a>
            </li>
        `;
    })
    .join("");
  driversList.innerHTML = htmlString;
};

loadDrivers();
