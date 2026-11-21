
let form = document.getElementById("myForm");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let numberInput = document.getElementById("number");

let recordList = document.getElementById("recordList");
let submitBtn = document.getElementById("submitBtn");


let records = JSON.parse(localStorage.getItem("records")) || [];

let editIndex = -1;


function displayRecords() {

    recordList.innerHTML = "";

    records.forEach((record, index) => {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = record.name;

        let emailCell = document.createElement("td");
        emailCell.textContent = record.email;

        let numberCell = document.createElement("td");
        numberCell.textContent = record.number;

        let actionCell = document.createElement("td");

        
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "editBtn";

        editBtn.onclick = function() {
            editRecord(index);
        };

        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";

        deleteBtn.onclick = function() {
            deleteRecord(index);
        };

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(numberCell);
        row.appendChild(actionCell);

        recordList.appendChild(row);

    });

}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    let user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        number: numberInput.value.trim()
    };

    if (editIndex === -1) {

        
        records.push(user);

    } else {

      
        records[editIndex] = user;

        editIndex = -1;
        submitBtn.textContent = "Submit";

    }

    localStorage.setItem("records", JSON.stringify(records));

    displayRecords();

    form.reset();

});


function editRecord(index) {

    nameInput.value = records[index].name;
    emailInput.value = records[index].email;
    numberInput.value = records[index].number;

    editIndex = index;

    submitBtn.textContent = "Update";

}


function deleteRecord(index) {

    if (confirm("Are you sure you want to delete this record?")) {

        records.splice(index, 1);

        localStorage.setItem("records", JSON.stringify(records));

       
        if (editIndex === index) {
            editIndex = -1;
            form.reset();
            submitBtn.textContent = "Submit";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayRecords();

    }

}

displayRecords();
