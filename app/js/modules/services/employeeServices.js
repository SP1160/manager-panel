'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewEmployee(formID, sectionName) {
  openCreateForm('#employee', '#create-employee', '#btn-back-create-employee')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    try {
      const newJobTitleName =
        form.newJobTitleNames.options[form.newJobTitleNames.selectedIndex]
          .textContent
      const newFioName = form.newFioName.value.trim()

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
        fioEmployee: newFioName,
        jobTitle: newJobTitleName,
      }

      try {
        await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
        console.log('Info added successfully!')
      } catch (error) {
        console.error(error)
      }
    } catch {
      console.log('Dont have any job titles')
    }
  })
}

let editEmployeeEventListener = null

async function editEmployee(formID, sectionName) {
  openEditForm(
    '#employee',
    '#edit-employee',
    '#btn-back-edit-employee',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInputFio = form.updatedFioName
      const selectElement = form.updatedJobTitleNames

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInputFio.value = data[parseInt(dataEditValue) - 1].fioEmployee

        const jobTitle = data[parseInt(dataEditValue) - 1].jobTitle
        for (let i = 0; i < selectElement.options.length; i++) {
          const option = selectElement.options[i]
          if (option.textContent === jobTitle) {
            option.selected = true
            break
          }
        }

        editEmployeeEventListener = async event => {
          event.preventDefault()

          const newFio = formInputFio.value.trim()
          const newJobTitleName =
            selectElement.options[selectElement.selectedIndex].textContent

          if (
            newFio === data[parseInt(dataEditValue) - 1].fioEmployee &&
            newJobTitleName === data[parseInt(dataEditValue) - 1].jobTitle
          ) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            fioEmployee: newFio,
            jobTitle: newJobTitleName,
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

        form.addEventListener('submit', editEmployeeEventListener)
      } catch (error) {
        console.error(error)
      }
    }
  )
}

function removeEditEmployeeEventListener(form) {
  if (editEmployeeEventListener) {
    form.removeEventListener('submit', editEmployeeEventListener)
    editEmployeeEventListener = null
  }
}

export { createNewEmployee, editEmployee, removeEditEmployeeEventListener }
