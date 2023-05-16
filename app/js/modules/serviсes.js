'use strict'

import { openCreateForm, openEditForm } from './addForm.js'

const render = (tableId, info) => {
  const tableBody = document.querySelector(tableId + ' tbody')
  info.forEach((obj, index) => {
    const row = document.createElement('tr')
    row.setAttribute('data-row', index + 1)

    Object.values(obj).forEach(value => {
      const td = document.createElement('td')
      td.textContent = value
      row.appendChild(td)
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
  openCreateForm('#job', '#create-job', '#btn-back-create-job')

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
  openEditForm(
    '#job',
    '#edit-job',
    '#btn-back-edit-job',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInput = form.updatedJobTitleName

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInput.value = data[parseInt(dataEditValue) - 1].jobTitle

        form.addEventListener('submit', async event => {
          event.preventDefault()

          const newJobTitle = formInput.value.trim()

          if (newJobTitle === data[parseInt(dataEditValue) - 1].jobTitle) {
            alert('Job title not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            jobTitle: newJobTitle,
          }

          try {
            const updateResponse = await axios.put(
              `http://localhost:3000/${sectionName}/${data[parseInt(dataEditValue) - 1].id}`,
              updatedData
            )

            alert('Job title updated successfully:', updateResponse.data)
          } catch (error) {
            console.error('Error updating job title:', error)
          }
        })
      } catch (error) {
        console.error('Error retrieving data:', error)
      }
    }
  )
}

export { getAndShowInfo, createNewJobTitle, editJobTitle }
