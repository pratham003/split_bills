const people = {};
let expenses = [];

function setPeople() {
  const numPeople = parseInt(document.getElementById("numPeople").value);
  if (numPeople <= 0 || isNaN(numPeople)) {
    alert("Please enter a valid number of people.");
    return;
  }

  // Initialize balances for people and populate dropdown
  const payerDropdown = document.getElementById("payer");
  payerDropdown.innerHTML =
    '<option value="" disabled selected>Select Payer</option>'; // Reset dropdown

  for (let i = 1; i <= numPeople; i++) {
    const name = prompt(`Enter name for Person ${i}:`);
    if (name) {
      people[name] = 0;

      // Add name to the dropdown
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      payerDropdown.appendChild(option);
    }
  }

  document.getElementById("expenseSection").style.display = "block";
  alert("People added! You can now add expenses.");
}

function addExpense() {
  const amount = parseFloat(document.getElementById("amount").value);
  const payer = document.getElementById("payer").value;

  if (isNaN(amount) || amount <= 0 || !payer || !(payer in people)) {
    alert("Please enter valid expense details.");
    return;
  }

  expenses.push({ amount, payer });

  // Split the amount
  const share = amount / Object.keys(people).length;

  // Adjust balances
  for (let person in people) {
    if (person === payer) {
      people[person] += amount - share;
    } else {
      people[person] -= share;
    }
  }

  document.getElementById("amount").value = "";
  document.getElementById("payer").value = "";
  showSummary();
}

function showSummary() {
  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = "";

  for (let person in people) {
    const balance = people[person].toFixed(2);
    const message =
      balance > 0
        ? `${person} should receive ₹${balance}`
        : `${person} owes ₹${Math.abs(balance)}`;
    const p = document.createElement("p");
    p.textContent = message;
    summaryDiv.appendChild(p);
  }

  document.getElementById("summarySection").style.display = "block";
}
