document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const budgetForm = document.getElementById('budgetForm');
    const transactionList = document.getElementById('transactionList');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpenses = document.getElementById('totalExpenses');
    const remainingBalance = document.getElementById('remainingBalance');
    const ctx = document.getElementById('spendingChart').getContext('2d');

    let transactions = [];
    let chart;

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('type').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;

            const transaction = {
                type,
                amount,
                category
            };

            transactions.push(transaction);
            updateUI();
        });
    }

    function updateUI() {
        transactionList.innerHTML = '';
        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.category}: $${transaction.amount}`;
            transactionList.appendChild(listItem);

            if (transaction.type === 'income') {
                income += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });

        totalIncome.textContent = `$${income.toFixed(2)}`;
        totalExpenses.textContent = `$${expenses.toFixed(2)}`;
        remainingBalance.textContent = `$${(income - expenses).toFixed(2)}`;

        updateChart(income, expenses);
    }

    function updateChart(income, expenses) {
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [income, expenses],
                    backgroundColor: ['#4CAF50', '#FF5252']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});
