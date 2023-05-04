"use strict";

const main = document.querySelector("main");
const form = document.getElementById("form");
const searchEl = document.getElementById("search");
const APIURL = `
https://api.themoviedb.org/3/movie/top_rated?api_key=117ce623230538789e8aa2c9fadbb189&language=en-US&page=1`;
const imgPATH = `https://image.tmdb.org/t/p/original/`;
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=117ce623230538789e8aa2c9fadbb189&language=en-US&page=1&include_adult=false&query=`;

getMovies(APIURL);

async function getMovies(url) {
  main.innerHTML = "";
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);

  showMovies(data.results);

  // main.insertAdjacentHTML("beforeend", html);
}

function showMovies(movies) {
  movies.forEach((result) => {
    const { original_title, poster_path, vote_average, overview } = result;
    // console.log(poster_path);
    const imgEl = document.createElement("img");
    const divEl = document.createElement("div");
    imgEl.src = `${imgPATH}${result.poster_path}`;
    divEl.innerHTML = `<div class="movie-card">
    <img
    class="movie-img"
    src=${imgPATH}${poster_path}
    alt="movies"/>
  <div class="movie-info">
    <p class="movie-title">${original_title}</p>
    <span class="rating ${getClassColor(vote_average)}">${vote_average}</span>
    </div>
    
    `;
    // <p class="overview">${overview}</p>

    // const card = document.querySelectorAll(".movie-card");

    // if (result.poster_path === null) {
    //   card.remove();
    // }
    main.appendChild(divEl);
  });
}

function getClassColor(vote) {
  if (vote >= 7) return "green";
  if (vote < 7 && vote >= 3) return "orange";
  if (vote < 3) return "red";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchValue = searchEl.value;
  console.log(searchValue);

  if (searchValue) {
    getMovies(searchAPI + searchValue);
  }
});
