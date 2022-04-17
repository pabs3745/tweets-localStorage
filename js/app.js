// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



// listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}



// functions

function agregarTweet(e) {
    e.preventDefault();
    // console.log('Agregando...');

    const tweet = document.querySelector('#tweet').value;
    
    // vlaidation
    if (tweet === ''){
        mostrarError('El mensaje no puede estar vacío');
        return; // evitar que el codigo siga ejecutandose
    }

    const tweetOb = {
        id: Date.now(),
        tweet       // key and value have the same name
    }
    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetOb];

    // crear el HTML
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}

// mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout( () => {
        mensajeError.remove();
    }, 3000);
}

// show tweets list

function crearHTML(){
    limpiarHTML();  // limpiar para evitar duplicados cuando agrega los tweets al HTML
    if(tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'x';
            btnEliminar.classList.add('borrar-tweet');

            // eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // create HTML
            const li = document.createElement('li');
            li.innerText = tweet.tweet; // el tweet es el valor de la llave del arreglo

            // asignar el boton eliminar
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        })
    }

    sincronizrStorage();
}

function limpiarHTML(){
    while ( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// agregar los tweets al localStorage
function sincronizrStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    // console.log('Borrarndo...', id);
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}
