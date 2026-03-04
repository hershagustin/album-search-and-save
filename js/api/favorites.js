// TASK 5
export async function postFavoriteAlbum(album) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    };
    const res = await fetch('https://6628195a54afcabd0734e043.mockapi.io/api/v1/favoritess', requestOptions);
  
    return await res.json();
}