document.addEventListener('DOMContentLoaded', () => {
    renderDogs();
    document.getElementById('dog-form')[3].disabled = true;
})

// function to render the dogs in a table on the page
function renderDogs () {
    fetch('http://localhost:3000/dogs')
    .then((response) => response.json())
    .then((allDogs) => {for (let dog of allDogs) addDogToTable(dog)});
}

// function to add elements to the dog table
function addDogToTable (dog) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>  
    `
    tableRow.children[3].addEventListener('click', () => editDog(dog))
    document.getElementById('table-body').appendChild(tableRow);
}

// function gets called when the edit button is clicked. allows user to edit dog properties
function editDog (dog) {
    const dogForm = document.getElementById('dog-form');
    const submitBtn = document.getElementById('dog-form')[3]
    dogForm.children[0].value = dog.name;
    dogForm.children[1].value = dog.breed;
    dogForm.children[2].value = dog.sex;
    submitBtn.disabled = false;
    submitBtn.addEventListener('click', () => editDogDatabase(dog));
}

// send patch request to edit the dog database with the desired edits
function editDogDatabase (dog) {
    const dogForm = document.getElementById('dog-form')
    const newDog = dog;
    newDog.name = dogForm[0].value;
    newDog.breed = dogForm[1].value;
    newDog.sex = dogForm[2].value;
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDog)
    })
}