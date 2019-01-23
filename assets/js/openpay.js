var authPayload = { "token": { JamAuthToken } };
console.log(authPayload);
fetch('http://182.75.72.149:8000/api/auth/', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  mode: 'cors',
  body: JSON.stringify(authPayload)
}).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Could not reach the API: " + response.statusText);
  }
}).then((data) => {
  activatePlugin();
}).catch((error) => {
  // 	console.log(error);
});


/*close the bar*/
var closeBanner = () => {
  document.getElementById('notification-bar').style.display = 'none';
}

const activatePlugin = () => {
  const showNotificationBar = (contents) => {
    var closeBanner = () => {
      document.getElementById('notification-bar').style.display = 'none';
    }
    var bgColor = contents.bgColor;
    var txtColor = contents.txtColor;
    var height = contents.height;
    var message = contents.message;
    var closeButtonText = contents.closeButtonText;
    /*set default values*/
    bgColor = typeof bgColor !== 'undefined' ? bgColor : "#cccccc";
    txtColor = typeof txtColor !== 'undefined' ? txtColor : "#000000";
    height = typeof height !== 'undefined' ? height : 40;
    closeButtonText = typeof closeButtonText !== 'undefined' ? closeButtonText : 'Close';
    message = typeof message !== 'undefined' ? message : 'Please Provide a Message';
    /*create the notification bar div if it doesn't exist*/
    const notification = document.getElementById('notification-bar');
    if (!notification) {
      let body = document.getElementsByTagName("BODY")[0];
      var closeButton = "<a id ='close' onclick='closeBanner();' href='javascript:void(0)' style='float: right;' >" + closeButtonText + "</a>";
      // var closeButton = `<a href='javascript:void(0)' style='float: right;' onclick='document.getElementById('notification-bar').style.display = 'none' >${closeButtonText}</a>`;
      var HTMLmessage = "<div class='notification-message' style='text-align:center; line-height: " + height + "px;'> " + message + " " + closeButton + "</div>";
      body.innerHTML = "<div id='notification-bar' style='width:100%; height:" + height + "px; background-color: " + bgColor + "; position: fixed; z-index: 99999; color: " + txtColor + ";'>" + HTMLmessage + "</div>" + body.innerHTML;
    }
  }

  const removeElements = (elms) => [...elms].forEach(el => el.remove());

  // const addLogoToList = () => {
  // 	const minPrice = 10;
  // 	const maxPrice = 30;
  // 	const amounts = document.querySelectorAll('.'+productListClasses.productPrice);
  // 	const openpayText = 'or pay with   ';
  // 	const openpayLogo = 'https://cdnjs.cloudflare.com/ajax/libs/octicons/8.2.0/svg/alert.svg';
  // 	const priceDiv = document.querySelector('.price');
  // 	for(amount of amounts) {
  // 		let price = amount.innerText;
  // 		price = Number(amount.innerText.replace(/[^0-9.-]+/g,""));
  // 		if(price > minPrice && price < maxPrice) {
  // 			const brNode = document.createElement('BR');
  // 			amount.appendChild(brNode);
  // 			const pNode = document.createElement('P');
  // 			pNode.innerHTML = openpayText;
  // 			pNode.classList.add("openpay_p");
  // 			pNode.style.color = ProductListOpenpayExt.color;
  // 			pNode.style.fontStyle = ProductListOpenpayExt.fontStyle;
  // 			pNode.style.fontSize = ProductListOpenpayExt.fontSize;
  // 			pNode.style.fontWeight = ProductListOpenpayExt.fontWeight;
  // 			pNode.style.fontFamily = ProductListOpenpayExt.fontFamily;
  // 			amount.appendChild(pNode);
  // // 			amount.after(pNode);
  // // 			amount.parentNode.after(pNode);
  // 			const imgNode = document.createElement('IMG');
  // 			imgNode.setAttribute('src', openpayLogo);
  // 			pNode.appendChild(imgNode);
  // 		}
  // 	}
  // 	const delAmounts = document.querySelectorAll('del .openpay_p');
  // 	removeElements( delAmounts );
  // }

  const openpayCalculatorAPI = (amount, i) => {
    const data = { "token": { "JamAuthToken": "3-507|A4AEB753-EBBE-4AFF-8858-E2CB4CFEC348" }, "purchase_price": amount };
    fetch('http://182.75.72.149:8000/api/price_calculator/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Could not reach the API: " + response.statusText);
      }
    }).then((response) => {
      const data = response.data;
      const initialPrice = data.filter((item) => item.plan_ref === 'ref#1')[0].initial_payment;
      const initialAmounts = document.getElementById(`todayAmt${i}`);
      initialAmounts.innerText = '$' + initialPrice;
    }).catch((error) => {
      console.log(error);
    });
  }

  fetch('http://182.75.72.149:8000/api/min_max_price/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(authPayload)
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not reach the API: " + response.statusText);
    }
  }).then((data) => {
    const minPrice = data.MinPrice;
    const maxPrice = data.MaxPrice;
    addLogoToList(minPrice, maxPrice);
  }).catch((error) => {
    console.log(error);
  });

  const addLogoToList = (min, max) => {
    const minPrice = min;
    const maxPrice = max;
    const prices = document.querySelectorAll(productListClasses.productParentPrice);
    for ([i, price] of prices.entries()) {
      if (price.childElementCount === 1) {
        let amount = Number(price.innerText.replace(/[^0-9.-]+/g, ""));
        if (amount > minPrice && amount < maxPrice) {
          const divNode = document.createElement('DIV');
          const spanNode = document.createElement('SPAN');

          const topInfoDiv = divNode;
          topInfoDiv.classList.add('top-info');
          topInfoDiv.innerHTML = `<span class="info-ttl">Or <span class="" id="todayAmt${i}"></span> ${ProductListOpenpayInfo.text || ''}  <img src=${ProductListOpenpayInfo.logo || ''}></span>`;
          topInfoDiv.style.color = ProductListOpenpayInfo.color;
          topInfoDiv.style.fontStyle = ProductListOpenpayInfo.fontStyle;
          topInfoDiv.style.fontSize = ProductListOpenpayInfo.fontSize;
          topInfoDiv.style.fontWeight = ProductListOpenpayInfo.fontWeight;
          topInfoDiv.style.fontFamily = ProductListOpenpayInfo.fontFamily;
          price.after(topInfoDiv);
          openpayCalculatorAPI(amount, i);
        }
      } else if (price.childElementCount > 1) {
        let amountElement = price.querySelectorAll('ins ' + productListClasses.productAmount);
        for (amounts of amountElement) {
          if (amounts.children) {
            let amount = Number(amounts.innerText.replace(/[^0-9.-]+/g, ""));
            if (amount > minPrice && amount < maxPrice) {
              const divNode = document.createElement('DIV');
              const spanNode = document.createElement('SPAN');

              const topInfoDiv = divNode;
              topInfoDiv.classList.add('top-info');
              topInfoDiv.innerHTML = `<span class="info-ttl">Or <span class="" id="todayAmt${i}"></span> ${ProductListOpenpayInfo.text || ''}  <img src=${ProductListOpenpayInfo.logo || ''}></span>`;
              topInfoDiv.style.color = ProductListOpenpayInfo.color;
              topInfoDiv.style.fontStyle = ProductListOpenpayInfo.fontStyle;
              topInfoDiv.style.fontSize = ProductListOpenpayInfo.fontSize;
              topInfoDiv.style.fontWeight = ProductListOpenpayInfo.fontWeight;
              topInfoDiv.style.fontFamily = ProductListOpenpayInfo.fontFamily;
              price.after(topInfoDiv);
              openpayCalculatorAPI(amount, i);
            }
          }
        }
      }
    }
  };

  //   addLogoToList();
  showNotificationBar(notificationBar);
}

// activatePlugin();
