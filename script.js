const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=11316024a2d8685bd72864cd19d53d2e&page=1&append_to_response=movie';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=11316024a2d8685bd72864cd19d53d2e&query="';

const form = document.getElementById('form');
const search = document.querySelector('#search');
const mainContainer = document.querySelector('#main');

//Get movies onLoad

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

const showMovies = (movies) => {
  mainContainer.innerHTML = '';

  movies.forEach((movie) => {
    const { title, id, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
            <img
              src="${IMG_PATH + poster_path}" alt="${title}"
            />
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(
                vote_average
              )}">${vote_average}</span>
            </div>
            <div class="overview">
              <h3>Overview</h3>
              ${overview}
            </div>
          `;

    mainContainer.appendChild(movieEl);

    movieEl.addEventListener('click', () => {
      getMovieDetails(api_movie_details_url);
    });

    let api_movie_details_url = `https://api.themoviedb.org/3/movie/${id}?api_key=11316024a2d8685bd72864cd19d53d2e`;
  });
};

async function getMovieDetails(url) {
  const res = await fetch(url);
  const data = await res.json();
  const homepage = data.homepage;
  window.open(homepage, '_blank');
  console.log(data);
}

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    const results = getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
