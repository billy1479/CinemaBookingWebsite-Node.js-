// For Server-functions
rootUrl = 'http://127.0.0.1/5500/';
async function loadCurrentFilms() {
    const currentFilmsObject = await fetch(rootUrl + '/currentFilms');
    console.log(currentFilmsObject);
}
loadCurrentFilms();