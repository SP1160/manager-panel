import getAndShowInfo from "./modules/serviсes.js"
import { changeToDarkMode, changeToLightMode, switchMode } from "./modules/changeThemeMode.js"
import { toggleSidebar } from "./modules/switchingSidebar.js"
import openActiveTable from "./modules/changeTableState.js"

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
    changeToDarkMode('body', '.mode-text', 'tbody', 'th', '.title')
  } else {
    changeToLightMode('body', '.mode-text', 'tbody', 'th', '.title')
  }

  toggleSidebar('nav', '.toggle')

  openActiveTable('.nav-link')

  switchMode('.toggle-switch', 'body', '.mode-text', 'tbody', 'th', '.title')
})