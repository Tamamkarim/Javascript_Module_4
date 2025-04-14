'use strict';
// target
const results = document.querySelector('#results');

// When the form is submitted...
const tvForm = document.querySelector('#tv');
tvForm.addEventListener('submit', async function (evt) {
  // ... prevent the default action.
  evt.preventDefault();
  // get value of input element
  const query = document.querySelector('input[name=q]').value;
  try {
    // error handling: try/catch/finally
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`,
    ); // starting data download, fetch returns a promise which contains an object of type 'response'
    const jsonData = await response.json(); // retrieving the data retrieved from the response object using the json() function
    console.log(jsonData); // log the result to the console

    results.innerHTML = '';
    for (const tvShow of jsonData) {
      const h2 = document.createElement('h2');
      h2.innerText = tvShow.show.name;
      const img = document.createElement('img');
      img.src = tvShow.show.image?.medium;
      img.alt = tvShow.show.name;
      const a = document.createElement('a');
      a.href = tvShow.show.url;
      a.innerText = 'Go to TV Show';
      const div = document.createElement('div');
      div.innerHTML = tvShow.show.summary;
      const article = document.createElement('article');
      article.append(h2, img, a, div);
      results.append(article);
    }
  } catch (error) {
    console.log(error.message);
  }
});
