var middlewareHost = 'pysdk.openpaysdk.com';
var authPayload = { "token": { JamAuthToken, "openpay_url_mode": "Training" } };
var openpayImgPath = 'https://www.jssdk.openpaytestandtrain.com.au/cdn/img';
var openpayLogoPath = 'https://www.jssdk.openpaytestandtrain.com.au/cdn/img/op-logos';

// const opCurrencySymbols = ['$', '£', '₹', '€'];

// let opPriceCurrency = document.querySelectorAll(productListClasses.productParentPrice);
// if (!opPriceCurrency.length) {
//   opPriceCurrency = document.querySelectorAll(productListClasses.productAlternatePrice);
// }
// var op_currency = '';
// for (let opCurrencySymbol of opCurrencySymbols) {
//   if (opPriceCurrency[0].innerText.includes(opCurrencySymbol)) {
//     op_currency = opCurrencySymbol;
//   };
// }

const activateNotificationSlider = typeof (notificationBar) !== 'undefined' && true || false;

const activateMiniCart = typeof (miniCartClasses) !== 'undefined' && true || false;

const checkoutSettingsExists = typeof (checkoutSettings) !== 'undefined' && true || false;

const activateProductList = typeof (productListClasses) !== 'undefined' && true || false;

const popupSettingsExists = typeof (LearnMorePopUpSettings) !== 'undefined' && true || false;

// const op_currency = typeof (opCurrency) !== 'undefined' && opCurrency || '';

const op_countryCode = typeof (opCountryCode) !== 'undefined' && opCountryCode || '';

const country_name = op_countryCode === 'AU' && 'Australia' || op_countryCode === 'UK' && 'United Kingdom' || '';

const op_currency = op_countryCode === 'AU' && '$' || op_countryCode === 'UK' && '£' || '';


/*close the bar*/
var closeBanner = () => {
  document.getElementById('notification-bar').style.display = 'none';
}

var myOpen = () => {
  document.getElementById("openpayPopbox").style.display = "block";
}

var myClose = () => {
  document.getElementById("openpayPopbox").style.display = "none";
}

var priceOpen = () => {
  document.getElementById("pricepopbox").style.display = "block";
}

var priceClose = () => {
  document.getElementById("pricepopbox").style.display = "none";
}

const removeElements = (elms) => [...elms].forEach(el => el.remove());

const showNotificationBar = (contents) => {
  var closeButtonText = contents.closeButtonText;
  closeButtonText = typeof closeButtonText !== 'undefined' ? closeButtonText : 'Close';
  var closeButtonBackground = contents.closeButtonBackground;
  closeButtonBackground = typeof closeButtonBackground !== 'undefined' ? closeButtonBackground : '#ffffff';
  var closeButtonTextColor = contents.closeButtonTextColor;
  closeButtonTextColor = typeof closeButtonTextColor !== 'undefined' ? closeButtonTextColor : '#000000';
  const notification = document.getElementById('notification-bar');
  if (!notification) {
    // let body = document.getElementsByTagName("BODY")[0];
    var closeButton = `<a id ='close' onclick='closeBanner();' href='javascript:void(0)' class='notification__close' style='float: right;background-color: ${closeButtonBackground}; color: ${closeButtonTextColor};' >${closeButtonText}</a>`;
    var messages = '';
    for (content of contents.messages) {
      let bgColor = content.bgColor;
      let txtColor = content.txtColor;
      let height = content.height;
      let message = content.message;
      let closeButtonText = content.closeButtonText;
      let infoButtonText = content.infoButtonText;
      let logo = content.logo;
      bgColor = typeof bgColor !== 'undefined' ? bgColor : "#cccccc";
      txtColor = typeof txtColor !== 'undefined' ? txtColor : "#000000";
      height = typeof height !== 'undefined' ? height : 40;
      message = typeof message !== 'undefined' ? message : 'Please Provide a Message';
      infoButtonText = typeof infoButtonText !== 'undefined' ? infoButtonText : 'Learn More';
      if (logo === 'op_text_blue') {
        messages += ` 
        <div class="notification__cover opSlides op-animate-top" style="background-color: ${bgColor}; height: 400">
          <div class="notifi__inner">
            <div class="notification__logo" style="color:#2864ff !important;">Openpay</div>
            <p style="color: ${txtColor}">${message}</p>
            <a href="javascript:void(0);" onclick="myOpen()">${infoButtonText}</a>
            
          </div>
        </div>`
      } else if (logo === 'op_text_black') {
        messages += ` 
        <div class="notification__cover opSlides op-animate-top" style="background-color: ${bgColor}; height: 400">
          <div class="notifi__inner">
          <div class="notification__logo" style="color:#000000 !important;">Openpay</div>
            <p style="color: ${txtColor}">${message}</p>
            <a href="javascript:void(0);" onclick="myOpen()">${infoButtonText}</a>
            
          </div>
        </div>`
      } else {
        messages += ` 
        <div class="notification__cover opSlides op-animate-top" style="background-color: ${bgColor}; height: 400">
          <div class="notifi__inner">
            <div class="notification__logo"><img src="${openpayLogoPath}/${logo}.png" alt="Openpay"></div>
            <p style="color: ${txtColor}">${message}</p>
            <a href="javascript:void(0);" onclick="priceOpen()">${infoButtonText}</a>
            
          </div>
        </div>`
      }
    }
    var HTMLmessage = `<div class="notification__message">
      ${messages}
      ${closeButton}
    </div>`;

    // ${popupUpHtml}`;
    // body.innerHTML = "<div id='notification-bar' class = 'notification__bar'>" + HTMLmessage + "</div>" + body.innerHTML;
    const newDivBody = document.body.firstChild;
    newDivBody.style.float = 'left';
    newDivBody.style.width = '100%';
    const noti_div = document.createElement('DIV');
    noti_div.className = "op-notificationOuterDiv";
    noti_div.innerHTML = "<div id='notification-bar' class = 'notification__bar'>" + HTMLmessage + "</div>";
    document.body.insertBefore(noti_div, newDivBody);

    var myIndex = 0;
    function notificationSlider() {
      var i;
      var x = document.getElementsByClassName("opSlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {
        myIndex = 1
      }
      x[myIndex - 1].style.display = "block";
      setTimeout(notificationSlider, 5000);
    }
    notificationSlider();
  }
}

const openpayCalculatorAPI = (amount, i) => {
  const data = {
    "token": {
      "JamAuthToken": JamAuthToken,
      "openpay_url_mode": "Training"
    },
    "purchase_price": amount,
    "duration": ProductListOpenpayInfo.payOfMonth + ' Month',
    "payment_frequency": ProductListOpenpayInfo.frequency,
    "AuthToken": authToken,
    "country_code": opCountryCode,
  };
  fetch(`https://${middlewareHost}/api/price-calculator/`, {
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
    const filteredData = response.filtered_scheme;
    const initialAmounts = document.querySelectorAll(`#todayAmt${i}`);
    const logo = ProductListOpenpayInfo.logo;
    var logoHTML = ``;
    if (logo === 'op_text_blue') {
      logoHTML = `<div style="position: relative; margin: 0px 4px;color:#2864ff;">Openpay</div>`
    } else if (logo === 'op_text_black') {
      logoHTML = `<div style="position: relative; margin: 0px 4px;color:#000000;">Openpay</div>`
    } else {
      logoHTML = `<img src="${openpayLogoPath}/${ProductListOpenpayInfo.logo}.png" style="position: relative; margin: 0px 4px;">`;
    }
    var learnMoreHTML = '';
    if (ProductListOpenpayInfo.showLearnMore) {
      learnMoreHTML = `<a onclick = "priceOpen();">Learn more</a>`;
    }
    if (filteredData) {
      const initialPrice = filteredData[0].initial_payment;
      const paymentAmount = filteredData[0].payment_amount;
      const payments = filteredData[0].no_of_payments;
      const paymentFrequency = filteredData[0].payment_frequency;
      const textFormat = ProductListOpenpayInfo.text;
      // const isFractional = response.fractional_payment;
      // if (isFractional) {
      if (textFormat === 'normal') {
        for (initialAmount of initialAmounts) {
          if (initialPrice === 0) {
            initialAmount.innerHTML = `Or ${op_currency}${paymentAmount} today and more time to pay with ${logoHTML} ${learnMoreHTML}`;
          } else {
            initialAmount.innerHTML = `Or ${op_currency}${initialPrice} today and more time to pay with ${logoHTML} ${learnMoreHTML}`;
          }
        }
      }
      if (textFormat === 'fractional') {
        for (initialAmount of initialAmounts) {
          if (initialPrice === 0) {
            initialAmount.innerHTML = `Or ${payments} payments of ${op_currency}${paymentAmount} with ${logoHTML} ${learnMoreHTML}`;
          } else {
            initialAmount.innerHTML = `Or ${payments + 1} payments of ${op_currency}${initialPrice} with ${logoHTML} ${learnMoreHTML}`;
          }
        }
      }
      if (textFormat === 'fractional_frequency') {
        for (initialAmount of initialAmounts) {
          if (initialPrice === 0) {
            initialAmount.innerHTML = `Or ${payments} ${paymentFrequency} interest free payments of ${op_currency}${paymentAmount} with ${logoHTML} ${learnMoreHTML}`;
          } else {
            initialAmount.innerHTML = `Or ${payments + 1} ${paymentFrequency} interest free payments of ${op_currency}${initialPrice} with ${logoHTML} ${learnMoreHTML}`;
          }
        }
      }
      if (textFormat === 'noprice') {
        for (let initialAmount of initialAmounts) {
          initialAmount.innerHTML = `Or more time to pay with ${logoHTML} ${learnMoreHTML}`;
        }
      }
      // }
      // else {
      //   if (textFormat === 'format1') {
      //     for (initialAmount of initialAmounts) {
      //       initialAmount.innerText = `Or $${initialPrice} today and more time to pay with `;
      //     }
      //   }
      //   if (textFormat === 'format2') {
      //     for (initialAmount of initialAmounts) {
      //       // initialAmount.innerText = `Or $${initialPrice} today and rest with ${payments + 1} payments of $${paymentAmount} with `;
      //       initialAmount.innerText = `Or ${payments + 1} payments of $${initialPrice} with `;
      //     }
      //   }
      //   if (textFormat === 'format3') {
      //     for (initialAmount of initialAmounts) {
      //       initialAmount.innerText = `Or more time to pay with `;
      //     }
      //   }
      // }
    } else {
      for (let initialAmount of initialAmounts) {
        initialAmount.innerHTML = `Or more time to pay with ${logoHTML} ${learnMoreHTML}`;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}

const activateProductWidget = (min, max) => {
  const infoDivExists = document.querySelectorAll('.top-info');
  removeElements(infoDivExists)
  var prices = document.querySelectorAll(productListClasses.productParentPrice);
  // var prices = document.querySelectorAll('.woocommerce-variation-price .price');
  if (!prices.length) {
    prices = document.querySelectorAll(productListClasses.productAlternatePrice);
  }
  for ([i, price] of prices.entries()) {
    // let learnMoreHTML = '';
    // if (ProductListOpenpayInfo.showLearnMore) {
    //   learnMoreHTML = `<a onclick = "priceOpen();">Learn More</a>`;
    // }
    const widgitHTML = `<div class="info-ttl">
                          <span class="" id="todayAmt${i}"></span>
                        </div>`;
    let amounts = price.innerText;
    amounts = amounts.replace(/\n/g, " ").split(" ");
    amounts = amounts.map(amount => Number(amount.replace(/[^0-9.-]+/g, "")));
    amounts = amounts.filter(amount => amount !== 0);
    amounts = amounts.sort();
    const divNode = document.createElement('DIV');
    const spanNode = document.createElement('SPAN');
    const topInfoDiv = divNode;
    topInfoDiv.classList.add('top-info');
    topInfoDiv.innerHTML = widgitHTML;
    topInfoDiv.style.color = ProductListOpenpayInfo.styles.color || '#000000';
    topInfoDiv.querySelector('.info-ttl > span').style.textAlign = ProductListOpenpayInfo.styles.textAlign;
    topInfoDiv.style.backgroundColor = ProductListOpenpayInfo.styles.backgroundColor || '#ffffff';
    topInfoDiv.style.fontStyle = ProductListOpenpayInfo.styles.fontStyle;
    topInfoDiv.style.fontSize = ProductListOpenpayInfo.styles.fontSize;
    topInfoDiv.style.fontWeight = ProductListOpenpayInfo.styles.fontWeight;
    topInfoDiv.style.fontFamily = ProductListOpenpayInfo.styles.fontFamily;
    topInfoDiv.style.top = ProductListOpenpayInfo.styles.top;
    topInfoDiv.style.bottom = ProductListOpenpayInfo.styles.bottom;
    topInfoDiv.style.left = ProductListOpenpayInfo.styles.left;
    topInfoDiv.style.right = ProductListOpenpayInfo.styles.right;
    if (amounts[0] >= min && amounts[0] <= max) {
      price.after(topInfoDiv);
      openpayCalculatorAPI(amounts[0], i);
    } else {
      if (ProductListOpenpayInfo.showOpenpayMsg) {
        price.after(topInfoDiv);
        topInfoDiv.innerHTML = `Openpay available on orders from ${op_currency}${min} - ${op_currency}${max}`;
      }
    }

  }



};

const addCheckoutWidget = (min, max) => {
  const openpayBoxExists = document.querySelector(checkoutClasses.paymentMethodBox);
  if (openpayBoxExists) {
    let orderTotal = document.querySelector(checkoutClasses.totalPayment);
    orderTotal = Number(orderTotal.innerText.replace(/[^0-9.-]+/g, ""));
    if (orderTotal >= min && orderTotal <= max) {
      const checkoutPayload = {
        "token": {
          "JamAuthToken": authToken,
          "openpay_url_mode": "Training"
        },
        "purchase_price": orderTotal,
        "duration": checkoutSettings.payOfMonth,
        "payment_frequency": checkoutSettings.frequency,
        "AuthToken": authToken,
        "country_code": opCountryCode,
      }
      fetch(`https://${middlewareHost}/api/checkout/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(checkoutPayload)
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not reach the API: " + response.statusText);
        }
      }).then((response) => {
        const payments = response.data;
        // const openpayCheckoutLabel = document.querySelector(checkoutClasses.paymentLabel);
        const isFractionalPayment = response.fractional_payment;
        let opCheckoutMessageFormat = 'op_checkout_text';
        let opCheckoutMessage = '<p class="Checkout__ptag" style="margin-bottom: 0px;">Click on <a href="javascript:void(0);">Submit Order</a> to securely <br>complete your purchase. <br>You will be directed to Openpay website.</p>';
        if (checkoutSettingsExists) {
          opCheckoutMessageFormat = checkoutSettings.checkoutMessageFormat || 'op_checkout_text';
        }
        if (opCheckoutMessageFormat === 'op_checkout_text') {
          opCheckoutMessage = '<p class="Checkout__ptag" style="margin-bottom: 0px;">Click on <a href="javascript:void(0);">Submit Order</a> to securely <br>complete your purchase. <br>You will be directed to Openpay website.</p>';
        }
        if (opCheckoutMessageFormat === 'op_checkout_text_button') {
          opCheckoutMessage = '<p class="Checkout__ptag" style="margin-bottom: 0px;">Click on <a href="javascript:void(0);">Submit Order</a> to securely <br>complete your purchase. <br><a href="javascript:void(0);" class="op__checkoutbtn">Proceed to Openpay</a>';
        }
        if (opCheckoutMessageFormat === 'op_checkout_button') {
          opCheckoutMessage = '<a href="javascript:void(0);" class="op__checkoutbtn">Proceed to Openpay</a>';
        }
        // const opPaymentSection = document.querySelector(checkoutClasses.paymentMethod);
        let opPaymentBox = document.querySelector(checkoutClasses.paymentMethodBox);
        if (!opPaymentBox) {
          opPaymentBox = document.querySelector(checkoutClasses.paymentMethodBox);
        }
        const checkoutHtml = `
            </br>
            <div class="all__prices__openpay">
            <div class="checkout_payment_op"></div>
            ${opCheckoutMessage}
          </div>
        `;
        const noOptionHtml = `
            </br>
            <div class="all__prices__openpay">
            <div class="checkout_payment_op"></div>
          </div>
        `;
        if (payments) {
          if (payments.length > 0) {
            opPaymentBox.innerHTML = checkoutHtml;
          } else {
            opPaymentBox.innerHTML = noOptionHtml;
          }
        } else {
          opPaymentBox.innerHTML = noOptionHtml;
        }
        var paymentsHtml = '';
        if (payments) {

          if (payments.length > 0) {
            if (isFractionalPayment) {
              for (let payment of payments) {
                paymentsHtml += `
              <div class="price__Tag__Checkout">
                <span>${payment.no_of_payments + 1}</span>
                <div class="priceTagText">
                  <p>${op_countryCode === 'AU' && payment.payment_frequency || ''} payments of</p>
                </div>
                <b>${op_currency}${payment.payment_amount}</b>
              </div>
              <p class="orcheckout__ptag">OR</p>
          `;
              }
            } else {
              if (payments[0].initial_payment > 0) {
                paymentsHtml += `<h2 style="text-align:center; padding-bottom: 15px;"><span>${op_currency}${payments[0].initial_payment}</span><p>Today’s Payment and</p></h2>`
              }
              for (let payment of payments) {
                paymentsHtml += `
              <div class="price__Tag__Checkout">
                <span>${payment.no_of_payments}</span>
                <div class="priceTagText">
                  <p>${op_countryCode === 'AU' && payment.payment_frequency || ''} payments of</p>
                </div>
                <b>${op_currency}${payment.payment_amount}</b>
              </div>
              <p class="orcheckout__ptag">OR</p>
          `;
              }
            }
          } else {
            paymentsHtml += `
            <div class="price__Tag__Checkout">
              No Options Available for Given Configurations.
            </div>
        `;
          }
        } else {
          paymentsHtml += `
          <div class="price__Tag__Checkout">
            No Options Available for Given Configurations.
          </div>
      `;
        }
        const checkoutPaymentSection = document.querySelector('.checkout_payment_op');
        checkoutPaymentSection.innerHTML = '';
        checkoutPaymentSection.innerHTML = paymentsHtml;
        const logo = checkoutSettings.logo;
        var logoHTML = ``;
        if (logo === 'op_text_blue') {
          logoHTML = `<div style="display: inline-block; margin-left: 30px; margin-top: 6px; color:#2864ff;">Openpay</div>`
        } else if (logo === 'op_text_black') {
          logoHTML = `<div style="display: inline-block; margin-left: 30px; margin-top: 6px; color:#000000;">Openpay</div>`
        } else {
          logoHTML = `<img src="${openpayLogoPath}/${checkoutSettings.logo}.png" alt="Openpay" style="display: inline-block; margin-left: 60px; margin-top: 6px;">`;
        }

        const op_label = document.querySelectorAll('label');
        for (let openpayCheckoutLabel of op_label) {
          if (openpayCheckoutLabel.htmlFor === checkoutClasses.paymentLabel) {
            openpayCheckoutLabel.style.display = 'inline';
            openpayCheckoutLabel.innerText = 'loading...';
            openpayCheckoutLabel.innerHTML = `Openpay - Buy Now. Pay Later. ${logoHTML}`;
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}

const miniCartWidget = (min, max) => {
  const cartContent = document.querySelector(miniCartClasses.cartContent);
  const logo = miniCartSettings.logo;
  var logoHTML = ``;
  if (logo === 'op_text_blue') {
    logoHTML = `<div style="color:#2864ff;">Openpay</div>`
  } else if (logo === 'op_text_black') {
    logoHTML = `<div style="color:#000000;">Openpay</div>`
  } else {
    logoHTML = `<img src="${openpayLogoPath}/${miniCartSettings.logo}.png"/>`;
  }
  const cartWidgetExists = document.querySelectorAll('.op-cart-info');
  removeElements(cartWidgetExists)
  const cart_total = document.querySelector(miniCartClasses.totalPrice);
  if (cart_total) {
    const cart_value = Number(cart_total.innerText.replace(/[^0-9.-]+/g, ""));
    if (cart_value !== 0) {
      if (cart_value < min) {
        let add_value = min - cart_value;
        const cartHtml = `${logoHTML}<p>Spend an additional ${op_currency}${add_value} and use Openpay to pay over time interest free.</p>`;
        let divNode = document.createElement('DIV');
        let hrNode = document.createElement('HR');
        divNode.className = 'op-cart-info';
        divNode.innerHTML = cartHtml;
        cartContent.appendChild(divNode)
      } else if (cart_value > max) {
        let reduce_value = cart_value - max;
        const cartHtml = ``; //${logoHTML}<p>Openpay is not available as your cart size is over the maximum limit of ${max}. Please reduce your cart size by ${reduce_value} to use Openpay.</p>
        let divNode = document.createElement('DIV');
        let hrNode = document.createElement('HR');
        divNode.className = 'op-cart-info';
        divNode.innerHTML = cartHtml;
        cartContent.appendChild(divNode)
      }
    }
  }
}

const getMinMax = (modules) => {
  fetch(`https://${middlewareHost}/api/min-max-check/`, {
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
    addPopupBox(minPrice, maxPrice);
    if (modules === 'all') {
      if (activateProductList) {
        activateProductWidget(minPrice, maxPrice);
      }
      if (checkoutSettingsExists) {
        addCheckoutWidget(minPrice, maxPrice);
      }
      if (activateMiniCart) {
        miniCartWidget(minPrice, maxPrice);
      }
    } else if (modules === 'miniCart') {
      if (activateMiniCart) {
        miniCartWidget(minPrice, maxPrice);
      }
    } else if (modules === 'checkout') {
      if (checkoutSettingsExists) {
        addCheckoutWidget(minPrice, maxPrice);
      }
    } else if (modules === 'productlist') {
      if (activateProductList) {
        activateProductWidget(minPrice, maxPrice);
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}




const checkAuthentication = (modules) => {
  fetch(`https://${middlewareHost}/api/auth/`, {
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
    if (activateNotificationSlider) {
      showNotificationBar(notificationBar);
    }
    getMinMax(modules);
  }).catch((error) => {
    console.log(error);
  });
}


checkAuthentication('all');

const checkCartPriceChange = () => {
  const arrayTotal = [];
  setInterval(() => {
    const totalNode = document.querySelector(miniCartClasses.totalPrice);
    if (totalNode) {
      const total = Number(totalNode.innerText.replace(/[^0-9.-]+/g, ""));
      arrayTotal.push(total);
      if (arrayTotal[arrayTotal.length - 1] !== arrayTotal[arrayTotal.length - 2]) {
        checkAuthentication('miniCart');
      }
    }
  }, 100)
}

const checkCheckoutPriceChange = () => {
  const arrayTotal = [];
  setInterval(() => {
    const totalNode = document.querySelector(checkoutClasses.totalPayment);
    if (totalNode) {
      const total = Number(totalNode.innerText.replace(/[^0-9.-]+/g, ""));
      arrayTotal.push(total);
      if (arrayTotal[arrayTotal.length - 1] !== arrayTotal[arrayTotal.length - 2]) {
        checkAuthentication('checkout');
      }
    }
  }, 100)
}

const productVariationsCheck = () => {
  const variationClasses = productListClasses.variations;
  if (variationClasses) {
    for (let variations of variationClasses) {
      variations = document.querySelectorAll(variations);
      for (let variation of variations) {
        variation.addEventListener('mouseup', () => {
          const infoDivExists = document.querySelectorAll('.top-info');
          removeElements(infoDivExists);
          checkAuthentication('productlist');
        })
      }
    }
  }
}

if (activateMiniCart) {
  checkCartPriceChange();
}

if (checkoutSettingsExists) {
  checkCheckoutPriceChange();
}

if (activateProductList) {
  productVariationsCheck();
}

const addPopupBox = (min, max) => {
  var bannerImage = 'slider';
  var popUpOpenpayLogo = 'op_logo_normal';
  var popUpMerchantLogo = '';
  var tagLineColor = '#000000';
  if (popupSettingsExists) {
    bannerImage = LearnMorePopUpSettings.bannerImage || 'slider';
    popUpOpenpayLogo = LearnMorePopUpSettings.openpayLogo || 'op_logo_normal';
    popUpMerchantLogo = LearnMorePopUpSettings.merchantLogo || '';
    tagLineColor = LearnMorePopUpSettings.taglineColor || '#000000';
  }
  const popupHTML = document.createElement('DIV');
  popupHTML.innerHTML = `
    <div class="pricepopbox" id="pricepopbox">
      <div class="popboxPriceContent">
        <div class="innerPricePopbox">
          <a href="javascript:void(0);" class="popboxClose" onclick="priceClose()"></a>
          <div class="popboxPriceInner">
            <div class="popUpperpart" style="background-image: url('${openpayImgPath}/${bannerImage}.jpg');">
              <div class="allLogos">
                <span><img src="${popUpMerchantLogo}"></span>
                <span><img src="${openpayLogoPath}/${popUpOpenpayLogo}.png"></span>
              </div>
              <h6 style="color: ${tagLineColor};">Buy now. Pay smarter</h6>
            </div>
            <div class="popLowerpart">
              <h4>Available on orders from ${op_currency}${min} - ${op_currency}${max}</h4>
              <ul>
                <li>
                  <span></span>
                  <p>Shop & <br>checkout</p>
                </li>
                <li>
                  <span></span>
                  <p>Select Openpay as <br>your payment method</p>
                </li>
                <li>
                  <span></span>
                  <p>Register & design <br>your plan</p>
                </li>
              </ul>
            </div>
            <div class="popLastPart">
              <p>If you are 18 years or older and a permanent resident of ${country_name} all you’ll need is a </p>
              <div class="innerElements">
                <span>Debit or Credit card</span>
                <span>Email address</span>
                <span>The required deposit</span>
                <span>Mobile phone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  document.body.appendChild(popupHTML);
}

const checkMultipleInfo = () => {
  const parent = document.querySelector('.summary');
  setInterval(() => {
    const infoElement = parent.querySelectorAll('.top-info');
    if (infoElement.length > 1) {
      infoElement[0].style.display = 'none';
    } else {
      infoElement[0].style.display = 'block';
    }
  }, 100)
}

// checkMultipleInfo();
