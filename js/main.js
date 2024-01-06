async function search(a) {
  let i = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (i.ok && 400 != i.status) {
    let a = await i.json();
    displaycurrent(a.location, a.current),
      displayanother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displaycurrent(a, i) {
  if (null != i) {
    var e = new Date(i.last_updated.replace(" ", "T"));
    let z = `<div class="today forecast">    <div class="forecast-header"  id="today"><div class="day">${
      days[e.getDay()]
    }</div><div class=" date">${
      e.getDate() + monthNames[e.getMonth()]
    }</div></div><div class="forecast-content" id="current"><div class="location">${
      a.name
    }</div><div class="degree"><div class="num">${
      i.temp_c
    }<sup>o</sup>C</div><div class="forecast-icon"><img src="https:${
      i.condition.icon
    }" alt="" width=90></div></div><div class="custom">${
      i.condition.text
    }</div><span><img src="images/icon-umberella.png" alt="">20%</span><span><img src="images/icon-wind.png" alt="">18km/h</span><span><img src="images/icon-compass.png" alt="">East</span></div></div>`;
    document.getElementById("forecast").innerHTML = z;
  }
}
function displayanother(i) {
  let t = "";
  for (let e = 1; e < i.length; e++)
    t += `<div class="forecast">
  <div class="forecast-header">
  <div class="day">${
    days[new Date(i[e].date.replace(" ", "T")).getDay()]
  }</div></div><div class="forecast-content"><div class="forecast-icon"><img src="https:${
      i[e].day.condition.icon
    }" alt="" width=48></div><div class="degree">${
      i[e].day.maxtemp_c
    }<sup>o</sup>C</div><small>${
      i[e].day.mintemp_c
    }<sup>o</sup></small><div class="custom">${
      i[e].day.condition.text
    }</div></div></div>`;
  document.getElementById("forecast").innerHTML += t;
}
search("zagazig");
