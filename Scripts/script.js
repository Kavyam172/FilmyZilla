let search = document.querySelector(".search-button");
search.addEventListener('click', () => {
    let searchbar = document.querySelector(".search-bar");
    if(searchbar.classList.contains("active")){
        let searchValue = document.querySelector(".search-bar input").value;
        console.log(searchValue);
    }
    else{
        searchbar.classList.add("active");
    }
    // alert('clicked');
});

const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {
    const carouselInner = carousel.querySelector(".images");
    const carouselContent = Array.from(carouselInner.children);
    carouselContent.forEach(item =>{
        const duplicatedItem = item.cloneNode(true);
        carouselInner.appendChild(duplicatedItem);
        carouselInner.style.animation = "move 50s linear infinite";
    })
});

// let navbar = document.querySelector('#navbar');

// window.addEventListener('scroll', () => {
//     let scroll = window.scrollY;
//     if(scroll > 300){
//         navbar.classList.add('active');
//     }else{
//         navbar.classList.remove('active');
//     }
// });

async function getData(){
    const url = 'https://moviesverse1.p.rapidapi.com/get-by-genre?genre=action';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

getData();