function moveTo(e, searchTarget) {
  const diffX = searchTarget.x - e.x
  const diffY = searchTarget.y - e.y

  if (Math.abs(diffX) > 4) {
    if (rand(50) === 0) { moveUp(e) }
    if (rand(50) === 0) { moveDown(e) }

    if (diffX > 0) {
      moveRight(e)
    } else {
      moveLeft(e)
    }
  }

  if (Math.abs(diffY) > 4) {
    if (rand(50) === 0) { moveRight(e) }
    if (rand(50) === 0) { moveLeft(e) }

    if (diffY > 0) {
      moveDown(e)
    } else {
      moveUp(e)
    }
  }

  if (Math.abs(diffX) <= 4 && Math.abs(diffY) <= 4) {
    e.searchTarget = undefined
  }
}