'use strict'

const render = (tableId, info) => {
  const tableBody = document.querySelector(tableId + ' tbody')
  info.forEach((obj, index) => {
    const row = document.createElement('tr')
    row.setAttribute('data-row', index + 1)
    row.setAttribute('id', obj.id)

    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'id') {
        const td = document.createElement('td')
        td.textContent = row.getAttribute('data-row')
        row.appendChild(td)
      } else {
        const td = document.createElement('td')
        td.textContent = value
        row.appendChild(td)
      }
    })

    if (Object.values(obj).length === 9) {
      row.innerHTML += `
        <td><i class="fa-solid fa-eye options-icon" data-show="${
          index + 1
        }"></i></td>
        <td><i class="fa-regular fa-square-plus options-icon"></i></td>
        <td><i class="fa-solid fa-pen-to-square options-icon" data-edit="${
          index + 1
        }"></i></td>
        <td><i class="fa-solid fa-xmark options-icon" data-delete="${
          index + 1
        }"></i></td>
      `
    } else {
      row.innerHTML += `
        <td><i class="fa-regular fa-square-plus options-icon"></i></td>
        <td><i class="fa-solid fa-pen-to-square options-icon" data-edit="${
          index + 1
        }"></i></td>
        <td><i class="fa-solid fa-xmark options-icon" data-delete="${
          index + 1
        }"></i></td>
      `
    }

    tableBody.appendChild(row)
  })
}

async function getAndShowInfo(sectionName) {
  await axios
    .get(`http://localhost:3000/${sectionName}`)
    .then(response => {
      const data = response.data
      render(`#${sectionName}`, data)
    })
    .catch(error => console.error(error))
}

async function deleteRow(tableID, sectionName) {
  try {
    const table = document.querySelector(`#${tableID}`)

    table.addEventListener('click', async event => {
      if (event.target.getAttribute('data-delete')) {
        const row = event.target.closest('tr')
        const rowID = row.getAttribute('id')
        const contractTable = document.querySelector('#contract')
        const contractRows = contractTable.querySelectorAll('tbody tr')

        if (tableID === 'client') {
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
            console.log(`Cannot delete the row in the 'client' table. Matching FIO found in 'contract' table: ${fioClient}`)
            return
          }
        }

        if (tableID === 'car') {
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
            console.log(`Cannot delete the row in the 'car' table. Matching car number found in 'contract' table: ${carNumber}`)
            return
          }
        }

        if (tableID === 'employee') {
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
            console.log(`Cannot delete the row in the 'employee' table. Matching employee found in 'contract' table: ${fioEmployee}`)
            return
          }
        }

        if (tableID === 'job') {
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
            console.log(`Cannot delete the row in the 'job' table. Matching job found in 'employee' table: ${jobTitle}`)
            return
          }
        }

        row.remove()
        await axios.delete(`http://localhost:3000/${sectionName}/${rowID}`)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export { getAndShowInfo, deleteRow }