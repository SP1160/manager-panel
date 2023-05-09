// job title
fetch('http://localhost:3000/job')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector(`#job tbody`)
    data.forEach(obj => {
      const row = document.createElement('tr')
      row.classList.add('tr--light')
      row.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj['jobTitle']}</td>
      <td><i class="fa-regular fa-square-plus"></i></td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td><i class="fa-solid fa-xmark"></i></td>
      `
      tableBody.appendChild(row)
    })
  })
  .catch(error => console.log(error))

// employee
fetch('http://localhost:3000/employee')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector(`#employee tbody`)
    data.forEach(obj => {
      const row = document.createElement('tr')
      row.classList.add('tr--light')
      row.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj['fioEmployee']}</td>
      <td>${obj['jobTitle']}</td>
      <td><i class="fa-regular fa-square-plus"></i></td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td><i class="fa-solid fa-xmark"></i></td>
      `
      tableBody.appendChild(row)
    })
  })
  .catch(error => console.log(error))

// car
fetch('http://localhost:3000/car')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector(`#car tbody`)
    data.forEach(obj => {
      const row = document.createElement('tr')
      row.classList.add('tr--light')
      row.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj['carBrand']}</td>
      <td>${obj['carNumber']}</td>
      <td>${`${obj.price} ₽`}</td>
      <td><i class="fa-regular fa-square-plus"></i></td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td><i class="fa-solid fa-xmark"></i></td>
      `
      tableBody.appendChild(row)
    })
  })
  .catch(error => console.log(error))

// client
fetch('http://localhost:3000/client')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector(`#client tbody`)
    data.forEach(obj => {
      const row = document.createElement('tr')
      row.classList.add('tr--light')
      row.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj['fioClient']}</td>
      <td>${obj['telephone']}</td>
      <td><i class="fa-regular fa-square-plus"></i></td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td><i class="fa-solid fa-xmark"></i></td>
      `
      tableBody.appendChild(row)
    })
  })
  .catch(error => console.log(error))

// contract
fetch('http://localhost:3000/contract')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector(`#contract tbody`)
    data.forEach(obj => {
      const row = document.createElement('tr')
      row.classList.add('tr--light')
      row.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj.number}</td>
      <td>${obj['date']}</td>
      <td>${obj['returnDate']}</td>
      <td>${`${obj.pledge} ₽`}</td>
      <td>${obj['fioEmployee']}</td>
      <td>${obj['fioClient']}</td>
      <td>${obj['carBrand']}</td>
      <td>${obj['carNumber']}</td>
      <td><i class="fa-solid fa-eye"></i></td>
      <td><i class="fa-regular fa-square-plus"></i></td>
      <td><i class="fa-solid fa-pen-to-square"></i></td>
      <td><i class="fa-solid fa-xmark"></i></td>
      `
      tableBody.appendChild(row)
    })
  })
  .catch(error => console.log(error))