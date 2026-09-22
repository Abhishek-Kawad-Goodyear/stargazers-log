const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');

function formatStars(stars) {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(stars);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(`${date}T00:00:00`));
}

function renderRepositories(repositories) {
  repositoryCount.textContent = `${repositories.length} repositories`;
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const article = document.createElement('article');
    article.className = 'repository';
    article.innerHTML = `
      <div>
        <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.owner}/${repository.name}</a></h3>
        <p class="repository-description">${repository.description}</p>
      </div>
      <p class="repository-meta">
        <span class="star-count">${formatStars(repository.stars)} stars</span>
        <span>${repository.language}</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </p>
    `;
    repositoryList.append(article);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = '<p class="status-message">Repositories could not be loaded right now.</p>';
    repositoryCount.textContent = '';
    console.error(error);
  }
}

loadRepositories();