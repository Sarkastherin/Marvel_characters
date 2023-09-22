// Tus claves de acceso
const publicKey = '9e12fe2a622a2b003f35f11aa1d01d64';
const privateKey = '1e1cea9312decce08b85a0394ffc932f1527d441';
const container = document.getElementById('containerBody')

// Genera un timestamp único (puedes usar la hora actual en milisegundos)
const ts = Date.now().toString();

// Concatena ts, private key y public key
const concatenatedString = ts + privateKey + publicKey;

// Calcula el hash MD5
const hash = CryptoJS.MD5(concatenatedString).toString();

// Ahora puedes construir tu solicitud a la API de Marvel
const url = `https://gateway.marvel.com:443/v1/public/characters?series=93&limit=24&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
.then(response => response.json())
.then(characters => characters.data.results)
.then(items => {
    for (let item of items ) {
        if (!item.thumbnail.path.includes('image_not_available')) {
            container.innerHTML += `
            <div class="container">
                <div class="card-character">
                    <div class="card-character-img">
                        <img src="${item.thumbnail.path}.${item.thumbnail.extension
                        }" alt="">
                    </div>
                    <h2 class="character-name">${item.name}</h2>
                    <p class="character-description"><a href="${item.urls[0].url} target="_blank">See more here</a></p>
                </div>
            </div>`
        }
        
    }
})

/* `<div class="container">
<div class="card-character">
    <div class="card-character-img">
        <img src="" alt="">
    </div>
    <h2 class="character-name"></h2>
    <p class="character-description"></p>
</div>
</div>` */