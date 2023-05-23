'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewCar(formID, sectionName) {
  openCreateForm('#car', '#create-car', '#btn-back-create-car')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const newCarBrandName = form.newCarBrandName.value.trim()
    const newCarNumberName = form.newCarNumberName.value.toUpperCase().trim()
    const newPricePerDayName = parseInt(form.newPricePerDayName.value)

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
      carBrand: newCarBrandName,
      carNumber: newCarNumberName,
      price: newPricePerDayName
    }

    try {
      await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
      console.log('Info added successfully!')
    } catch (error) {
      console.error(error)
    }
  })
}

let editCarEventListener = null

async function editCar(formID, sectionName) {
  openEditForm(
    '#car',
    '#edit-car',
    '#btn-back-edit-car',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInputCarBrand = form.updatedCarBrandName
      const formInputCarNumber = form.updatedCarNumberName
      const formInputCarPricePerDay = form.updatedPricePerDayName

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInputCarBrand.value = data[parseInt(dataEditValue) - 1].carBrand
        formInputCarNumber.value = data[parseInt(dataEditValue) - 1].carNumber
        formInputCarPricePerDay.value = data[parseInt(dataEditValue) - 1].price

        editCarEventListener =  async event => {
          event.preventDefault()

          const newCarBrandName = formInputCarBrand.value.trim()
          const newCarNumberName = formInputCarNumber.value.toUpperCase().trim()
          const newPricePerDayName = parseInt(formInputCarPricePerDay.value)

          if (
            newCarBrandName === data[parseInt(dataEditValue) - 1].carBrand &&
            newCarNumberName === data[parseInt(dataEditValue) - 1].carNumber &&
            newPricePerDayName === data[parseInt(dataEditValue) - 1].price) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            carBrand: newCarBrandName,
            carNumber: newCarNumberName,
            price: newPricePerDayName
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

        form.addEventListener('submit', editCarEventListener)
      } catch (error) {
        console.error(error)
      }
    }
  )
}

function removeEditCarEventListener(form) {
  if (editCarEventListener) {
    form.removeEventListener('submit', editCarEventListener)
    editCarEventListener = null
  }
}

export { createNewCar, editCar, removeEditCarEventListener }
