function visitPheromone(e, p) {
  e.visitedPheromoneIds.push(p.id)
  if (e.visitedPheromoneIds.length > 10) {
    e.visitedPheromoneIds.shift()
  }
}

function handleHoldingFood(e, nearbyPheromone) {
  const closeP = nearbyPheromone.find((p) => collides(p, e, 4))
  if (closeP) {
    closeP.amount += e.foodLeft / 5
  } else {
    const newP = makePheromone(e, e.foodLeft / 2)
    visitPheromone(e, newP)
  }
}

function handleDumping(e) {
  e.mode = 'dumping'
  e.amount -= 1
  e.colony.amount += 1
}

function handleEating(e, foodToEat) {
  e.mode = 'eating'
  e.amount += 1
  foodToEat.amount -= 1
  e.foodLeft = foodToEat.amount
}

function antAct(e) {
  if (handleDeath(e)) { return }

  const attackingSpider = game.entities.find((ant) => ant.type === 'spider' && collides(e, ant, 10))
  if (attackingSpider) {
    e.mode = 'attacking'
    attackingSpider.hp -= e.attackPower
    attackingSpider.lastAttacker = e
    return
  }
  if (e.mode === 'attacking' && !attackingSpider) {
    e.mode = 'seeking'
  }

  const closePheromones = game.entities.filter((p) => p.type === 'pheromone' && collides(p, e, 15) && p.amount >= 1);
  const nearbyPheromone = closePheromones.filter((p) => !e.visitedPheromoneIds.includes(p.id))

  const visitedPheromone = nearbyPheromone.find((p) => collides(p, e, 4))
  if (visitedPheromone) {
    visitPheromone(e, visitedPheromone)
  }

  if (e.amount > 0) {
    handleHoldingFood(e, nearbyPheromone)
  }

  if (collides(e, e.colony, 12) && e.amount > 0) {
    handleDumping(e)
    return
  }

  // handle all done dumping
  if (e.mode === 'dumping' && e.amount <= 0) {
    e.mode = 'seeking'
  }

  const foodToEat = game.entities.find((food) => food.type === 'food' && collides(food, e, (food.amount / 2 ) + 4) && food.amount >= 1);
  if (foodToEat && e.amount < e.capicity) {
    handleEating(e, foodToEat)
    return
  }

  // handle all done eating
  if (e.mode === 'eating') {
    if (e.amount >= e.capicity || !foodToEat) {
      e.mode = 'seeking'
      e.searchTarget = colony
    }
  }

  if (e.mode === 'seeking') {
    if (controlledEntity?.id === e.id) { return }

    if (!e.searchTarget) {
      e.searchTarget = { x: rand(canvasX), y: rand(canvasY) }
    }

    const foodToSmell = game.entities.find((food) => food.type === 'food' && collides(food, e, 100) && food.amount >= 1);
    if (foodToSmell && e.amount === 0) {
      moveTo(e, foodToSmell)
      return
    }

    if (nearbyPheromone.length > 0 && e.amount === 0) {
      const maxPheromone = nearbyPheromone.reduce((maxP, p) => {
        if (p.amount > maxP.amount) {
          return p
        } else {
          return maxP
        }
      })

      if (e.searchTarget != colony) {
        moveTo(e, maxPheromone)
        return
      }
    }

    moveTo(e, e.searchTarget)
  }
}

function makeAnt(colony) {
  const ant = {}
  ant.mode = 'seeking'
  ant.type = 'ant'
  ant.alliance = 'ant'
  ant.amountName = 'Food Held'
  ant.capicity = 5
  ant.amount = 0
  ant.hp = 5
  ant.attackPower = 2
  ant.title = antNames[rand(antNames.length)]
  ant.x = colony.x + rand(50) - 25;
  ant.y = colony.y + rand(50) - 25;
  ant.colony = colony
  ant.id = getId();
  ant.visitedPheromoneIds = []
  ant.keyBinds = {
    ...movementKeyBinds
  }
  ant.act = antAct
  ant.render = (e) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0 0 0)";
    const width = 10 + e.amount
    const offset = width / 2
    ctx.fillRect(e.x - offset, e.y - offset, width, width);
  }
  game.entities.push(ant)
}