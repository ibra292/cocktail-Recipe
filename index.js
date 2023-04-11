var commentInput = document.getElementById('comment-input')
var commentList = document.getElementById('comments-list')
var commentItem = document.getElementById('comment-item')
var addCommentBtn = document.getElementById('addcommentBtn')

var likes = 0;
var dislikes = 0;

const likeBtn = document.getElementById('like-button');
const dislikeBtn = document.getElementById('dislike-button');

const likeCount = document.getElementById('like-counter');
const dislikeCount = document.getElementById('dislike-counter');


// Endpoint URLs
const API_URL = "https://the-cocktail-db.p.rapidapi.com/";
const SEARCH_ENDPOINT = "search.php?s=";
const RANDOM_ENDPOINT = "random.php";
const FILTER_BY_CATEGORY_ENDPOINT = "filter.php?c=";
const POPULAR_ENDPOINT = "popular.php";
const LATEST_ENDPOINT = "latest.php";

// Function to fetch data from the API
async function fetchCocktailData(endpoint) {
  try {
    const response = await fetch(API_URL + endpoint, {
      headers: {
        'X-RapidAPI-Key': '3967712d40msh5bb2caf44639ee1p184039jsna65f069e76a8',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Error: ', error)
    console.error(error);
  }
}

//search
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search_btn')
const searchResultList = document.getElementById('searched-cocktails-list')
const searchResultItem = document.getElementById('searched_item')

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  var searchItem = searchInput.value;
  fetchCocktailData(SEARCH_ENDPOINT + searchItem).then((data) => {
    const searchResultItem = document.createElement('li');
    searchResultItem.textContent = data.drinks[0].strDrink;
    searchResultList.appendChild(searchResultItem);
    searchInput.value = '';
  });
});


// Random Cocktail
const randomBtn = document.getElementById('rdm-button')
const randomCocktailResult = document.getElementById('random-result')

randomBtn.addEventListener('click',()=>{
  fetchCocktailData(RANDOM_ENDPOINT).then((data) => {
    randomCocktailResult.textContent = JSON.stringify(data.drinks)
    console.log(data);
  });
})




// fetchCocktailData(FILTER_BY_CATEGORY_ENDPOINT + "Ordinary_Drink").then((data) => {
//   console.log(data);
// });

fetchCocktailData(POPULAR_ENDPOINT)
  .then(data => {
    const list = document.getElementById('popcocktails-list');
    // console.log('Here are data: ', data.strDrink)
    if (Array.isArray(data)) {
      console.log('One step')
      data.forEach(item => {
        console.log('New item name: ', item)
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
        console.log('data item:', item);
      });
    }
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

// fetchCocktailData(LATEST_ENDPOINT).then((data) => {
//   console.log(data);
// });

// Comments
addCommentBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  commentItem.textContent = commentInput.value
  commentList.appendChild(commentItem)
  commentInput.value = ''
})

// Likes

likeBtn.addEventListener('click', () =>{
  likes++
  likeCount.textContent = likes
  console.log(`Here are likes ${likes}`)
})

//dislikes
dislikeBtn.addEventListener('click', () =>{
  dislikes++
  dislikeCount.textContent = dislikes
})