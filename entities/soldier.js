function soldierAct(e) {
  if (handleDeath(e)) { return }
  
  if (handleNearbyEnemy(e)) { return }

  if (e.mode === 'seeking') {
    if (controlledEntity?.id === e.id) { return }

    if (!e.searchTarget) {
      e.searchTarget = { x: rand(canvasX), y: rand(canvasY) }
    }

    moveTo(e, e.searchTarget)
  }
}

function makeSoldier(colony) {
  const soldier = {}
  soldier.mode = 'seeking'
  soldier.type = 'soldier'
  soldier.alliance = 'ant'
  soldier.amountName = 'Enemies Killed'
  soldier.amount = 0
  soldier.hp = 10
  soldier.speed = 2
  soldier.attackPower = 5
  soldier.title = soldierNames[rand(soldierNames.length)]
  soldier.x = colony.x + rand(200) - 25;
  soldier.y = colony.y + rand(200) - 25;
  soldier.colony = colony
  soldier.id = getId();
  soldier.keyBinds = {
    ...movementKeyBinds
  }
  soldier.act = soldierAct
  soldier.render = (e) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(220 80 20)";
    const width = 10 + e.amount
    const offset = width / 2
    ctx.fillRect(e.x - offset, e.y - offset, width, width);
  }
  game.entities.push(soldier)
}