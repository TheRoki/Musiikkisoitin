// kappalelista
var songs = ["epic.mp3", "newdawn.mp3", "highoctane.mp3"];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var left = document.getElementById('left');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');

var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

// kappaleen soitto näppäimillä
function loadSong() {
    song.src =  "songs/"  + songs[currentSong];
    songTitle.textContent = songs[currentSong];
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000);
}
// kappaleen soitto listasta valitsemalla
function playSelected(kappale) {
    song.src = "songs/" + kappale;
    songTitle.textContent = kappale;
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000);
}

// päivitys sekunnin välein
setInterval(updateSongSlider, 1000);
setInterval(timeLeft, 1000);

// sliderin päivitys
function updateSongSlider() {
    var c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if(song.ended) {
        next();
    }
}
// ajan esitys muodossa hh:mm:ss
function convertTime(secs) {
    var h = Math.floor(secs/3600);
    var min = Math.floor(secs/60);
    var sec = secs % 60;
    h = (h < 10) ? "0" + h : h;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    return (h + ":" + min + ":" + sec);
}
// kappaleen pituus
function showDuration() {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}
// jäljellä oleva aika
function timeLeft() {
    var d = Math.floor(song.duration);

    var c = Math.round(song.currentTime);

    var h = d - c;

    left.textContent = convertTime(h);
}
// onko kappale soimassa vai pausella
function playOrPause(img) {
    if(song.paused) {
        song.play();
        img.src = "https://opengameart.org/sites/default/files/pause_1.png";
    }
    else {
        song.pause();
        img.src = "https://opengameart.org/sites/default/files/play_1.png";
    }
}
// seuraava kappale
function next() {
    currentSong++;
    currentSong = (currentSong > 2) ? songs.length -3 : currentSong;
    loadSong();
}
// edellinen kappale
function previous() {
    currentSong--;
    currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
    loadSong();
}
// lopeta soitto
function stop() {
    song.pause();
    song.currentTime = 0;
}
// kelaaminen
function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}
// äänenvoimakkuuden säätö
function adjustVolume() {
    song.volume = volumeSlider.value;
}

