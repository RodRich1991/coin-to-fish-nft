let buyed = false;
function buy() {
  var btnSearch = document.getElementById('searchmarket');

  const interval = setInterval(() => {
    if (!buyed) {
      btnSearch.click();
  
      setTimeout(() => {
        let onSale = Array.from(document.getElementsByClassName('pricefish'));
  
        console.warn('ELEMENTS ON SALE: ', onSale, onSale.length);
    
        let buyThis = 
          onSale.find(element => {
            const isSold = element.classList.contains('sold');
            const isOnPriceDesidered = Array.from(element.getElementsByTagName('font')).some(font => Number.parseInt(font.innerText <= 2));
            console.warn('checking: ', element, 'isSold?', isSold, 'isOnPriceDesidered', isOnPriceDesidered, Array.from(element.getElementsByTagName('font')).map(f => f.innerText));
            return !isSold && isOnPriceDesidered;
          });
        
        if (buyThis) {
          console.warn('FOUND AN ITEM: ', buyThis);
          buyThis.click();
          buyed = true;
          setTimeout(() => {
            const btnBuy = document.querySelector('.buyitemshopm');
            if (btnBuy) {
              btnBuy.click();
              console.warn('BUYED SUCCESFULLY!');
            }
          }, 500);
        }
      }, 500);
    } else {
      clearInterval(interval);
    }
  }, 2000);
}