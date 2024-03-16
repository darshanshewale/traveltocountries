"use strict";

//this will select the countries container
const countainer_country = document.querySelector(".countries");

// render the error from getcountrydata if any occur
const rendererror = function (msg) {
  countainer_country.insertAdjacentText("beforeend", msg);
  countainer_country.style.opacity = 1;
};

// rendercountry details as per data Object as well as for neighbour have clasName to differentiat
const rendercountry = function (data, className = "") {
  // display falge,Name,region,population,capital and area
  const html = `<article class="${className}">
  <img src="${data.flags.png}" alt="" class="country_img" />
  <div class="country_data">
    <h3 class="country_name">${data.name.common}</h3>
    <h4 class="country_region">${data.region}</h4>
    <p class="country_row"><span>👫</span>${(data.population / 1000000).toFixed(
      1
    )}M people</p>
    <p class="country_row"><span>🏛️</span>${data.capital}</p>
    <p class="country_row"><span>🅰️</span>${data.area} Km2</p>
  </div>
  </article>
  `;

  // insert data into container to display
  countainer_country.insertAdjacentHTML("beforeend", html);
  //make it visible
  countainer_country.style.opacity = 1;
};

const getcountryData = function (country) {
  // fetch the details as per input by using public api for country details
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((Response) => Response.json())
    .then((data) => {
      rendercountry(data[0]);
      // send the data object to render

      // get neighbour details for the country
      const neighbour = data[0].borders[0];

      // if no neighbour return
      if (!neighbour) {
        return;
      }
      // else fetch the same details and render the same
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then((Response) => Response.json())
    .then((data) => rendercountry(data[0], "neighbour"))
    .catch((err) => console.log(err));
};
const input = prompt("Enter Country Name ");
getcountryData(input);

//   const country_and_neighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     rendercountry(data);

//     const [neighbour] = data.borders;
//     console.log(neighbour);

//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText);
//       rendercountry(data2, "neighbour");
//     });
//   });
// };
