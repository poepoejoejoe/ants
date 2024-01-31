function renderControlPanel() {
  const controlPanel = document.getElementById('control-panel-container')
  
  if(controlledEntity) {
    if (controlledEntity.keyBinds && keyBindType !== controlledEntity.type) {
      controlPanel.innerHTML = ''
      Object.keys(controlledEntity.keyBinds).forEach((key) => {
        controlPanel.insertAdjacentHTML('beforeend',
          `
          <div class="keybind-container" id="key-${key}">
            <div>${key}</div>
            <div>${keyBindInfo[controlledEntity.keyBinds[key].name].title}</div>
            <div>${keyBindInfo[controlledEntity.keyBinds[key].name].info || ''}</div>
          </div>
          `
        )
      });
      keyBindType = controlledEntity.type
    }

    if (!controlledEntity.keyBinds) {
      controlPanel.innerHTML = ''
      keyBindType = undefined
    }
  } else {
    controlPanel.innerHTML = ''
  }
}

function renderSidePanel() {
  const selectedTitle = document.getElementById('selected-entity-title')
  const selectedAmount = document.getElementById('selected-entity-amount')
  const selectedHp = document.getElementById('selected-entity-hp')
  const thumbnailImg = document.getElementById('thumbnail-image')
  const clickText = document.getElementById('click-text')
  const antCountEl = document.getElementById('ant-count')
  const antCount = game.entities.filter((e) => e.alliance === 'ant').length;
  antCountEl.innerHTML = `${antCount} Ants Alive`;

  if (controlledEntity) {
    if (controlledEntity.title) {
      selectedTitle.innerHTML = controlledEntity.title;
    }
    if (controlledEntity.amount !== undefined) {
      selectedAmount.innerHTML = `${controlledEntity.amount} ${controlledEntity.amountName}`
    }

    // should all be like this?
    if (controlledEntity.hp !== undefined) {
      selectedHp.innerHTML = `${controlledEntity.hp} Hit Points`
    } else {
      selectedHp.innerHTML = ''
    }

    thumbnailImg.style.display = 'block'
    clickText.style.display = 'none'
    thumbnailImg.src = `images/${controlledEntity.type}.png`
  } else {
    thumbnailImg.style.display = 'none'
    clickText.style.display = 'block'
    selectedTitle.innerHTML = ''
    selectedAmount.innerHTML = ''
  }
}
