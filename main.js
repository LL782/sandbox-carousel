const DOT_SELECTOR = ".nav-dot";
const DOT_ACTIVE_CLASS = "active";

const track = window.document.querySelector("[data-nav_track]");
const dots = window.document.querySelectorAll(DOT_SELECTOR);

let touchStartPosition;
let touchEndPosition;
let currentPosition;
let length;

function init() {
  storeCurrentPosition();
  storeLength();
  track.addEventListener("touchstart", handleTouchStart, false);
  track.addEventListener("touchend", handleTouchEnd, false);
  dots.forEach((dot) => dot.addEventListener("click", handleDotClick));
}

function storeCurrentPosition() {
  currentPosition = track.dataset.position / 1;
}

function storeLength() {
  length = track.dataset.length / 1;
}

function handleTouchStart(e) {
  touchStartPosition = getTouchPosition(e);
}

function handleTouchEnd(e) {
  touchEndPosition = getTouchPosition(e);
  handleSwipeDirection();
}

function handleSwipeDirection() {
  const diff = touchStartPosition - touchEndPosition;
  diff < 0 ? moveLeft() : moveRight();
}

function moveLeft() {
  let target = currentPosition - 1;
  if (target < 1) {
    target = 1;
  }
  goToPosition(target);
}

function moveRight() {
  const target = currentPosition + 1;
  if (target > length) {
    target = length;
  }
  goToPosition(target);
}

function getTouchPosition(touchEvent) {
  const { clientX } = touchEvent.changedTouches[0];
  return clientX;
}

function handleDotClick(e) {
  const position = e.target.dataset.position;
  goToPosition(position);
}

function goToPosition(p) {
  currentPosition = p;
  positionCard(p);
  highlightDot(p);
}

function positionCard(p) {
  console.log(`postionCard: `, p);

  track.classList.add("animating");
  track.addEventListener("transitionend", removeAnimating);
  track.dataset.position = p;
}

function highlightDot(p) {
  const currentlyActive = window.document.querySelector(
    `${DOT_SELECTOR}.${DOT_ACTIVE_CLASS}`
  );

  const newlyActive = dots[p - 1];

  currentlyActive.classList.remove(DOT_ACTIVE_CLASS);
  newlyActive.classList.add(DOT_ACTIVE_CLASS);
}

function removeAnimating() {
  track.classList.remove("animating");
}

init();
