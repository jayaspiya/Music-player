const wrap = document.querySelector("#playPause");
const controllerNext = document.querySelector("#controllerNext");
const controllerPrevious = document.querySelector("#controllerPrevious");

let isPlay = true;
wrap.addEventListener("click", function () {
  const childWrap = wrap.children;
  childWrap[0].classList.toggle("pause");
  childWrap[1].classList.toggle("pause");
  if (isPlay) {
    wrap.style.transform = "rotate(180deg)";
    isPlay = false;
  } else {
    wrap.style.transform = "rotate(0deg)";
    isPlay = true;
  }
});

controllerPrevious.addEventListener("click", previousMusic);
controllerNext.addEventListener("click", nextMusic);

function previousMusic(e) {
  controllerPrevious.classList.add("anim");
  setTimeout(() => {
    controllerPrevious.classList.remove("anim");
  }, 100);
  e.preventDefault();
}

function nextMusic(e) {
  controllerNext.classList.add("anim");
  setTimeout(() => {
    controllerNext.classList.remove("anim");
  }, 100);
  e.preventDefault();
}
