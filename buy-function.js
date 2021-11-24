let buyed;
async function buy() {
  buyed = false;
  const maxPrice = Number.parseInt(prompt('Preço maximo a pagar: ')) || 0;
  const minQty = Number.parseInt(prompt('Quantidade de itens minima: ')) || 1;
  const sleep = interval => new Promise(res => setTimeout(res, interval));
  var btnSearch = document.getElementById('searchmarket');
  console.warn('Parameters', 'maxPrice: ', maxPrice, 'minQty', minQty)

  while(!buyed) {
    btnSearch.click();
    
    await sleep(500);
    let cardsOnSale = Array.from(document.getElementsByClassName('cardfish'));

    console.warn('ELEMENTS ON SALE: ', cardsOnSale.length);

    let title = '';
    let price = 0;
    let buyThis = cardsOnSale.find(element => {
      var elementPrice = element.querySelector('.pricefish');
      var isSold = elementPrice.classList.contains('sold');
      price = Number.parseInt(elementPrice.innerText);
      var isOnPriceDesidered = (price <= maxPrice);

      title = element.querySelector('span[id="idenfity"]').innerText;
      var elementQty = Number.parseInt(title.match(/\[x(\d*)\]/)[1]);
      var hasQtyDesired = (elementQty >= minQty);
      var matchParams = !isSold && isOnPriceDesidered && hasQtyDesired;
      console.warn('Title', title, 'Price', price, 'Qty', elementQty, 'isSold', isSold, 'Match params: ', matchParams);
      return matchParams;
    });
    
    if (buyThis) {
      console.warn('Buying...');
      buyThis.querySelector('.pricefish').click();
      await sleep(500);
        const btnBuy = document.querySelector('.buyitemshopm');
        if (btnBuy) {
          btnBuy.click();
          buyed = true;
          alert(`Parabéns, comprado com sucesso. '${title}' por ${price} alga(s)`);
        }
    }
  }
}