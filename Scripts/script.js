//{loader}
document.addEventListener("DOMContentLoaded", async () => {
    // Simulate an API request or any async operation
    let top_box_office = await topBoxOffice();
    carouselPosters(top_box_office);
    setTimeout(() => {
        hideLoader();
        showContent();
    }, 3000);
});

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}

function showContent() {
    const content = document.querySelector(".content");
    content.style.display = "block";
}


//{search button}
let search = document.querySelector(".search-button");
search.addEventListener('click', () => {
    let searchbar = document.querySelector(".search-bar");
    if (searchbar.classList.contains("active")) {
        let searchValue = document.querySelector(".search-bar input").value;
        showMovieData(searchValue);
    }
    else {
        searchbar.classList.add("active");
    }
    // alert('clicked');
});



//{carousel}
const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {
    const carouselInner = carousel.querySelector(".images");
    const carouselContent = Array.from(carouselInner.children);
    carouselContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        carouselInner.appendChild(duplicatedItem);
        carouselInner.style.animation = "move 50s linear infinite";

    })
});


//{top movies poster from API}
function carouselPosters(data) {
    let movies = data['movies'];
    let posters = document.querySelectorAll('.poster');
    for (let i = 0; i < 10; i++) {
        posters[i].src = movies[i]['posterImage'];
    }

}

//{top box office movies API}
async function topBoxOffice() {
    const url = 'https://moviesverse1.p.rapidapi.com/top-box-office';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const top_box_office = await response.json();
        console.log(top_box_office);
        // carouselPosters(result);
        return top_box_office;


    } catch (error) {
        console.error(error);
    }

}


//{search movies API}
async function searchMovies(value) {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${value}?exact=false&titleType=movie`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result["results"];
        // console.log(result["results"]);
    } catch (error) {
        console.error(error);
    }
}

//{get ratings from movie ID}
async function getRatings(id='tt0848228'){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/tt0848228/ratings';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        // return result;
    } catch (error) {
        console.error(error);
    }
}

//{show movie data in cards}
async function showMovieData(value){
    // let cardPoster = document.querySelector('#movie-poster');
    // let cardTitle = document.querySelector('#movie-title');
    let results = document.querySelector('.search-results');
    // console.log(results);
    let data = await searchMovies(value);
    console.log(data);
    let cards = "";
    
    for(let i in data){
        let x = data[i];
        console.log(1);

        if(x['primaryImage'] === null){
            continue
        }
        cards += `<div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img id="movie-poster" src=${x['primaryImage']['url']} alt="${x['titleText']['text']}">
                            </div>
                            <div class="flip-card-back">
                                <p class="title" id="movie-title">${x['titleText']['text']}</p>
                                <p id = 'view-more'>View More</p>
                            </div>
                        </div>
                    </div>`
    }
    results.innerHTML = cards;
}