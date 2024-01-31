function makePheromone(ant, startingAmount) {
  const startingStr = startingAmount || 25.0
  const pheromone = {}
  pheromone.type = 'pheromone'
  pheromone.title = 'Pheromone'
  pheromone.amountName = 'Juice Remaining'
  pheromone.amount = startingStr
  pheromone.x = ant.x;
  pheromone.y = ant.y;
  pheromone.id = getId();
  pheromone.splat = [...Array(10)].map(() => [...Array(10)].map(() => rand(4) === 0 ? rand(5) : 0))
  pheromone.act = (e) => {
    if (rand(25) == 0) { e.amount -= 1 }
    if (e.amount <= 0) { removeEntity(e) }
  }
  pheromone.render = (e) => {
    const ctx = canvas.getContext("2d");
    const alpha = (e.amount - 2) / (startingStr * 4)
    ctx.fillStyle = `rgb(220,10,10,${alpha})`;

    e.splat.forEach((splatRow, rowIndex) => {
      splatRow.forEach((splat, index) => {
        if (splat) {
          ctx.fillRect(e.x + rowIndex - 5, e.y + index - 5, splat + 2, splat + 2);
        }
      })
    })
  }

  game.entities.push(pheromone)
  
  return pheromone
}