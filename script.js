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
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(stars);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`));
}

function createRepositoryCard(repository) {
  const article = document.createElement('article');
  article.className = 'repository';

  const link = document.createElement('a');
  link.className = 'repository-link';
  link.href = repository.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = repository.full_name;

  const description = document.createElement('p');
  description.className = 'repository-description';
  description.textContent = repository.description || 'No description provided.';

  const metadata = document.createElement('p');
  metadata.className = 'repository-meta';
  const language = repository.language || 'Not specified';
  metadata.textContent = `${language} · ★ ${formatStars(repository.stars)} stars · Starred ${formatDate(repository.starred_at)}`;

  article.append(link, description, metadata);
  return article;
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
    const response = await fetch('events.json', { headers: { Accept: 'application/json' } });
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error('Repository data is not a list');
    }

    repositoryCount.textContent = `${repositories.length} ${repositories.length === 1 ? 'repository' : 'repositories'}`;
    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
  } catch (error) {
    console.error('Failed to load starred repositories:', error);
    repositoryList.innerHTML = '<p class="status error" role="alert">Starred repositories could not be loaded right now.</p>';
  }
}

loadRepositories();
