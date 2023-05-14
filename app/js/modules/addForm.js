'use strict'

function openForm(tableID, formID, btnBackID, iconSelector) {
  const table = document.querySelector(tableID)
  const form = document.querySelector(formID)
  const btnBack = document.querySelector(btnBackID)
  const sidebar = document.querySelector('nav')

  table.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains(iconSelector)) {
      table.classList.remove('active-table')
      form.classList.add('active-form')
      sidebar.style.display = 'none'
    }
  })

  comebackToMainPage(table, form, btnBack, sidebar)
}

function comebackToMainPage(table, form, btnBack, sidebar) {
  btnBack.addEventListener('click', (event) => {
    event.preventDefault()
    
    table.classList.add('active-table')
    form.classList.remove('active-form')
    sidebar.style.display = ''
  })
}

export { openForm }