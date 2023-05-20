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
        row.remove()
        await axios.delete(`http://localhost:3000/${sectionName}/${rowID}`)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export { getAndShowInfo, deleteRow }