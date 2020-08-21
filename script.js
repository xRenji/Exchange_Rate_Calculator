const firstCurrency = document.getElementById("currency-one");
const secondCurrency = document.getElementById("currency-two");
const firstAmount = document.getElementById("amount-one");
const secondAmount = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

firstCurrency.addEventListener("change", processing);
firstAmount.addEventListener("input", processing);
secondCurrency.addEventListener("change", processing);
secondAmount.addEventListener("input", processing);

function processing() {
  const currency_one = firstCurrency.value;
  const currency_two = secondCurrency.value;
  // console.log(currency_one);

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      secondAmount.value = (firstAmount.value * rate).toFixed(2);
    });
}

swap.addEventListener("click", () => {
  const temp = firstCurrency.value;
  firstCurrency.value = secondCurrency.value;
  secondCurrency.value = temp;
  processing();
});

processing();
