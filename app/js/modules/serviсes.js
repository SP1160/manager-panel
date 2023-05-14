'use strict'

const render = (tableId, info) => {
  const tableBody = document.querySelector(tableId + ' tbody')
  info.forEach(obj => {
    const row = document.createElement('tr')

    Object.values(obj).forEach(value => {
      const td = document.createElement('td')
      td.textContent = value
      row.appendChild(td)
    })

    if (Object.values(obj).length === 9) {
      row.innerHTML += `
      <td><i class="fa-solid fa-eye options-icon"></i></td>
      <td><i class="fa-regular fa-square-plus options-icon"></i></td>
      <td><i class="fa-solid fa-pen-to-square options-icon"></i></td>
      <td><i class="fa-solid fa-xmark options-icon"></i></td>
    `
    } else {
      row.innerHTML += `
      <td><i class="fa-regular fa-square-plus options-icon"></i></td>
      <td><i class="fa-solid fa-pen-to-square options-icon"></i></td>
      <td><i class="fa-solid fa-xmark options-icon"></i></td>
    `
    }

    tableBody.appendChild(row)
  })
}

async function getAndShowInfo(sectionName) {
  const request = await axios
    .get(`http://localhost:3000/${sectionName}`)
    .then(response => {
      const data = response.data
      render(`#${sectionName}`, data)
    })
    .catch(error => console.error(error))

  return request
}

function createNewJobTitle(formID, sectionName) {
  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const newJobTitleName = form.newJobTitleName.value.trim()

    const maxId = await axios
      .get(`http://localhost:3000/${sectionName}`)
      .then(response => {
        const data = response.data
        return data.length
      })
      .catch(error => console.error(error))

    const newInfo = {
      id: maxId + 1,
      jobTitle: newJobTitleName,
    }

    await axios
      .post(`http://localhost:3000/${sectionName}`, newInfo)
      .then(() => {
        alert('Info added successfully!')
        form.reset()
      })
      .catch(error => console.error(error))
  })
}

export { getAndShowInfo, createNewJobTitle }
