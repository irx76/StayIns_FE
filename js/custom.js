function updateSelection(selection){
   document.getElementById("dropdown-button").innerText = selection;
}

function updateSelection2(selection){
  document.getElementById("dropdown-button2").innerText = selection;
}

function updateSelection3(selection){
  document.getElementById("dropdown-button3").innerText = selection;
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: -40,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// function getListLocations(){
//   var settings = {
//     "url": "http://127.0.0.1:5000/?param=locations_list",
//     "method": "GET",
//     "timeout": 0,
//   };
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     populateList(response);
//   });
// }

function getCities(city){
  var settings = {
    "url": "http://127.0.0.1:5000/?param=Cities_call",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    populateList(response);
  });
}

function getBoardingsAround(compound_code){
  var settings = {
    "url": "http://127.0.0.1:5000/?param=BoardingsAround&UserCompoundCode="+compound_code,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function populateList( response) {
  const ul = document.getElementById('Locations-ul');

  response.forEach(locz => {
  const li = document.createElement('li');
  const button = document.createElement('button');

    button.type = 'button';
    button.className = 'inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white';
    button.onclick = function() { updateSelection(locz.name_en); };
    button.textContent = locz.name_en;

    li.appendChild(button);
    ul.appendChild(li);
  });
}

function populateBoardingsaround( response) {
  
}


function showLocation(lat, lng){
  getUserLocation();
  const KEY= "AIzaSyD4aQOK58-px_S5e2QF9eRHM0Q4r1-8ZWs";
  const LATITUDE=lat;
  const LONGITUDE=lng;
  let url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let list_compundCode= data.plus_code.compound_code.split(" ");
    document.getElementById("CompoundCode").innerHTML = list_compundCode[1].slice(0,-1);
    getBoardingsAround(list_compundCode[1].slice(0,-1));
  })
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lng);
    showLocation(lat,lng)
}

function filterLocations() {
    var input, filter, ul, li, button, i, txtValue;
    input = document.getElementById("filter-input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("Locations-ul");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        button = li[i].getElementsByTagName("button")[0];
        txtValue = button.textContent || button.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function onloadfuncs(){
  getUserLocation();
  getCities();
  }





