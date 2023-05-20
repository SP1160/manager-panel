'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewEmployee(formID, sectionName) {
  openCreateForm('#employee', '#create-employee', '#btn-back-create-employee')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    try {
      const selectElement = form.newJobTitleNames
      const selectOption = selectElement.options[selectElement.selectedIndex]
      const newJobTitleName = selectOption.textContent
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
        jobTitle: newJobTitleName
      }
  
      try {
        await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
        console.log('Info added successfully!')
        form.reset()
      } catch (error) {
        console.error(error)
      }
    } catch {
      console.log('Dont have any job titles')
    }
  })
}

async function editEmployee(formID, sectionName) {
  openEditForm(
    '#employee',
    '#edit-employee',
    '#btn-back-edit-employee',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInputFio = form.updatedFioName

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInputFio.value = data[parseInt(dataEditValue) - 1].fioEmployee

        form.addEventListener('submit', async event => {
          event.preventDefault()

          const newFio = formInputFio.value.trim()
          const selectElement = form.updatedJobTitleNames
          const selectOption = selectElement.options[selectElement.selectedIndex]
          const newJobTitleName = selectOption.textContent

          if (newFio === data[parseInt(dataEditValue) - 1].fioEmployee && newJobTitleName === data[parseInt(dataEditValue) - 1].jobTitle) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            fioEmployee: newFio,
            jobTitle: newJobTitleName
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
        })
      } catch (error) {
        console.error(error)
      }
    }
  )
}

export { createNewEmployee, editEmployee }
