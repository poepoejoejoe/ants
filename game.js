let canvas;
const canvasX = 1024;
const canvasY = 1024;
const antCost = 5;
const soldierCost = 10;
let keyBindType;

const movementKeyBinds = {
  w: moveUp,
  a: moveLeft,
  s: moveDown,
  d: moveRight,
  "ArrowUp": moveUp,
  "ArrowRight": moveRight,
  "ArrowDown": moveDown,
  "ArrowLeft": moveLeft,
}

const keyBindInfo = {
  buyAnt: { 
    title: 'Spawn Worker Ant',
    info: `Costs ${antCost} Food`
  },
  buySoldier: {
    title: 'Spawn Soldier',
    info: `Costs ${soldierCost} Food`
  },
  moveUp: {
    title: 'Up',
  },
  moveRight: {
    title: 'Right',
  },
  moveDown: {
    title: 'Down',
  },
  moveLeft: {
    title: 'Left',
  },
}

function initializeGameSate(colony) {
  for (let i = 0; i < 1; i++) {
    makeAnt(colony)
  }

  for (let i = 0; i < 5; i++) {
    makeFood()
  }

  for (let i = 0; i < 1; i++) {
    makeSpider()
  }
}

const colony = makeColony()
initializeGameSate(colony)

function runRandomChanceEvents() {
  if(rand(50 * 1000) == 0) { makeFood() }
  if(rand(100 * 1000) == 0) { makeSpider() }
}

function runGameLoop() {
  game.entities.forEach((entity) => {
    if (entity.act) { entity.act(entity) }
    runRandomChanceEvents()
  })
}

function renderGame() {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  game.entities.forEach((entity) => {
    if(entity.render) { entity.render(entity) }
  })

  renderControlPanel()
  renderSidePanel()
}

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById('game')
  canvas.addEventListener("click", (event) => {
    const relativeTarget = { x: event.offsetX, y: event.offsetY }
    clickedEntity = game.entities.find((entity) => {
      return collides(relativeTarget, entity, 20);
    });
    if (clickedEntity) {
      console.log(clickedEntity)
      controlledEntity = clickedEntity
    } else {
      controlledEntity = colony
    }
  })

  setInterval(() => {
    runGameLoop()
    renderGame()
  }, 100)
});

document.addEventListener("keydown", (event) => {
  if (controlledEntity) {
    if (event.key === 'Escape') {
      controlledEntity = colony
    }

    const keyBinds = controlledEntity.keyBinds
    if (keyBinds) {
      const keyBoundFunction = keyBinds[event.key]
      if (keyBoundFunction) {
        keyBoundFunction(controlledEntity)
      }
    }
  }

  const keyEl = document.getElementById(`key-${event.key}`)
  if (keyEl) {
    keyEl.classList.add('fade');
  }
});

document.addEventListener("keyup", (event) => {
  const keyEl = document.getElementById(`key-${event.key}`)
  if (keyEl) {
    keyEl.classList.remove('fade');
  }
});

