'use strict'

import { removeEditEmployeeEventListener } from "./services/employeeServices.js"
import { removeEditJobTitleEventListener } from "./services/jobTitleServiсes.js"
import { removeEditClientEventListener } from "./services/clientServices.js"
import { removeEditCarEventListener } from "./services/carServices.js"
import { removeEditContractEventListener } from "./services/contractServices.js"

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

  if (tableID === '#contract') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-square-plus')) {
        const tableRowsEmployee = document.querySelectorAll('#employee tbody tr')
        tableRowsEmployee.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.newFioEmployeeNames.innerHTML += `
          <option value="newFioEmployeeName">${cellValue}</option>
          `
        })

        const tableRowsClient = document.querySelectorAll('#client tbody tr')
        tableRowsClient.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.newFioClientNames.innerHTML += `
          <option value="newFioClientName">${cellValue}</option>
          `
        })

        const tableRowsCar = document.querySelectorAll('#car tbody tr')
        tableRowsCar.forEach(row => {
          const cell = row.querySelector('td:nth-child(3)')
          const cellValue = cell.textContent
          form.newCarNumberNames.innerHTML += `
          <option value="newCarNumberName">${cellValue}</option>
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

  if (tableID === '#job' || tableID === '#car' || tableID === '#client') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-pen-to-square')) {
        const row = event.target.closest('tr')
        const contractTable = document.querySelector('#contract')
        const contractRows = contractTable.querySelectorAll('tbody tr')

        if (tableID === '#client') {
          const fioClient = row.querySelector('td:nth-child(2)').textContent

          let isFioClineFound = false

          for (const contractRow of contractRows) {
            const contractClientFio = contractRow.querySelector('td:nth-child(6)').textContent

            if (contractClientFio === fioClient) {
              isFioClineFound = true
              break
            }
          }

          if (isFioClineFound) {
            console.log(`Cannot edit the row in the 'client' table. Matching FIO found in 'contract' table: ${fioClient}`)
            return
          }
        }

        if (tableID === '#car') {
          const carNumber = row.querySelector('td:nth-child(3)').textContent

          let isNumberFound = false

          for (const contractRow of contractRows) {
            const contractCarNumber = contractRow.querySelector('td:nth-child(8)').textContent

            if (contractCarNumber === carNumber) {
              isNumberFound = true
              break
            }
          }

          if (isNumberFound) {
            console.log(`Cannot edit the row in the 'car' table. Matching car number found in 'contract' table: ${carNumber}`)
            return
          }
        }

        if (tableID === '#job') {
          const employeeTable = document.querySelector('#employee')
          const employeeRows = employeeTable.querySelectorAll('tbody tr')
          const jobTitle = row.querySelector('td:nth-child(2)').textContent

          let isJobTitleFound = false

          for (const employeeRow of employeeRows) {
            const employeeJobTitle = employeeRow.querySelector('td:nth-child(3)').textContent

            if (employeeJobTitle === jobTitle) {
              isJobTitleFound = true
              break
            }
          }

          if (isJobTitleFound) {
            console.log(`Cannot edit the row in the 'job' table. Matching job found in 'employee' table: ${jobTitle}`)
            return
          }
        }

        const dataEditValue = event.target.getAttribute('data-edit')

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
        const row = event.target.closest('tr')
        const contractTable = document.querySelector('#contract')
        const contractRows = contractTable.querySelectorAll('tbody tr')

        const fioEmployee = row.querySelector('td:nth-child(2)').textContent

        let isFioEmployeeFound = false

        for (const contractRow of contractRows) {
          const contractEmployeeFio = contractRow.querySelector('td:nth-child(5)').textContent

          if (contractEmployeeFio === fioEmployee) {
            isFioEmployeeFound = true
            break
          }
        }

        if (isFioEmployeeFound) {
          console.log(`Cannot edit the row in the 'employee' table. Matching employee found in 'contract' table: ${fioEmployee}`)
          return
        }

        const dataEditValue = event.target.getAttribute('data-edit')

        const tableRows = document.querySelectorAll('#job tbody tr')
        tableRows.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.updatedJobTitleNames.innerHTML += `
          <option value="updatedJobTitleName">${cellValue}</option>
          `
        })

        table.classList.remove('active-table')
        form.classList.add('active-form')
        sidebar.style.display = 'none'

        if (typeof callback === 'function') {
          callback(dataEditValue)
        }
      }
    })
  }

  if (tableID === '#contract') {
    table.addEventListener('click', event => {
      if (event.target && event.target.classList.contains('fa-pen-to-square')) {
        const dataEditValue = event.target.getAttribute('data-edit')

        const tableRowsEmployee = document.querySelectorAll('#employee tbody tr')
        tableRowsEmployee.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.updatedFioEmployeeNames.innerHTML += `
          <option value="updatedFioEmployeeName">${cellValue}</option>
          `
        })

        const tableRowsClient = document.querySelectorAll('#client tbody tr')
        tableRowsClient.forEach(row => {
          const cell = row.querySelector('td:nth-child(2)')
          const cellValue = cell.textContent
          form.updatedFioClientNames.innerHTML += `
          <option value="updatedFioClientName">${cellValue}</option>
          `
        })

        const tableRowsCar = document.querySelectorAll('#car tbody tr')
        tableRowsCar.forEach(row => {
          const cell = row.querySelector('td:nth-child(3)')
          const cellValue = cell.textContent
          form.updatedCarNumberNames.innerHTML += `
          <option value="updatedCarNumberName">${cellValue}</option>
          `
        })

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

    if (form.newFioEmployeeNames) {
      form.newFioEmployeeNames.innerHTML = ''
    }

    if (form.newFioClientNames) {
      form.newFioClientNames.innerHTML = ''
    }

    if (form.newCarNumberNames) {
      form.newCarNumberNames.innerHTML = ''
    }

    if (form.updatedFioEmployeeNames) {
      form.updatedFioEmployeeNames.innerHTML = ''
    }

    if (form.updatedFioClientNames) {
      form.updatedFioClientNames.innerHTML = ''
    }

    if (form.updatedCarNumberNames) {
      form.updatedCarNumberNames.innerHTML = ''
    }

    form.reset()
    removeEditEmployeeEventListener(form)
    removeEditJobTitleEventListener(form)
    removeEditClientEventListener(form)
    removeEditCarEventListener(form)
    removeEditContractEventListener(form)
  })
}

export { openCreateForm, openEditForm }
