document.getElementById('jokeButton').addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    document.getElementById('jokeDisplay').innerText = data.value;
  } catch (error) {
    console.error('Error fetching joke:', error);
  }
});
