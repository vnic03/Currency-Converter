

"use strict";


function updateDateTime() {
    var now = new Date();

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var date = now.getDate();
    var month = months[now.getMonth()];
    var hours = now.getHours();
    var minutes = now.getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes; 

    var timeString = `${date} ${month}, ${hours}:${minutes} MEZ`;
    document.getElementById('datetime').textContent = timeString;
}

function getExchangeRates(fromCurrency, Currency, amount) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const apiEndpoint = `YOUR_URL_HERE${apiKey}/pair/${fromCurrency}/${Currency}/${amount}`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                
                let convertedAmount = data.conversion_result;

                document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${Currency}`;
                document.getElementById('converted-amount').value = convertedAmount.toFixed(2);
            } else {

                document.getElementById('result').textContent = 'Error retrieving exchange rates.';
                document.getElementById('converted-amount').value = '';
            }
        })
        .catch(error => {

            console.error('Error:', error);
            document.getElementById('converted-amount').value = '';
        });
}

document.getElementById('currency-converter').addEventListener('submit', function(e) {
    e.preventDefault();

    let amountStr = document.getElementById('amount').value;
    let amount = parseFloat(amountStr.replace(',', '.'));

    if (isNaN(amount)){

        document.getElementById('error-message').textContent = '! Please insert a real amount !';
        return;
    } else {
        document.getElementById('error-message').textContent = '';
    }

    let fromCurrency = document.getElementById('currency').value;
    let Currency = document.getElementById('to-currency').value;

    getExchangeRates(fromCurrency, Currency, amount);
});

updateDateTime();
setInterval(updateDateTime, 60000);
