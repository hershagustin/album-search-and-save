// store favorites data
let favoritesData = []; 

async function appInit() {
    const res = await fetch('https://6628195a54afcabd0734e043.mockapi.io/api/v1/albums');
    appInit.albumData = await res.json(); 
    switchToSearchTab();
    searchAlbums('');
}
// TASK 1
function switchToSearchTab() {
    document.getElementById('favorites-button').classList.remove('active');
    document.getElementById('search-button').classList.add('active');
    document.getElementById('favorites-tab').classList.add('d-none');
    document.getElementById('search-tab').classList.remove('d-none');
}

function switchToFavoritesTab() {
    document.getElementById('search-button').classList.remove('active');
    document.getElementById('favorites-button').classList.add('active');
    document.getElementById('search-tab').classList.add('d-none');
    document.getElementById('favorites-tab').classList.remove('d-none');
    updateFavoritesUI(); 
}
// TASK 2
function searchAlbums(query) {
    const albums = document.getElementById('search-results');
    // clear search results
    albums.innerHTML = ''; 
    
    const results = appInit.albumData.filter(album => {
        const artistMatch = album.artistName.toLowerCase().includes(query.toLowerCase());
        const albumMatch = album.albumName.toLowerCase().includes(query.toLowerCase());
        return artistMatch || albumMatch;
    });
    
    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        listItem.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${result.albumName} <span class="badge bg-primary rounded-pill">${result.averageRating}</span></div>
                <span>${result.artistName}</span>
            </div>
            <button data-uid="${result.id}" type="button" class="btn btn-success">Add to Favorites</button>
        `;
        albums.appendChild(listItem);
    });
}

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const query = document.getElementById('query').value;
    searchAlbums(query);
});

// TASK 3
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn-success')) {
        const albumId = event.target.dataset.uid; 
        const albumToAdd = appInit.albumData.find(album => album.id === albumId);
        if (albumToAdd) {
            addToFavorites(albumToAdd); 
            updateFavoritesUI(); 
        }
    }
});

async function addToFavorites(album) {
    if (!favoritesData.some(favorite => favorite.id === album.id)) {
        favoritesData.push(album); 
        
        // Add album to favorites in the mockapi - TASK 5
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(album)
        };
        const res = await fetch('https://6628195a54afcabd0734e043.mockapi.io/api/v1/favorites', requestOptions);
        return await res.json();
    }
}

function updateFavoritesUI() {
    const favoritesList = document.getElementById('my-albums');
    favoritesList.innerHTML = ''; 
    // clear favorites list
    favoritesData.forEach(album => {
        // render album in favorites list
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        listItem.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${album.albumName} <span class="badge bg-primary rounded-pill">${album.averageRating}</span></div>
                <span>${album.artistName}</span>
            </div>
            <button data-uid="${album.id}" type="button" class="btn btn-danger">Remove from Favorites</button>
        `;
        favoritesList.appendChild(listItem);
    });
    attachRemoveFromFavoritesListeners(); 
}
// TASK 4
function attachRemoveFromFavoritesListeners() {
    const removeButtons = document.querySelectorAll('#my-albums .btn-danger');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const albumId = button.dataset.uid;
            removeFromFavorites(albumId); 
            updateFavoritesUI();
        });
    });
}

async function removeFromFavorites(albumId) {
    favoritesData = favoritesData.filter(album => album.id !== albumId);
}

document.getElementById('search-button').addEventListener('click', switchToSearchTab);
document.getElementById('favorites-button').addEventListener('click', switchToFavoritesTab);

appInit();