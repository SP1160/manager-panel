'use strict'

function openCreateForm(tableID, formID, btnBackID) {
  const table = document.querySelector(tableID)
  const form = document.querySelector(formID)
  const btnBack = document.querySelector(btnBackID)
  const sidebar = document.querySelector('nav')

  if (tableID === '#job' || tableID === '#car' || tableID === '#client')
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-square-plus')) {
        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'
      }
    })

  if (tableID === '#employee') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-square-plus')) {
        const tableRows = document.querySelectorAll('#job tbody tr')
        tableRows.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.newJobTitleNames.innerHTML += `
          <option value="newJobTitleName">${cellValue}</option>
          `
        })

        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'
      }
    })
  }

  comebackToMainPage(table, form, btnBack, sidebar)
}

function openEditForm(tableID, formID, btnBackID, callback) {
  const table = document.querySelector(tableID)
  const form = document.querySelector(formID)
  const btnBack = document.querySelector(btnBackID)
  const sidebar = document.querySelector('nav')

  if (tableID === '#job') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-pen-to-square')) {
        const dataEditValue = event.target.getAttribute('data-edit')
        const row = table.querySelector(`tr[data-row="${dataEditValue}"]`)
        const jobTitle = row.querySelector('td:nth-child(2)').innerText

        form.querySelector('input[name="updatedJobTitleName"]').value = jobTitle

        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'

        if (typeof callback === 'function') {
          callback(dataEditValue)
        }
      }
    })
  }

  if (tableID === '#employee') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-pen-to-square')) {
        const dataEditValue = event.target.getAttribute('data-edit')
        const row = table.querySelector(`tr[data-row="${dataEditValue}"]`)
        const fio = row.querySelector('td:nth-child(2)').innerText

        const tableRows = document.querySelectorAll('#job tbody tr')
        tableRows.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.updatedJobTitleNames.innerHTML += `
          <option value="updatedJobTitleName">${cellValue}</option>
          `
        })

        form.querySelector('input[name="updatedFioName"]').value = fio

        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'

        if (typeof callback === 'function') {
          callback(dataEditValue)
        }
      }
    })
  }

  if (tableID === '#car') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-pen-to-square')) {
        const dataEditValue = event.target.getAttribute('data-edit')
        const row = table.querySelector(`tr[data-row="${dataEditValue}"]`)
        const carBrand = row.querySelector('td:nth-child(1)').innerText
        const carNumber = row.querySelector('td:nth-child(2)').innerText
        const carPricePerDay = row.querySelector('td:nth-child(3)').innerText

        form.querySelector('input[name="updatedCarBrand"]').value = carBrand
        form.querySelector('input[name="updatedCarNumber"]').value = carNumber
        form.querySelector('input[name="updatedPricePerDay"]').value = carPricePerDay

        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'

        if (typeof callback === 'function') {
          callback(dataEditValue)
        }
      }
    })
  }

  comebackToMainPage(table, form, btnBack, sidebar)
}

function comebackToMainPage(table, form, btnBack, sidebar) {
  btnBack.addEventListener('click', event => {
    event.preventDefault()

    table.classList.add('active-table')
    form.classList.remove('active-form')
    sidebar.style.display = ''

    if (form.newJobTitleNames) {
      form.newJobTitleNames.innerHTML = ''
    }

    if (form.updatedJobTitleNames) {
      form.updatedJobTitleNames.innerHTML = ''
    }
  })
}

export { openCreateForm, openEditForm }
