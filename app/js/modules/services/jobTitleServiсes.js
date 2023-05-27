'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewJobTitle(formID, sectionName) {
  openCreateForm('#job', '#create-job', '#btn-back-create-job')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const newJobTitleName = form.newJobTitleName.value.trim()

    let maxId
    let previousJobTitles
    try {
      const response = await axios.get(`http://localhost:3000/${sectionName}`)
      const data = response.data
      maxId = data[data.length - 1].id
      previousJobTitles = data.map(item => item.jobTitle)
    } catch (error) {
      console.error(error)
    }

    if (previousJobTitles.includes(newJobTitleName)) {
      console.log('Info already exists. Please enter a different info.')
      return
    }

    const newInfo = {
      id: maxId + 1,
      jobTitle: newJobTitleName,
    }

    try {
      await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
      console.log('Info added successfully!')
    } catch (error) {
      console.error(error)
    }
  })
}

let editJobTitleEventListener = null

async function editJobTitle(formID, sectionName) {
  openEditForm(
    '#job',
    '#edit-job',
    '#btn-back-edit-job',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInput = form.updatedJobTitleName
      let previousJobTitles

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data
        previousJobTitles = data.map(item => item.jobTitle)

        formInput.value = data[parseInt(dataEditValue) - 1].jobTitle

        editJobTitleEventListener = async event => {
          event.preventDefault()

          const newJobTitle = formInput.value.trim()

          if (newJobTitle === data[parseInt(dataEditValue) - 1].jobTitle) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          if (previousJobTitles.includes(newJobTitle)) {
            console.log('Info already exists. Please enter a different info.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            jobTitle: newJobTitle,
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

        form.addEventListener('submit', editJobTitleEventListener)
      } catch (error) {
        console.error(error)
      }
    }
  )
}

function removeEditJobTitleEventListener(form) {
  if (editJobTitleEventListener) {
    form.removeEventListener('submit', editJobTitleEventListener)
    editJobTitleEventListener = null
  }
}

export { createNewJobTitle, editJobTitle, removeEditJobTitleEventListener }
