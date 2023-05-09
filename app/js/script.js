// import showElements form 'services.js'

const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const iconBtns = body.querySelectorAll('.nav-link')
const title = body.querySelector('.title')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const tableRows = body.querySelectorAll('tr')
const tableHead = body.querySelectorAll('th')

const isSidebarClosed = localStorage.getItem('isSidebarClosed') === 'true'
const isModeDark = localStorage.getItem('isModeDark') === 'true'

function changeToDarkMode() {
  body.classList.add('dark')

  modeText.innerText = 'Light mode'
  tableRows.forEach(row => {
    row.classList.remove('tr--light')
    row.classList.add('tr--dark')
    row.classList.remove('tr--light:nth-child(even)')
    row.classList.add('tr--dark:nth-child(even)')
  })

  tableHead.forEach(head => {
    head.classList.remove('th--light')
    head.classList.add('th--dark')
  }) 

  title.style.color = '#fff'
}

function changeToLightMode() {
  body.classList.remove('dark')

  modeText.innerText = 'Dark mode'

  tableRows.forEach(row => {
    row.classList.remove('tr--dark')
    row.classList.add('tr--light')
    row.classList.remove('tr--dark:nth-child(even)')
    row.classList.add('tr--light:nth-child(even)')
  })

  tableHead.forEach(head => {
    head.classList.remove('th--dark')
    head.classList.add('th--light')
  })

  title.style.color = '#000'
}

function openSidebarAndHiddenTitle() {
  sidebar.classList.remove('close')
  title.style.display = 'none'
  localStorage.setItem('isSidebarClosed', false)
}

if (isSidebarClosed) {
  sidebar.classList.add('close')
} else {
  sidebar.classList.remove('close')
}

if (isModeDark) {
  changeToDarkMode()
} else {
  changeToLightMode()
}

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')

  localStorage.setItem('isSidebarClosed', sidebar.classList.contains('close'))
})

iconBtns.forEach(btn => {
  if (btn.getAttribute('data-link') === 'job') {
    btn.addEventListener('click', () => {
    openSidebarAndHiddenTitle()
    
    body.querySelector('#job').classList.add('active-table')
    body.querySelector('#employee').classList.remove('active-table')
    body.querySelector('#car').classList.remove('active-table')
    body.querySelector('#client').classList.remove('active-table')
    body.querySelector('#contract').classList.remove('active-table')
  })
  }

  if (btn.getAttribute('data-link') === 'employee') {
    btn.addEventListener('click', () => {
    openSidebarAndHiddenTitle()

    body.querySelector('#employee').classList.add('active-table')
    body.querySelector('#job').classList.remove('active-table')
    body.querySelector('#car').classList.remove('active-table')
    body.querySelector('#client').classList.remove('active-table')
    body.querySelector('#contract').classList.remove('active-table')
  })
  }

  if (btn.getAttribute('data-link') === 'car') {
    btn.addEventListener('click', () => {
    openSidebarAndHiddenTitle()

    body.querySelector('#car').classList.add('active-table')
    body.querySelector('#employee').classList.remove('active-table')
    body.querySelector('#job').classList.remove('active-table')
    body.querySelector('#client').classList.remove('active-table')
    body.querySelector('#contract').classList.remove('active-table')
  })
  }

  if (btn.getAttribute('data-link') === 'client') {
    btn.addEventListener('click', () => {
    openSidebarAndHiddenTitle()

    body.querySelector('#client').classList.add('active-table')
    body.querySelector('#employee').classList.remove('active-table')
    body.querySelector('#job').classList.remove('active-table')
    body.querySelector('#car').classList.remove('active-table')
    body.querySelector('#contract').classList.remove('active-table')
  })
  }

  if (btn.getAttribute('data-link') === 'contract') {
    btn.addEventListener('click', () => {
    openSidebarAndHiddenTitle()

    body.querySelector('#contract').classList.add('active-table')
    body.querySelector('#employee').classList.remove('active-table')
    body.querySelector('#job').classList.remove('active-table')
    body.querySelector('#car').classList.remove('active-table')
    body.querySelector('#client').classList.remove('active-table')
  })
  }
})

modeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark')

  localStorage.setItem('isModeDark', body.classList.contains('dark'))

  if (body.classList.contains('dark')) {
    changeToDarkMode()
  } else {
    changeToLightMode()
  }
})