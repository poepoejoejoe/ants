function buyAnt(colony) {
  if (colony.amount >= antCost) {
    colony.amount -= antCost
    makeAnt(colony)
  }
}

function buySoldier(colony) {
  if (colony.amount >= soldierCost) {
    colony.amount -= soldierCost
    makeSoldier(colony)
  }
}

const colonyKeybinds = {
  "1": buyAnt,
  "2": buySoldier,
}

function makeColony() {
  const colony = {}
  colony.type = 'colony'
  colony.amount = 20
  colony.amountName = 'Food Stored'
  colony.title = 'The Great Colony'
  colony.x = rand(canvasX);
  colony.y = rand(canvasY);
  colony.id = getId();
  colony.keyBinds = colonyKeybinds
  colony.render = (e) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(139,69,19)";
    ctx.fillRect(e.x - 12, e.y - 12, 25, 25);
  }

  game.entities.push(colony)

  return colony
}
