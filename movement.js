const baseSpeed = 4
const speedVariance = 4

function moveInterval(additionalSpeed) {
  const coercedAdditionalSpeed = additionalSpeed || 0
  return rand(speedVariance) + baseSpeed + coercedAdditionalSpeed;
}

function moveUp(e) {
  e.y = e.y - moveInterval(e.speed);
}

function moveDown(e) {
  e.y = e.y + moveInterval(e.speed);
}

function moveLeft(e) {
  e.x = e.x - moveInterval(e.speed);
}

function moveRight(e) {
  e.x = e.x + moveInterval(e.speed);
}
