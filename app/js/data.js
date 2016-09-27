
var getData = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                console.log(json);
                resolve(json.Search);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = (error) => reject(error);

        xhr.send();
    });
}

let search = 'bug';

getData(`http://www.omdbapi.com/?s=${search}`)
.then(movies => {
  // myReact(movies);
  console.log(JSON.stringify(movies));
  console.log(tt);
}
//   movies =>{
//   var contentHTML;
//   movies.forEach((movie) => {
//     console.log('work ');
//     contentHTML+=addMovieList(movie);
//   })
//   $('.movie-list').html(contentHTML);
// }
)
.catch(error => console.error(error));
