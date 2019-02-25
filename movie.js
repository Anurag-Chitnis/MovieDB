var apiKey = 'ab65d2aca72c65275c8cc159b760f764';

var accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY1ZDJhY2E3MmM2NTI3NWM4Y2MxNTliNzYwZjc2NCIsInN1YiI6IjVjM2ExZWY5OTI1MTQxNGRlMjc0MWIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MXz3iBkgGSMBO6RrfUJvPzb1PGqQr6INd6VepJJh55A';

document.querySelector(".form").addEventListener('submit',(e)=>{
    e.preventDefault();
    var text = document.querySelector('.inputText').value;
    console.log(text)
    getMovie(text);
})

function getMovie(text){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}`)
    .then(res => res.json())
    .then(res => res.results.forEach(item => {
        // console.log(item.id + " " + item.title + "get Movie");
        getQueryDetails(item.id , item.title);
        // renderImage(item.title);
    }))
}

function getQueryDetails(id,title){
    // console.log(id + " " + title + "getQueryDetails");
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(res => getImages(res.poster_path,title,res.overview,res.vote_average,res.tagline,res.revenue,res.status)) 
    // .then(res => console.log(res))
}

function getImages(img,title,story,vote,tagline,revenue,status){
    fetch(`https://image.tmdb.org/t/p/w400${img}`)
    .then(res => renderImage(res.url,title,story,vote,tagline,revenue,status))
}

function renderImage(url,title,story,vote,tagline,revenue,status){
    console.log(story + "   " + " " + vote + " " + " " + tagline + " " + " " + revenue + " " + status)
    var imageBox = document.createElement('div');
    imageBox.className = "box";

    imageBox.innerHTML = `
    
    <div class="col s12 m12 l4">
        <div class="card white-text grey darken-4" id="card">
            <div class="card-image">
                <img src="${url}" class="activator" alt="">
            </div>
            <div class="card-content">
                <span class="card-title activator">${title}</span>
            </div>
            <div class="card-reveal grey darken-4 white-text">
                <span class="card-title grey-text text-darken-4"><i class="material-icons right white-text">close</i></span>
                <h5 class="white-text">Story</h5>
                <p class="white-text">${story}</p>
                <h5>Overview</h5>
                <p>Status: ${status}</p>
                <p>Rating: ${vote}</p>
                <p>Revenue: ${revenue}</p>
            </div>
        </div>
    </div>
    `

    document.querySelector('#modal-content').innerHTML = `
        <img src="${url}" class="modal_image" alt="">
        <h2>${tagline}</h2>
        <p>${story}</p>
        <h2>Overview</h2>
        <p>Status: ${status}</p>
        <p>Rating: ${vote}</p>
        <p>Revenue: ${revenue}</p>
    `

    document.querySelector('.row').appendChild(imageBox)
}
