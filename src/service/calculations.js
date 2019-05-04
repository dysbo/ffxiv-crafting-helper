export function calculateRemainingExp (currentExp, totalExp) {
  return Math.max(totalExp - currentExp, 0)
}

export function calculateRemainingItems (remainingExp, expPerItem) {
  return Math.ceil(remainingExp / expPerItem)
}

export function calculateProgressPercentage (currentExp, totalExp) {
  return totalExp <= 0 ? 0 : Math.floor((currentExp / totalExp) * 100)
}
