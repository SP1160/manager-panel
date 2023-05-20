import { getAndShowInfo, deleteRow } from "./modules/services/genetalService.js"
import { openActiveTable } from "./modules/changeTableState.js"
import { changeToDarkMode, changeToLightMode, switchMode } from "./modules/changeThemeMode.js"
import { toggleSidebar } from "./modules/switchingSidebar.js"
import { createNewJobTitle, editJobTitle } from "./modules/services/jobTitleServiсes.js"
import { createNewEmployee, editEmployee } from "./modules/services/employeeServices.js"
import { createNewCar, editCar } from "./modules/services/carServices.js"

window.addEventListener('DOMContentLoaded', () => {
  let isSidebarClosed = localStorage.getItem('isSidebarClosed') === 'true'
  let isModeDark = localStorage.getItem('isModeDark') === 'true'

  getAndShowInfo('job')
  getAndShowInfo('employee')
  getAndShowInfo('car')
  getAndShowInfo('client')
  getAndShowInfo('contract')

  if (isSidebarClosed) {
    document.querySelector('nav').classList.add('close')
  } else {
    document.querySelector('nav').classList.remove('close')
  }

  if (isModeDark) {
    changeToDarkMode('body', '.mode-text', 'tbody', 'thead', '.form__content')
  } else {
    changeToLightMode('body', '.mode-text', 'tbody', 'thead', '.form__content')
  }

  toggleSidebar('nav', '.toggle')

  openActiveTable('.nav-link')

  switchMode('.toggle-switch', 'body', '.mode-text', 'tbody', 'thead', '.form__content')

  createNewJobTitle('#create-job', 'job')
  editJobTitle('#edit-job', 'job')
  deleteRow('job', 'job')

  createNewEmployee('#create-employee', 'employee')
  editEmployee('#edit-employee', 'employee')
  deleteRow('employee', 'employee')

  createNewCar('#create-car', 'car')
  editCar('#edit-car', 'car')
  deleteRow('car', 'car')
})