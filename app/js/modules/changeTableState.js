'use strict'

import { openSidebar } from './switchingSidebar.js'

function getActiveTable(activeTableID, ...otherTableIDs) {
  document.querySelector(activeTableID).classList.add('active-table')
  otherTableIDs.forEach(tableID => {
    document.querySelector(tableID).classList.remove('active-table')
  })
}

function openActiveTable(iconsSelector) {
  const iconBtns = document.querySelectorAll(iconsSelector)

  iconBtns.forEach(btn => {
    if (btn.getAttribute('data-link') === 'job') {
      btn.addEventListener('click', () => {
        openSidebar('nav')
        getActiveTable('#job', '#employee', '#car', '#client', '#contract')
      })
    }

    if (btn.getAttribute('data-link') === 'employee') {
      btn.addEventListener('click', () => {
        openSidebar('nav')
        getActiveTable('#employee', '#job', '#car', '#client', '#contract')
      })
    }

    if (btn.getAttribute('data-link') === 'car') {
      btn.addEventListener('click', () => {
        openSidebar('nav')
        getActiveTable('#car', '#job', '#employee', '#client', '#contract')
      })
    }

    if (btn.getAttribute('data-link') === 'client') {
      btn.addEventListener('click', () => {
        openSidebar('nav')
        getActiveTable('#client', '#job', '#employee', '#car', '#contract')
      })
    }

    if (btn.getAttribute('data-link') === 'contract') {
      btn.addEventListener('click', () => {
        openSidebar('nav')
        getActiveTable('#contract', '#job', '#employee', '#car', '#client')
      })
    }
  })
}

export default openActiveTable
