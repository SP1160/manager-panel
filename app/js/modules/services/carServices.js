'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewCar(formID, sectionName) {
  openCreateForm('#car', '#create-car', '#btn-back-create-car')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    const newCarBrand = form.newCarBrand.value.trim()
    const newCarNumber = form.newCarNumber.value.toUpperCase().trim()
    const newPricePerDay = form.newPricePerDay.value

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
      carBrand: newCarBrand,
      carNumber: newCarNumber,
      price: newPricePerDay
    }

    try {
      await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
      console.log('Info added successfully!')
      form.reset()
    } catch (error) {
      console.error(error)
    }
  })
}

async function editCar(formID, sectionName) {
  openEditForm(
    '#car',
    '#edit-car',
    '#btn-back-edit-car',
    async function (dataEditValue) {
      const form = document.querySelector(formID)
      const formInputCarBrand = form.updatedCarBrand
      const formInputCarNumber = form.updatedCarNumber
      const formInputCarPricePerDay = form.updatedPricePerDay

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formInputCarBrand.value = data[parseInt(dataEditValue) - 1].carBrand
        formInputCarNumber.value = data[parseInt(dataEditValue) - 1].carNumber
        formInputCarPricePerDay.value = data[parseInt(dataEditValue) - 1].price

        form.addEventListener('submit', async event => {
          event.preventDefault()

          const newCarBrand = formInputCarBrand.value.trim()
          const newCarNumber = formInputCarNumber.value.toUpperCase().trim()
          const newPricePerDay = formInputCarPricePerDay.value

          if (
            newCarBrand === data[parseInt(dataEditValue) - 1].carBrand &&
            newCarNumber === data[parseInt(dataEditValue) - 1].carNumber &&
            newPricePerDay === data[parseInt(dataEditValue) - 1].price) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            carBrand: newCarBrand,
            carNumber: newCarNumber,
            price: newPricePerDay
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

export { createNewCar, editCar }
