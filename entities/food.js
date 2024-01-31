function makeFood() {
  const food = {}
  food.type = 'food'
  food.title = 'Food'
  food.amountName = 'Food Stored'
  food.x = colony.x + ((rand(200) - 100) * 2);
  food.y = colony.y + ((rand(200) - 100) * 2);
  // food.x = rand(canvasX)
  // food.y = rand(canvasY)
  food.amount = rand(25);
  food.id = getId();
  food.act = (e) => {
    if (e.amount <= 0) { removeEntity(e) }
  }
  food.render = (e) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(144,238,144)";
    const offset = food.amount / 2
    ctx.fillRect(e.x - offset, e.y - offset, food.amount, food.amount);
  }

  game.entities.push(food)

  return food
}
