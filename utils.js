function rand(max) {
  return Math.floor(Math.random() * max);
}

function collides(a, b, val) {
  return Math.abs(a.x - b.x) <= val && Math.abs(a.y - b.y) <= val
}
