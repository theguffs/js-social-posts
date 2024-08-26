const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
// lavoro miooooo

// Visualizza l'array di post come una tabella nel console log (visto nella lezione del pomeriggioooo)

console.table(posts);

const container = document.getElementById('container');

// formattare la data nel formato italiano

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

// Funzione per ottenere le iniziali dell'autore
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

// Funzione per aggiornare i post nel DOM
function renderPosts() {
    container.innerHTML = ''; // Pulisce il contenitore
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Immagine del profilo o fallback
        let profileImageHTML;
        if (post.author.image) {
            profileImageHTML = `<img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">`;
        } else {
            const initials = getInitials(post.author.name);
            profileImageHTML = `<div class="profile-pic-default">${initials}</div>`;
        }

        postElement.innerHTML = `
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">${profileImageHTML}</div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${formatDate(post.created)}</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image"><img src="${post.media}" alt=""></div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button" data-postid="${post.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div>
            </div>
        `;

        container.appendChild(postElement);
    }
}

// Gestore di eventi per i pulsanti del Mi Piace
container.addEventListener('click', function(event) {
    const button = event.target.closest('.js-like-button');
    if (button) {
        const postId = button.getAttribute('data-postid');
        const post = posts.find(p => p.id == postId);
        const likeCounter = document.getElementById(`like-counter-${postId}`);

        // Incrementa o decrementa i like e aggiorna il pulsante
        if (button.classList.contains('like-button--liked')) {
            post.likes--;
            button.classList.remove('like-button--liked');
        } else {
            post.likes++;
            button.classList.add('like-button--liked');
        }
        likeCounter.textContent = post.likes;
    }
});

renderPosts();