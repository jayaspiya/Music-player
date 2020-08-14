import yourSongs from "./song.js";
const wrap = document.querySelector("#playPause");
const controllerNext = document.querySelector("#controllerNext");
const controllerPrevious = document.querySelector("#controllerPrevious");
const playing = document.querySelector("#playing");
const musicList = document.querySelector("#musicList");
const thumbnailImg = document.querySelector("#thumbnailImg");
const indicator = document.querySelector("#indicator");
const progressDuration = document.querySelector("#progressDuration");
const songs = document.querySelector("#songs");

let isPlay = true;
let indicatorStarted = false;
let timer;

wrap.addEventListener("click", function () {
  if (audio.src) {
    playPauseSong();
  }
});
function playPauseSong() {
  toggler();
  if (isPlay) {
    wrap.style.transform = "rotate(180deg)";
    isPlay = false;
    playAudio();
    startIndicator();
  } else {
    wrap.style.transform = "rotate(0deg)";
    isPlay = true;
    pauseAudio();
    stopIndicator();
  }
}
function toggler(prime = true) {
  const childWrap = wrap.children;

  if (prime) {
    childWrap[0].classList.toggle("pause");
    childWrap[1].classList.toggle("pause");
  } else {
    if (!childWrap[0].classList.contains("pause")) {
      childWrap[0].classList.toggle("pause");
      childWrap[1].classList.toggle("pause");
    }
  }
}

controllerPrevious.addEventListener("click", previousMusic);
controllerNext.addEventListener("click", nextMusic);

function previousMusic(e) {
  controllerPrevious.classList.add("anim");
  setTimeout(() => {
    controllerPrevious.classList.remove("anim");
  }, 100);
  audio.currentTime -= 5;

  e.preventDefault();
}

function nextMusic(e) {
  controllerNext.classList.add("anim");
  setTimeout(() => {
    controllerNext.classList.remove("anim");
  }, 100);
  audio.currentTime += 5;
  e.preventDefault();
}
const musics = yourSongs.pull();

musics.forEach((music) => {
  let span = document.createElement("span");
  const txt = document.createTextNode(ConvertToReadable(music));
  const att = document.createAttribute("class");
  att.value = "music";
  span.append(txt);
  span.setAttributeNode(att);
  musicList.appendChild(span);
});

let audio = new Audio();

function playAudio() {
  audio.play();
}
function pauseAudio() {
  audio.pause();
}
musicList.addEventListener("click", (e) => {
  if (e.target.classList.contains("music")) {
    let song = e.target.textContent;

    playing.textContent = song;
    song = ConvertToReadable(song, false);
    audio.src = "assets/music/" + song + ".mp3";
    thumbnailImg.src = "assets/thumbnail/" + song + ".jpg";
    audio.play();
    toggler(false);
    isPlay = false;
    startIndicator();
  }

  e.preventDefault();
});
function ConvertToReadable(txt, convertToReadableString = true) {
  if (convertToReadableString) {
    txt = txt.replaceAll("_", " ");
  } else {
    txt = txt.replaceAll(" ", "_");
  }

  return txt;
}
function startIndicator() {
  if (!indicatorStarted) {
    timer = setInterval(function () {
      const currentTime = Math.floor(audio.currentTime);
      const durationTime = Math.floor(audio.duration);
      const timeDuration = Math.floor((currentTime / durationTime) * 100);

      indicator.style.width = `${timeDuration}%`;
      progressDuration.textContent =
        timeFormatter(currentTime) + "/" + timeFormatter(durationTime);
    }, 500);
    indicatorStarted = true;
  }

  function timeFormatter(tm) {
    if (tm < 60) {
      tm = "00:" + timeFormatterLess(tm);
    } else {
      const tmMin = Math.floor(tm / 60);
      const tmSec = tm % 60;
      tm = timeFormatterLess(tmMin) + ":" + timeFormatterLess(tmSec);
    }

    function timeFormatterLess(tmCheck) {
      if (tmCheck < 10) {
        tmCheck = "0" + tmCheck;
      }
      return tmCheck;
    }
    return tm;
  }
}

function stopIndicator() {
  indicatorStarted = false;
  clearInterval(timer);
}
songs.addEventListener("click", function () {
  musicList.classList.toggle("openPlaylist");
  thumbnailImg.parentElement.classList.toggle("openPlaylistThumbnail");
  songs.textContent == "Hide"
    ? (songs.textContent = "Show")
    : (songs.textContent = "Hide");
});
