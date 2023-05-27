'use strict'

import { openCreateForm, openEditForm } from '../addForm.js'

function createNewContract(formID, sectionName) {
  openCreateForm('#contract', '#create-contract', '#btn-back-create-contract')

  const form = document.querySelector(formID)

  form.addEventListener('submit', async event => {
    event.preventDefault()

    try {
      const firstDate = new Date(form.newDateName.value)
      const secondDate = new Date(form.newReturnDateName.value)

      if (secondDate.getTime() - firstDate.getTime() !== 86400000) {
        alert(
          'The date is entered incorrectly. The contract is for 1 day only.'
        )
        return
      }

      const newDateName = `${form.newDateName.value.slice(
        8,
        10
      )}.${form.newDateName.value.slice(5, 7)}.${form.newDateName.value.slice(
        0,
        4
      )}`
      const newReturnDateName = `${form.newReturnDateName.value.slice(
        8,
        10
      )}.${form.newReturnDateName.value.slice(
        5,
        7
      )}.${form.newReturnDateName.value.slice(0, 4)}`

      const newPledgeName = form.newPledgeName.value
      const newEmployeeFioName =
        form.newFioEmployeeNames.options[form.newFioEmployeeNames.selectedIndex]
          .textContent
      const newClientFioName =
        form.newFioClientNames.options[form.newFioClientNames.selectedIndex]
          .textContent
      const newCarNumberName =
        form.newCarNumberNames.options[form.newCarNumberNames.selectedIndex]
          .textContent

      let maxId
      let data
      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        data = response.data
        maxId = data[data.length - 1].id
      } catch (error) {
        console.error(error)
      }

      const carNumbers = []
      const carBrands = []
      const pricesPerDay = []

      const tableRows = document.querySelectorAll('#car tbody tr')

      tableRows.forEach(row => {
        const carNumberCell = row.cells[2]
        const carBrandCell = row.cells[1]
        const pricePerDayCell = row.cells[3]

        const carNumber = carNumberCell.textContent
        const carBrand = carBrandCell.textContent
        const pricePerDay = pricePerDayCell.textContent

        carNumbers.push(carNumber)
        carBrands.push(carBrand)
        pricesPerDay.push(pricePerDay)
      })

      const targetCarNumber = newCarNumberName
      const index = carNumbers.indexOf(targetCarNumber)

      let newCarBrandName = null
      let newPricePerDayName = null
      if (index !== -1) {
        newCarBrandName = carBrands[index]
        newPricePerDayName = pricesPerDay[index]
      }

      const newInfo = {
        id: maxId + 1,
        date: newDateName,
        returnDate: newReturnDateName,
        pledge: parseInt(newPledgeName),
        fioEmployee: newEmployeeFioName,
        fioClient: newClientFioName,
        carBrand: newCarBrandName,
        carNumber: newCarNumberName,
        price: parseInt(newPricePerDayName),
      }

      const isCombinationExists = data.some(item => {
        return (
          item.date === newInfo.date &&
          item.returnDate === newInfo.returnDate &&
          item.carNumber === newInfo.carNumber
        )
      })

      if (isCombinationExists) {
        console.log('Info already exists. Please enter a different info.')
        return
      }

      try {
        await axios.post(`http://localhost:3000/${sectionName}`, newInfo)
        console.log('Info added successfully!')
      } catch (error) {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

let editContractEventListener = null

function convertDateFormat(dateString) {
  const parts = dateString.split('.')
  const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0]
  return formattedDate
}

async function editContract(formID, sectionName) {
  openEditForm(
    '#contract',
    '#edit-contract',
    '#btn-back-edit-contract',
    async function (dataEditValue) {
      const form = document.querySelector(formID)

      const formDate = form.updatedDateName
      const formReturnDate = form.updatedReturnDateName
      const formNumberPledge = form.updatedPledgeName

      const selectElementEmployeeFio = form.updatedFioEmployeeNames
      const selectElementClientFio = form.updatedFioClientNames
      const selectElementCarNumber = form.updatedCarNumberNames

      try {
        const response = await axios.get(`http://localhost:3000/${sectionName}`)
        const data = response.data

        formDate.value = convertDateFormat(
          data[parseInt(dataEditValue) - 1].date
        )
        formReturnDate.value = convertDateFormat(
          data[parseInt(dataEditValue) - 1].returnDate
        )
        formNumberPledge.value = data[parseInt(dataEditValue) - 1].pledge

        const fioEmployee = data[parseInt(dataEditValue) - 1].fioEmployee
        for (let i = 0; i < selectElementEmployeeFio.options.length; i++) {
          const option = selectElementEmployeeFio.options[i]
          if (option.textContent === fioEmployee) {
            option.selected = true
            break
          }
        }

        const fioClient = data[parseInt(dataEditValue) - 1].fioClient
        for (let i = 0; i < selectElementClientFio.options.length; i++) {
          const option = selectElementClientFio.options[i]
          if (option.textContent === fioClient) {
            option.selected = true
            break
          }
        }

        const carNumber = data[parseInt(dataEditValue) - 1].carNumber
        for (let i = 0; i < selectElementCarNumber.options.length; i++) {
          const option = selectElementCarNumber.options[i]
          if (option.textContent === carNumber) {
            option.selected = true
            break
          }
        }

        editContractEventListener = async event => {
          event.preventDefault()

          const firstDate = new Date(form.updatedDateName.value)
          const secondDate = new Date(form.updatedReturnDateName.value)

          if (secondDate.getTime() - firstDate.getTime() !== 86400000) {
            alert(
              'The date is entered incorrectly. The contract is for 1 day only.'
            )
            return
          }

          const newDateName = `${formDate.value.slice(
            8,
            10
          )}.${formDate.value.slice(5, 7)}.${formDate.value.slice(0, 4)}`
          const newReturnDateName = `${formReturnDate.value.slice(
            8,
            10
          )}.${formReturnDate.value.slice(5, 7)}.${formReturnDate.value.slice(
            0,
            4
          )}`

          const newPledgeName = parseInt(formNumberPledge.value)
          const newEmployeeFioName =
            selectElementEmployeeFio.options[
              selectElementEmployeeFio.selectedIndex
            ].textContent
          const newClientFioName =
            selectElementClientFio.options[selectElementClientFio.selectedIndex]
              .textContent

          const newCarNumberName =
            selectElementCarNumber.options[selectElementCarNumber.selectedIndex]
              .textContent

          const carNumbers = []
          const carBrands = []
          const pricesPerDay = []

          const tableRows = document.querySelectorAll('#car tbody tr')

          tableRows.forEach(row => {
            const carNumberCell = row.cells[2]
            const carBrandCell = row.cells[1]
            const pricePerDayCell = row.cells[3]

            const carNumber = carNumberCell.textContent
            const carBrand = carBrandCell.textContent
            const pricePerDay = pricePerDayCell.textContent

            carNumbers.push(carNumber)
            carBrands.push(carBrand)
            pricesPerDay.push(pricePerDay)
          })

          const targetCarNumber = newCarNumberName
          const index = carNumbers.indexOf(targetCarNumber)

          let newCarBrandName = null
          let newPricePerDayName = null
          if (index !== -1) {
            newCarBrandName = carBrands[index]
            newPricePerDayName = pricesPerDay[index]
          }

          if (
            newDateName === data[parseInt(dataEditValue) - 1].date &&
            newReturnDateName ===
              data[parseInt(dataEditValue) - 1].returnDate &&
            newPledgeName === data[parseInt(dataEditValue) - 1].pledge &&
            newEmployeeFioName ===
              data[parseInt(dataEditValue) - 1].fioEmployee &&
            newClientFioName === data[parseInt(dataEditValue) - 1].fioClient &&
            newCarNumberName === data[parseInt(dataEditValue) - 1].carNumber
          ) {
            console.log('Info not changed. Form not submitted.')
            return
          }

          const updatedData = {
            id: data[parseInt(dataEditValue) - 1].id,
            date: newDateName,
            returnDate: newReturnDateName,
            pledge: newPledgeName,
            fioEmployee: newEmployeeFioName,
            fioClient: newClientFioName,
            carBrand: newCarBrandName,
            carNumber: newCarNumberName,
            price: parseInt(newPricePerDayName),
          }

          const isCombinationExists = data.some(item => {
            return (
              item.date === updatedData.date &&
              item.returnDate === updatedData.returnDate &&
              item.carNumber === updatedData.carNumber
            )
          })
    
          if (isCombinationExists) {
            console.log('Info already exists. Please enter a different info.')
            return
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

        form.addEventListener('submit', editContractEventListener)
      } catch (error) {
        console.error(error)
      }
    }
  )
}

function removeEditContractEventListener(form) {
  if (editContractEventListener) {
    form.removeEventListener('submit', editContractEventListener)
    editContractEventListener = null
  }
}

export { createNewContract, editContract, removeEditContractEventListener }