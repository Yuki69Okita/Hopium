// NAV BAR
const toggleButton = document.getElementsByClassName('toggle_btn')[0]
const navLinks = document.getElementsByClassName('nav_links')[0]

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
}
)

// STICKY NAV BAR
window.onscroll = function () { stickyNav() }

var navBar = document.getElementsByClassName("nav_bar")
var sticky = navBar.offsetTop;

function stickyNav() {
  if (window.scrollY >= sticky) {
    navBar.classList.add("sticky")
  }
}

//JSON DATA
fetch("./assets/games.json")
  .then(response => response.json())
  .then(games => {
    localStorage.setItem("games", JSON.stringify(games))
  })

//FILTER
let games = JSON.parse(localStorage.getItem("games"))

function getGames(data) {
  return data.map(game => {
    const { image, name, description, genres, rating, price } = game
    return `
        <div class="col col-lg-3 m-4">
          <div class="card h-100 card text-white bg-dark">
            <img src="${image}" class="card-img-top" alt="${name}">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">&nbsp;&nbsp; ${description}</p>
              <span class="genres_span">${(genres).join('/ ')}</span>
            </div>
            <div class="card-footer border-white">
              <div class="inline_div" style="bottom:1.5rem; position:absolute;">${calcStars(rating)}</div>
              <div class="inline_div1">
                <button class="price_btn" onclick="displayItemsCount()">
                  <i class="fa fa-shopping-cart" style="font-size: 26px;"></i> 
                  &nbsp; ${calcDicount(game.is_discounted, price)} €
                </bitton>
              </div>
            </div>
          </div>
        </div>`
  }).join("")
}

//STARS
function calcStars(data) {
  var stars = ""
  for (var i = 0; i < 5; i++) {
    var icoClass = i < data ? "fa fa-star" : "fa fa-star-o";
    stars += "<i class='" + icoClass + "'></i>";
  }
  return stars
}

//CALC DISCOUNT
function calcDicount(discount, data) {
  var totalValue = data
  if(discount == true){
    var price = data
    var price2 = price / 100
    totalValue = price - (price * price2)
  }
  return totalValue.toFixed(2)
}

//NEW AND TRENDING
function displayNewTrendingGames() {
  let new_and_trending = getGames(games.filter((element) => (element.is_new && element.is_trending)))
  document.getElementById("new_and_trending_div").insertAdjacentHTML('beforeend', new_and_trending)
}

//DISCOUNTED
function displayDiscountedGames() {
  var discounted = games.filter((element) => element.is_discounted)
  document.getElementById("discounted_div").insertAdjacentHTML('beforeend', getGames(discounted))
}

//CATALOG
var curr_dis = `<span class="how_many_items">Currently showing items:&nbsp;<p id="store"></p></span>`
document.getElementById("sorting_stuff").insertAdjacentHTML('afterbegin', curr_dis)
document.getElementById("catalog_div").insertAdjacentHTML('beforeend', getGames(games))

//SORT BY NAME
function sortByAZGames() {
  return games.sort((a, b) => (a.name > b.name) ? 1 : -1)
}

document.getElementById('sort_a_z').onclick = () => {
  document.getElementById("remove_genre").checked = true
  document.getElementById("remove_price").checked = true
  document.getElementById("catalog_div").innerHTML = getGames(sortByAZGames())
}

//SORT BY NAME REVERSE
function sortByZAGames() {
  return games.sort((a, b) => (a.name < b.name) ? 1 : -1)
}

document.getElementById('sort_z_a').onclick = () => {
  document.getElementById("remove_genre").checked = true
  document.getElementById("remove_price").checked = true
  document.getElementById("catalog_div").innerHTML = getGames(sortByZAGames())
}


//SORT BY PRICE ASC
function sortByPriceAscGames() {
  return games.sort((a, b) => (a.price > b.price) ? 1 : -1)
}

document.getElementById('sort_p_asc').onclick = () => {
  document.getElementById("remove_genre").checked = true
  document.getElementById("remove_price").checked = true
  document.getElementById("catalog_div").innerHTML = getGames(sortByPriceAscGames())
}

//SORT BY PRICE DEC
function sortByPriceDeccGames() {
  return games.sort((a, b) => (a.price < b.price) ? 1 : -1)
}

document.getElementById('sort_p_dec').onclick = () => {
  document.getElementById("remove_genre").checked = true
  document.getElementById("remove_price").checked = true
  document.getElementById("catalog_div").innerHTML = getGames(sortByPriceDeccGames())
}

//SORT BY ID
function sortByIdGames() {
  return games.sort((a, b) => (a.id > b.id) ? 1 : -1)
}

document.getElementById('sort_remove').onclick = () => {
  document.getElementById("remove_genre").checked = true

  document.getElementById("catalog_div").innerHTML = getGames(sortByIdGames())
}

var count = 0

function filterByGenresGames() {
  var filter = ""

  document.querySelectorAll('input[name="genres"]')
    .forEach((element) => { element.addEventListener("change", function () {
      document.getElementById("remove_price").checked = true

      if (document.getElementById("adventure").checked) {
        filter = games.filter(game => game.genres.includes("Adventure"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("action").checked){
        filter = games.filter(game => game.genres.includes("Action"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("rpg").checked){
        filter = games.filter(game => game.genres.includes("RPG"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("indie").checked){
        filter = games.filter(game => game.genres.includes("Indie"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("simulation").checked){
        filter = games.filter(game => game.genres.includes("Simulation"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("strategy").checked){
        filter = games.filter(game => game.genres.includes("Strategy"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("casual").checked){
        filter = games.filter(game => game.genres.includes("Casual"))
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("remove_genre").checked){
        filter = games
        getValueFromFunc(filter.length)
      }
      
      document.getElementById("catalog_div").innerHTML = getGames(filter)
      })
    }
  )
}

function filterByPriceGames() {
  var filter = ""

  document.querySelectorAll('input[name="prices"]')
    .forEach((element) => { element.addEventListener("change", function () {
      document.getElementById("remove_genre").checked = true

      if (document.getElementById("zero_five").checked) {
        filter = games.filter(game => game.price >=  0 &&  game.price <= 5)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("five_ten").checked){
        filter = games.filter(game => game.price >=  5 &&  game.price <= 10)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("ten_twenty").checked){
        filter = games.filter(game => game.price >=  10 &&  game.price <= 20)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("twenty_thirty").checked){
        filter = games.filter(game => game.price >=  20 &&  game.price <= 30)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("thirty_forty").checked){
        filter = games.filter(game => game.price >=  30 &&  game.price <= 40)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("forty_fifty").checked){
        filter = games.filter(game => game.price >=  40 &&  game.price <= 50)
        getValueFromFunc(filter.length)

      }
      else if(document.getElementById("fifty_sixty").checked){
        filter = games.filter(game => game.price >=  50 &&  game.price <= 60)
        getValueFromFunc(filter.length)
      }
      else if(document.getElementById("remove_price").checked){
        filter = games
        getValueFromFunc(filter.length)
      }
      
      document.getElementById("catalog_div").innerHTML = getGames(filter)
      })
    }

  )
}

function getValueFromFunc(data){
  if (data == undefined){
    document.getElementById("store").innerHTML = games.length
  }
  else{
    document.getElementById("store").innerHTML = data
  }
}

//ADD TO CART BUTTON
let itemsCountDiv = document.querySelector(".itemsCount");
let cartIcon = document.querySelector(".cartIcon");

let itemsCount = 1;

function displayItemsCount() {
  itemsCountDiv.style.display = "block";
  itemsCountDiv.classList.add("appear");
  cartIcon.classList.add("flicker");
  itemsCountDiv.innerHTML = itemsCount;

  setTimeout(() => {
    itemsCountDiv.classList.remove("appear");
    cartIcon.classList.remove("flicker");
  }, 250);

  itemsCount++;
}
