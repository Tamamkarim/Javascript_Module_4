const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    alert('Anna sarjan nimi');
    return;
  }

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Tyhjennä vanhat tulokset
    resultsDiv.innerHTML = '';

    data.forEach(tvShow => {
      const show = tvShow.show;

      const article = document.createElement('article');

      // Nimi
      const name = document.createElement('h2');
      name.textContent = show.name;
      article.appendChild(name);

      // Linkki
      const link = document.createElement('a');
      link.href = show.url;
      link.target = '_blank';
      link.textContent = 'Sarjan tiedot';
      article.appendChild(link);

      // Kuva (tarkista, onko olemassa)
      if (show.image?.medium) {
        const img = document.createElement('img');
        img.src = show.image.medium;
        img.alt = show.name;
        article.appendChild(img);
      }

      // Yhteenveto
      const summary = document.createElement('div');
      summary.innerHTML = show.summary || 'Ei yhteenvetoa saatavilla.';
      article.appendChild(summary);

      resultsDiv.appendChild(article);
    });

  } catch (error) {
    console.error('Virhe tietojen haussa:', error);
    resultsDiv.innerHTML = '<p>Tapahtui virhe. Yritä myöhemmin uudelleen.</p>';
  }
});
