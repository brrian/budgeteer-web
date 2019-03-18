export default (amount: string) => {
  if (!amount) {
    return;
  }

  let total = 0;

  amount.split(',').forEach(item => {
    let addTax = false;
    let filteredItem = item;

    if (item.indexOf('+') === 0) {
      addTax = true;
      filteredItem = item.substr(1);
    }

    let itemAmount = Number(filteredItem);

    if (addTax) {
      itemAmount *= 1.0825;
    }

    total += +itemAmount.toFixed(2);
  });

  return +total.toFixed(2);
};
