'use strict'

import { openForm } from './addForm.js'

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
  openForm('#job', '#create-job', '#btn-back-create-job', 'fa-square-plus')

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

async function editJobTitle(formID, sectionName) {
  openForm('#job', '#edit-job', '#btn-back-edit-job', 'fa-pen-to-square')

  const form = document.querySelector(formID)
  const formInput = form.updatedJobTitleName

  try {
    const response = await axios.get(`http://localhost:3000/${sectionName}`)
    const data = response.data
    formInput.value = data[0].jobTitle

    form.addEventListener('submit', async event => {
      event.preventDefault() // Prevent the default form submission

      const newJobTitle = formInput.value.trim()

      if (newJobTitle === data[0].jobTitle) {
        alert('Job title not changed. Form not submitted.')
        return
      }

      const updatedData = {
        id: data[0].id,
        jobTitle: newJobTitle,
      }

      try {
        const updateResponse = await axios.put(
          `http://localhost:3000/${sectionName}/${data[0].id}`,
          updatedData
        )

        alert('Job title updated successfully:', updateResponse.data)
      } catch (error) {
        console.error('Error updating job title:', error)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export { getAndShowInfo, createNewJobTitle, editJobTitle }
