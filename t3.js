const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', searchShows);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchShows();
  }
});

async function searchShows() {
  const query = searchInput.value.trim();
  if (!query) return;

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
  const data = await response.json();

  resultsDiv.innerHTML = ''; // Clear old results

  data.forEach(tvShow => {
    const show = tvShow.show;

    const article = document.createElement('article');

    const nameElement = document.createElement('h2');
    nameElement.textContent = show.name;
    article.appendChild(nameElement);

    const linkElement = document.createElement('a');
    linkElement.href = show.url;
    linkElement.target = '_blank';
    linkElement.textContent = 'View Details';
    article.appendChild(linkElement);

    if (show.image?.medium) {
      const imgElement = document.createElement('img');
      imgElement.src = show.image.medium;
      imgElement.alt = show.name;
      article.appendChild(imgElement);
    }

    const summaryElement = document.createElement('div');
    summaryElement.innerHTML = show.summary || 'No summary available.';
    article.appendChild(summaryElement);

    resultsDiv.appendChild(article);
  });
}
