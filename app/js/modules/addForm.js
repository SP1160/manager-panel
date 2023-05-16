'use strict'

function openCreateForm(tableID, formID, btnBackID) {
  const table = document.querySelector(tableID)
  const form = document.querySelector(formID)
  const btnBack = document.querySelector(btnBackID)
  const sidebar = document.querySelector('nav')

  table.addEventListener('click', event => {
    if (event.target && event.target.classList.contains('fa-square-plus')) {
      table.classList.remove('active-table')
      form.classList.add('active-form')
      sidebar.style.display = 'none'
    }
  })

  comebackToMainPage(table, form, btnBack, sidebar)
}

function openEditForm(tableID, formID, btnBackID, callback) {
  const table = document.querySelector(tableID);
  const form = document.querySelector(formID);
  const btnBack = document.querySelector(btnBackID);
  const sidebar = document.querySelector('nav');

  table.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('fa-pen-to-square')) {
      const dataEditValue = event.target.getAttribute('data-edit');
      const row = table.querySelector(`tr[data-row="${dataEditValue}"]`);
      const jobTitle = row.querySelector('td:nth-child(2)').innerText;

      form.querySelector('input[name="updatedJobTitleName"]').value = jobTitle;

      table.classList.remove('active-table');
      form.classList.add('active-form');
      sidebar.style.display = 'none';

      if (typeof callback === 'function') {
        callback(dataEditValue);
      }
    }
  });

  comebackToMainPage(table, form, btnBack, sidebar);
}

function comebackToMainPage(table, form, btnBack, sidebar) {
  btnBack.addEventListener('click', event => {
    event.preventDefault()

    table.classList.add('active-table')
    form.classList.remove('active-form')
    sidebar.style.display = ''
  })
}

export { openCreateForm, openEditForm }
