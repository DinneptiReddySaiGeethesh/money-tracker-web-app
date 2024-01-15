document.addEventListener('DOMContentLoaded', () => {
    fetchTransactions();
    updateBalance();
});

function fetchTransactions() {
    fetch('/transactions')
        .then(response => response.json())
        .then(data => displayTransactions(data.transactions))
        .catch(error => console.error('Error:', error));
}

function displayTransactions(transactions) {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} - $${transaction.amount}`;
        transactionList.appendChild(li);
    });
}

function updateBalance() {
    fetch('/balance')
        .then(response => response.json())
        .then(data => {
            const balanceElement = document.getElementById('balance');
            balanceElement.textContent = `Balance: $${data.balance}`;
        })
        .catch(error => console.error('Error:', error));
}

function submitTransaction() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const transactionType = document.getElementById('transactionType').value;

    fetch('/addTransaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount,
            description,
            type: transactionType,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchTransactions();
        updateBalance();
    })
    .catch(error => console.error('Error:', error));
}
