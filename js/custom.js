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
  spaceBetween: -70,
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
    "url": "https://stayins-be.onrender.com/?param=Cities_call",
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
    "url": "https://stayins-be.onrender.com/?param=BoardingsAround&UserCompoundCode="+compound_code,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    populateBoardingsaround(response);
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

function populateBoardingsaround(response) {
  // Select the parent element where swiper slides are to be added
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  // Clear the parent element before adding new slides
  swiperWrapper.innerHTML = '';

  // Loop through the response array
  response.forEach(boarding => {
    // Create a new div element for each boarding
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
     
      <div class="w-96 p-5 h-72">
        <div class="border rounded-lg p-5 bg-brand-lightblue w-96 h-200">
          <img class="h-60 w-full object-cover rounded-md" src="data:image/png;base64,${boarding.image1}" alt="">
          <div class="deets mt-10 max-h-full">
            <div id="firstrow" class="firsrow flex">
              <div id="location" class="location flex" >
                <i class="fa-solid fa-location-dot pt-3 fa-lg" style="color: #dcd7c9;"></i>
                <p class="text-Cream ml-3 text-lg text-left" style="min-width: 122px; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${boarding.city}</p>
              </div>
              <div id="boarder_type" class="h-20 boarder_type ml-6 flex w-full">
                <i class="fa-solid fa-user pt-3 fa-lg" style="color: #dcd7c9;"></i>
                <p class="text-Cream text-lg pl-3 " style="text-align: left; min-width: 122px; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${boarding.boarderType}</p>
              </div>
            </div>
            <div id="secondrow" class="secondrow flex">
              <div id="RentFee" class="Bed flex">
                <i class="fa-solid fa-sack-dollar pt-3 fa-lg" style="color: #dcd7c9;"></i>
                <p class="text-Cream ml-3 text-lg text-left" style="min-width:122px; overflow: hidden; text-overflow: ellipsis; max-width: 150px;" >Rs. ${boarding.monthlyFee}</p>
            </div>
            <div id="BoardingType" class="room_type flex ml-5">
              <i class="fa-solid fa-home pt-3 fa-lg " style="color: #dcd7c9;"></i>
              <p class="text-Cream pl-2 text-lg text-left">${boarding.boardingType}</p>
            </div>
            </div>
          <button class="mt-10 px-6 py-3 rounded-md bg-brand-yellow text-brand-lightblue">Read More</button>
          </div>
        </div>
      </div>
      
    `;
    
    // Append the slide to the swiper wrapper
    swiperWrapper.appendChild(slide);
  });
  
  // If using SwiperJS, reinitialize or update the swiper here
  // swiper.update(); or new Swiper('.swiper-container', {...});
  if (typeof swiper !== 'undefined') {
    swiper.update();
  }
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
  getUserLocation(); //Getting User's Lat and Lang => triggers the getboardingsaround function
  getCities(); //Get Ciies array and add to Locations drop down list
  }





