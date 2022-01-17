var searchInputValue = document.getElementById("searchInputValue");
var searchBtn = document.getElementById("search-btn");
var ipAddressDiv = document.getElementById("ip-address");
var locationDiv = document.getElementById("location");
var timezone = document.getElementById("timezone");
var ispValue = document.getElementById("ispValue");
window.addEventListener('load', function() {
    setUpMap();
})

var lat = 34.04915;
var lng = -118.09462;
var map = map = L.map('map').setView([lat, lng], 13);;
var marker = L.marker([lat, lng]).addTo(map);
function setUpMap(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibmF3ZmVsc2VrcmFmaSIsImEiOiJja3lpanl4MGsyY3llMnBwOG50cmM5Mzc4In0.D_BIGmuTHKQIRJEPv-M3XQ'
    }).addTo(map);
}


searchBtn.addEventListener('click', function(){
 getData(searchInputValue.value);
});

// when the user hit enter button after typing such ip address getData methode get called.
searchInputValue.addEventListener('keyup', function(e){
    if(e.code =='Enter')getData(searchInputValue.value);
 })

//get geo location data from a server with fetch api & iPify api
function getData(ipAddress){
    fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_cCCuZdOXAdbARKxrnxKMA5CiesbsB&ipAddress=' + ipAddress)
    .then(res => res.json())
    .then(data =>{
        ipAddressDiv.innerHTML = data.ip;
        ispValue.innerHTML = data.isp;
        locationDiv.innerHTML = data.location.city + ", "+ data.location.region + " " + data.location.postalCode; 
        timezone.innerHTML = "UTC "+data.location.timezone;
        lat = data.location.lat;
        lng = data.location.lng;
        var marker = L.marker([lat, lng]).addTo(map);
        setUpMap()
         console.log(data)
        });
}


// set map to calback
// mobile view
// input checking
