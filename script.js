const coef1 = document.querySelector('.coef1')
const coef2 = document.querySelector('.coef2')
const bet1 = document.querySelector('.bet1')
const bet2usd = document.querySelector('.bet2usd')
const bet2gel = document.querySelector('.bet2gel')
const calculate = document.querySelector('.calculate')
const betContainer = document.querySelector('.bet-container')
const warning = document.querySelector('.warning')

function calculateBet2() {
  if (coef1.value && coef2.value && bet1.value) {
    const odd1 = Number(coef1.value)
    const odd2 = Number(coef2.value)
    const placement1 = Number(bet1.value)
    if (areOddsFavourable(odd1, odd2)) {
      bet2usd.style.display = "block"
      bet2gel.style.display = "block"
      warning.style.display = "none"

      const placement2USD = calculcateFavourableSecondPlacement(odd1, odd2, placement1)
      bet2usd.innerHTML = `$${placement2USD}`
      fetch('http://free.currencyconverterapi.com/api/v5/convert?q=USD_GEL&compact=y')
        .then(data => data.json())
        .then(res => {
          const rate = res.USD_GEL.val
          const placement2GEL = Math.round(rate * placement2USD)
          bet2gel.innerHTML = `₾${placement2GEL}`
        })
    } else {
      bet2usd.style.display = "none"
      bet2gel.style.display = "none"
      warning.style.display = "block"
      warning.innerHTML = "კოეფიციენტები არ ვარგა"
    }
  } else {
    bet2usd.style.display = "none"
    bet2gel.style.display = "none"
    warning.style.display = "block"
    warning.innerHTML = "ბოლომდე შეავსე ველები"
  }
}

function areOddsFavourable(a, b) {
  return (a - 1) * (b - 1) > 1
}

function calculcateFavourableSecondPlacement(coef1, coef2, placement1) {
  const minCoef = Math.min(coef1, coef2)
  const maxCoef = Math.max(coef1, coef2)
  const win1 = minCoef * placement1
  const profit1 = win1 - placement1
  const placement2 = profit1 - (maxCoef * profit1 - win1) / (2 * maxCoef)
  return Math.round(placement2)
}