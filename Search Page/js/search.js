function getBoardings() {
    var settings = {
        "url": "https://stayins-be.onrender.com/search",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        populateCards(response);
      });

}

function createCardHTML(boarding) {
  return `
    <div  class="cards">
      <div class=" border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cardsminwidth" style="max-width: 381px;"  >
        <a href="#">
          <img class="rounded-t-lg cardsminwidth" style="max-width: 381px; max-height:285px; min-height:285px" src="data:image/png;base64,${boarding.image1}" alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-Cream h-20">Rooms for Rent in ${boarding.city}</h5>
          </a>
          <h6 class="mb-3 font-bold text-gray-700 dark:text-gray-400 text-Cream">LKR ${boarding.monthlyFee}</h6>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-Cream">${boarding.boarderType}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-Cream">for ${boarding.boardingType}</p>
          <a href="#"
            class="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div> 
  `;
}

// Function to populate cards
function populateCards(boardings) {
  const container = document.getElementById('searchResults');
  // Clear existing content
  container.innerHTML = '';
  boardings.forEach(boarding => {
    container.innerHTML += createCardHTML(boarding);
  });
}


function onloadf() {
    getBoardings();
}  