'use strict'

function changeToDarkMode(
  bodySelector,
  modeTextSelector,
  tableRowsSelector,
  tableHeadsSelector,
  titleSelector
) {
  const body = document.querySelector(bodySelector)
  const modeText = body.querySelector(modeTextSelector)
  const tableRows = body.querySelectorAll(tableRowsSelector)
  const tableHeads = body.querySelectorAll(tableHeadsSelector)
  const title = body.querySelector(titleSelector)

  body.classList.add('dark')

  modeText.innerText = 'Light mode'
  tableRows.forEach(row => {
    row.classList.remove('tr--light')
    row.classList.add('tr--dark')
  })

  tableHeads.forEach(head => {
    head.classList.remove('th--light')
    head.classList.add('th--dark')
  })

  title.style.color = '#fff'
}

function changeToLightMode(
  bodySelector,
  modeTextSelector,
  tableRowsSelector,
  tableHeadsSelector,
  titleSelector
) {
  const body = document.querySelector(bodySelector)
  const modeText = body.querySelector(modeTextSelector)
  const tableRows = body.querySelectorAll(tableRowsSelector)
  const tableHeads = body.querySelectorAll(tableHeadsSelector)
  const title = body.querySelector(titleSelector)

  body.classList.remove('dark')

  modeText.innerText = 'Dark mode'

  tableRows.forEach(row => {
    row.classList.remove('tr--dark')
    row.classList.add('tr--light')
  })

  tableHeads.forEach(head => {
    head.classList.remove('th--dark')
    head.classList.add('th--light')
  })

  title.style.color = '#000'
}

function switchMode(
  modeSwitchSelector,
  bodySelector,
  modeTextSelector,
  tableRowsSelector,
  tableHeadsSelector,
  titleSelector
) {
  const body = document.querySelector(bodySelector)
  const modeSwitch = body.querySelector(modeSwitchSelector)

  modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark')
    const isDarkMode = body.classList.contains('dark')
    localStorage.setItem('isModeDark', isDarkMode)

    if (isDarkMode) {
      changeToDarkMode(
        bodySelector,
        modeTextSelector,
        tableRowsSelector,
        tableHeadsSelector,
        titleSelector
      )
    } else {
      changeToLightMode(
        bodySelector,
        modeTextSelector,
        tableRowsSelector,
        tableHeadsSelector,
        titleSelector
      )
    }
  })
}

export { changeToDarkMode, changeToLightMode, switchMode }
