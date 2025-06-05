class Posts {
    _apiBaseUrl;
    _limit = 100;

    constructor(apiBaseUrl, limit) {
        this._apiBaseUrl = apiBaseUrl;
        this._limit = limit ?? 100;
    }

    async fetchPosts() {
        try {
            const response = await fetch(`${this._apiBaseUrl}/posts`);
            // const response = await fetch(`./js/postsMock.json`);
            if (!response.ok) {
                throw Error('Cannot GET posts!');
            }
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    renderPosts(posts) {
        const container = document.querySelector('.posts');
        if (!container) { return; }
        if (!posts?.length) { return; }
        posts = (posts ?? []).slice(0, this._limit);
        container.innerHTML = '';
        (posts ?? []).forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            const cardImage = document.createElement('div');
            cardImage.className = 'post-card__image';
            const cardImageMedia = document.createElement("img");
            const cardContent = document.createElement('div');
            cardContent.className = 'post-card__content';
            const cardTitle = document.createElement('h3');
            cardTitle.className = 'post-card__title';
            const cardText = document.createElement('div');
            cardText.className = 'post-card__text';
            const cardLink = document.createElement('a');
            cardLink.className = 'post-card__link';

            cardLink.href = post.id ? `post.html?id=${post.id}` : '#';
            cardText.innerText = post.body ?? '';
            cardTitle.innerText = post.title ?? '';
            cardImageMedia.src = 'https://placehold.co/600x400';

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardText);
            cardImage.appendChild(cardImageMedia)
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            card.appendChild(cardLink);
            container.appendChild(card);
        });
    }

    async init() {
        const data = await this.fetchPosts();
        if (!data?.length) { return; }
        this.renderPosts(data);
    }
}