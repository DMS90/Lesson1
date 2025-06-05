class Post {
    _apiBaseUrl;
    _limit = 100;
    _urlSearchParams;
    _id = '';

    constructor(apiBaseUrl, limit) {
        this._apiBaseUrl = apiBaseUrl;
        this._limit = limit ?? 100;
        this._urlSearchParams = new URLSearchParams(window.location.search);
        this._id = this._urlSearchParams.get('id');
    }

    async fetchPosts() {
        try {
            const response = await fetch(`${this._apiBaseUrl}/posts/${this._id}`);
            // const response = await fetch(`./js/postMock.json`);
            if (!response.ok) {
                throw Error('Cannot GET posts!');
            }
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    async fetchComments() {
        try {
            const response = await fetch(`${this._apiBaseUrl}/posts/${this._id}/comments`);
            // const response = await fetch(`./js/postCommentsMock.json`);
            if (!response.ok) {
                throw Error('Cannot GET posts!');
            }
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    renderPost(post) {
        const container = document.querySelector('.post-container');
        if (!container || !post) { return; }
        container.innerHTML = '';
        const header = document.createElement('header');
        header.className = 'post__header';
        const headerImage = document.createElement('img');
        headerImage.className = 'post__header-image';
        const title = document.createElement('h1');
        title.className = 'post__title';
        const content = document.createElement('div');
        content.className = 'post__content';

        headerImage.src = 'https://placehold.co/1920x1080';
        headerImage.alt = post.title || '';
        title.innerText = post.title || '';
        content.innerHTML = post.body || '';

        header.appendChild(headerImage);
        container.appendChild(header);
        container.appendChild(title);
        container.appendChild(content);
    }

    renderComments(comments) {
        const container = document.querySelector('#commentList');
        if (!container || !comments?.length) { return; }
        container.innerHTML = '';
        (comments ?? []).forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment';
            const name = document.createElement('div');
            name.className = 'comment__name';
            const email = document.createElement('div');
            email.className = 'comment__email';
            const body = document.createElement('div');
            body.className = 'comment__body';

            name.textContent = comment.name || '';
            email.textContent = comment.email || '';
            body.textContent = comment.body || '';

            commentEl.appendChild(name);
            commentEl.appendChild(email);
            commentEl.appendChild(body);
            container.appendChild(commentEl);
        });
        const countEl = document.querySelector('.comments__count');
        if (countEl) {
            countEl.textContent = comments.length;
        }
    }

    async init() {
        const post = await this.fetchPosts();
        const comments = await this.fetchComments();
        console.log('Posts', post);
        console.log('Comments', comments);
        if (post) {
            this.renderPost(post);
        }
        if (comments?.length) {
            this.renderComments(comments);
        }
    }
}