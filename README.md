#Functional Programming

## Getting started: Installation ##
Om de applicatie te laten functioneren dienen er een paar stappen uitgevoerd te worden.

### Git
Installeer Git door de volgende commands uit te voeren in de terminal: 
```
sudo apt update
sudo apt install git
```
Om te controleren of het gelukt is voer je de volgende command in de terminal uit: 
```
git --version
```
Voorbeeld output: 
```
git version 2.32.0
```

### NPM
Installeer NPM door de volgende command uit te voeren in de terminal: 
```
npm install
``` 
Check of het gelukt is door de volgende command: 
```
npm -v
```
Voorbeeld output: 
```
7.19.0 
```

Kopieer deze repo door de volgende command in je terminal uit te voeren: 
```
git clone https://github.com/DeefDeMeef/blok-tech.git
```

Om de applicatie te starten voer je de volgende comment in de terminal (Bash): 
```
npm start
```
Vervolgens krijg je een link vanuit de terminal waar de applicatie op te vinden is.
De applicatie werkt nu nog niet maar de verwachte output zou er zo uit moeten zien: 
```
Compiled successfully!

You can now view spotify-player in the browser.

  http://localhost:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.

```

### Einde installatie
Yes! Het is je hopelijk gelukt. Wanneer je nu de command `npm start` uitvoerd in de terminal en vervolgens naar de link gaat die de terminal geeft zie je het dashbard verschijnen in je browser.

## Spotify API
Zoals ik hierboven al vertelde is deze api het hart van de applicatie. Hij handelt het inloggen en zorgt data de data opgehaald kan worden vanaf de Spotify databases en ook weer iets terug kan sturen naar Spotify. \
Een voorbeeld van data ophalen van de Spotify Servers:
```js
 const user = await spotifyApi.getMe();
 console.log(user.body.display_name);
```
Dit stukje code haalt een gebruiker op en console logged vervolgens zijn/haar display_name, in mijn geval zou dit Davey Zaal zijn.

Een voorbeeld van iets terug sturen naar de Spotify databases:
```js
spotifyApi.createPlaylist('Spotify Tinder', { 'description': 'Dit is een automatisch aangemaakte playlist door de app Spotify Tinder, hierin worden al jouw likes opgeslagen', 'public': true })
.then(function(data) {
   console.log(data.body.id;)
}, function(err) {
   console.log('Something went wrong!', err);
});
``` 
Met deze code maak je een playlist aan (de gebruiker moet wel ingelogd zijn zodat er een token gezet is) wanneer dit gelukt is console logged de server het id van de aangemaakte playlist. Wanneer je nu Spotify opent (de normale) dan zie je dat er een playlist aangemaakt is.


## Licence 
MIT

