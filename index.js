let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");
let lon
let lat

const errorCallBack = () => {
  alert("Sorry, no position available.");
};

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

// navigator.geolocation.getCurrentPosition
window.addEventListener("load", () => {

    const successCallBack = (position) => {
        console.log("lat is " + Math.round((position.coords.latitude + Number.EPSILON)*100)/100 ,"long is " + Math.round((position.coords.longitude + Number.EPSILON)*100)/100);
        latitude.innerText = `Lat: ${Math.round((position.coords.latitude + Number.EPSILON)*100)/100}`;
        longitude.innerText = `Long: ${Math.round((position.coords.longitude + Number.EPSILON)*100)/100}`;
        lat = parseFloat(position.coords.latitude) 
        lon = Math.round((position.coords.longitude + Number.EPSILON)*100)/100
      };
    //   console.log(lat)
    //   console.log(typeof lat)
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
      successCallBack,
      errorCallBack,
      options
    );
    // const api = "a88c6dcb487c3498e44672f62ada0bd9"; //my API ID
    const api = "6d055e39ee237af35ca066f35474e9df"
    // const apiUrl =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
    const apiUrl= `http://api.openweathermap.org/data/2.5/weather?lat=17.43&lon=78.46&appid=6d055e39ee237af35ca066f35474e9df`;

      fetch(apiUrl)
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        console.log(data)
        let lat = data.coord.lat
        let lon = data.coord.lon
        console.log(typeof lat)
        document.getElementById('location').innerHTML = `Location: ${data.name}`
        document.getElementById('lat').innerHTML =`Lat: ${data.coord.lat}`
        document.getElementById('long').innerHTML =`Long: ${data.coord.lon}`
        document.getElementById('timezone').innerHTML =`Time Zone: ${data.timezone}`
        document.getElementById('windspeed').innerHTML =`Wind speed: ${data.wind.speed}`
        document.getElementById('pressure').innerHTML =`Wind Pressure: ${data.main.pressure}`
        document.getElementById('humidity').innerHTML =`Humidity: ${data.main.humidity}`
        document.getElementById('wind-direction').innerHTML =`Wind Direction:`
        document.getElementById('uvIndex').innerHTML =`UV-Index: `
        document.getElementById('feels-like').innerHTML =`Feels like: ${data.main.feels_like} `
        

        //for map
const key = '5vZgVD8dbVaxS4zxN7cT';
const map = new maplibregl.Map({
  container: 'map', // container's id or the HTML element in which MapLibre GL JS will render the map
  style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${key}`, // style URL
  center: [lon, lat], // starting position [lng, lat]
  zoom: 13, // starting zoom
});


map.addControl(new maplibregl.NavigationControl(), 'top-right');

      })
  }
});



