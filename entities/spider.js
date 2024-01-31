function spiderAct(e) {
  if (handleDeath(e)) { return }

  if (handleNearbyEnemy(e)) { return }

  if (e.mode === 'seeking') {
    if (!e.searchTarget) {
      e.searchTarget = { x: rand(canvasX), y: rand(canvasY) }
    }

    moveTo(e, e.searchTarget)
  }
}

function makeSpider() {
  const spider = {}
  spider.mode = 'seeking'
  spider.type = 'spider'
  spider.alliance = 'spider'
  spider.amountName = 'Ants Killed'
  spider.hp = 20
  spider.amount = 0
  spider.attackPower = 5
  spider.title = soldierNames[rand(soldierNames.length)]
  spider.x = rand(canvasX)
  spider.y = rand(canvasY)
  spider.id = getId();
  spider.speed = 2
  spider.act = spiderAct
  spider.render = (e) => {
    const ctx = canvas.getContext("2d");
    const squareWidth = 7 + e.amount
    const offSet = squareWidth / 2
    const baseX = e.x - offSet
    const baseY = e.y - offSet
    ctx.fillStyle = "rgb(120 40 120)";

    ctx.fillRect(baseX, baseY, squareWidth, squareWidth);
    ctx.fillRect(baseX - squareWidth, baseY - squareWidth, squareWidth, squareWidth);
    ctx.fillRect(baseX + squareWidth, baseY - squareWidth, squareWidth, squareWidth);
    ctx.fillRect(baseX - squareWidth, baseY + squareWidth, squareWidth, squareWidth);
    ctx.fillRect(baseX + squareWidth, baseY + squareWidth, squareWidth, squareWidth);
  }
  game.entities.push(spider)
}