const coef1 = document.querySelector('.coef1')
const coef2 = document.querySelector('.coef2')
const bet1 = document.querySelector('.bet1')
const margin = document.querySelector('.margin')
const bMin = document.querySelector('.b-min')
const bAvg = document.querySelector('.b-avg')
const bMax = document.querySelector('.b-max')

function calculateBets() {
  if (coef1.value && coef2.value && bet1.value) {
    const odd1 = Number(coef1.value)
    const odd2 = Number(coef2.value)
    const b1 = Number(bet1.value)

    const marginValue = (odd1 - 1) * (odd2 - 1)
    margin.value = marginValue.toFixed(2)

    const bMinValue = b1 / (odd2 - 1)
    const bMaxValue = bMinValue * marginValue
    const bAvgValue = (bMinValue + bMaxValue) / 2

    bMin.value = Math.round(bMinValue)
    bMax.value = Math.round(bMaxValue)
    bAvg.value = Math.round(bAvgValue)
  }
}
