'use strict'

function openSidebar(sidebarSelector) {
  const sidebar = document.querySelector(sidebarSelector)

  sidebar.classList.remove('close')
  localStorage.setItem('isSidebarClosed', false)
}

function toggleSidebar(sidebarSelector, toggleSelector) {
  const sidebar = document.querySelector(sidebarSelector)
  const toggle = document.querySelector(toggleSelector)

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close')

    localStorage.setItem('isSidebarClosed', sidebar.classList.contains('close'))
  })
}

export { openSidebar, toggleSidebar }