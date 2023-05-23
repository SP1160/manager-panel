'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewClient(formID, sectionName) {
  openCreateForm('#client', '#create-client', '#btn-back-create-client')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const newFioClientName = form.newFioClientName.value.trim()
    const newTelephoneClientName = form.newTelephoneClientName.value.trim()

    let maxId
    try {
      const response = await axios.get(`http://localhost:3000/${sectionName}`)
      const data = response.data
      maxId = data[data.length - 1].id
    } catch (error) {
      console.error(error)
    }

    const newInfo = {
      id: maxId + 1,
      fioClient: newFioClientName,
      telephone: newTelephoneClientName
    }

    try {
      await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
      console.log('Info added successfully!')
    } catch (error) {
      console.error(error)
    }
  })
}

let editClientEventListener = null;

async function editClient(formID, sectionName) {
  openEditForm(
    '#client',
    '#edit-client',
    '#btn-back-edit-client',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInputClientFio = form.updatedFioClientName
      const formInputTelephoneClient = form.updatedTelephoneClientName

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInputClientFio.value = data[parseInt(dataEditValue) - 1].fioClient
        formInputTelephoneClient.value = data[parseInt(dataEditValue) - 1].telephone

        editClientEventListener = async event => {
          event.preventDefault()

          const newFioClientName = formInputClientFio.value.trim()
          const newTelephoneClientName = formInputTelephoneClient.value.trim()

          if (newFioClientName === data[parseInt(dataEditValue) - 1].fioClient && newTelephoneClientName === data[parseInt(dataEditValue) - 1].telephone) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            fioClient: newFioClientName,
            telephone: newTelephoneClientName
          }

          try {
            await axios.put(
              `http://localhost:3000/${sectionName}/${
                data[parseInt(dataEditValue) - 1].id
              }`,
              updatedData
            )

            console.log('Info updated successfully')
          } catch (error) {
            console.error(error)
          }
        }

      form.addEventListener('submit', editClientEventListener)
      } catch (error) {
        console.error(error)
      }
    }
  )
}

function removeEditClientEventListener(form) {
  if (editClientEventListener) {
    form.removeEventListener('submit', editClientEventListener)
    editClientEventListener = null
  }
}

export { createNewClient, editClient, removeEditClientEventListener }
