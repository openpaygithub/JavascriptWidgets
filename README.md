# Openpay Plugin Snippet

## 1.  Import plugin URL

### Style path -
```javascript
<link rel="stylesheet" type="text/css" href="http://www.jssdk.openpaytestandtrain.com.au/cdn/openpay.css"/>
```

### JavaScript path -
```javascript
<script type='text/javascript' src='http://www.jssdk.openpaytestandtrain.com.au/cdn/openpay.js'></script>
```

&nbsp;
## 2. Use snippet

### 1. Add JamAuth Token for authenticating plugin - 
```javascript
var JamAuthToken = "30000000000000889|155f5b95-a40a-4ae5-8273-41ae83fec8c9";
var authToken = "OP 3340|EC3C629D-CF23-4045-A07A-38A21D39AC16";
var opCountryCode = "UK";
```

```javascript
// List of Country Code
opCountryCode = "AU";
opCountryCode = "UK";
```



### 2. Add Notification bar -
```javascript
var notificationBar = {
    messages: [
        {
            message: "Buy now with Zero interest. More time to pay.",
            bgColor: ["#f7b818"],
            txtColor: "white",
            infoButtonText: 'Learn more',
            logo: 'op_logo_normal'
        },{
            message: "Black Friday Sale, 50% off on all products storewide",
            bgColor: ["#ee4251"],
            txtColor: "white",
            infoButtonText: 'Read more',
            logo: 'op_logo_grey'
        },{
            message: "Huge sale on across Madison island, 30% off on all footwear",
            bgColor: ["#5b4ef7"],
            txtColor: "white",
            infoButtonText: 'Show Info',
            logo: 'op_text_black'
        }
    ],
    closeButtonText: 'Close',            // close button text
    closeButtonBackground:'red',         // close button background color
    closeButtonTextColor:'blue',         // close button text color
    height: 40,                          // For changing height of the popup
};
```


```javascript
// [ Please follow the instructions - ]
{
    message: "Notification Text",        // You can use the notification message
    bgColor: ["#ffe8e2"],                // Change the background color (Hex/RGB) of notification
    txtColor: "black",                   // For changing color of notification text
    infoButtonText: 'Learn more',        // Change the text of link
    logo: 'use logo pattern'             // Change the logo which you want to show for this slide
}
```

```javascript
// [ Logo pattern - ]
{
    logo: 'op_logo_normal',
    logo: 'op_logo_grey',
    logo: 'op_logo_icon_normal',
    logo: 'op_logo_icon_grey',
    logo: 'op_logo_normal_large',
    logo: 'op_logo_grey_large',
    logo: 'op_text_black',
    logo: 'op_text_blue'
}
```

&nbsp;
### 3. Add Openpay Price list widget -
```javascript
var productListClasses = {
    productParentPrice: '.price',                       // class for class containing prices of products
    productAlternatePrice: '.price',                    // class containing actual amount of product
    variations : ['.variations'],
};

var ProductListOpenpayInfo = {
    text: 'fractional',                                 // text for openpay widget
    logo: 'op_logo_normal',                             // format for openpay logo
    payOfMonth: '2',
    frequency: 'Fortnightly',
    showLearnMore: false,                               // show learn more link
    showOpenpayMsg: false,                              // add true to show openpay message not in range.
    styles: {
        textAlign: 'center',
        fontFamily: 'Times New Roman", Times, serif',   // for specifying font family
        fontStyle: 'normal',                            // for specifying font-style
        fontSize: '14px',                               // For specifying font-size
        fontWeight: 'normal',                           // for specifying font Weight
        color: 'grey',                                  // for specifying font color
        top: '',                                             
        left: '',       
        right: '',     
        bottom: ''
    }
}
```
```javascript
// [ text message format - ]
{
    text: 'normal',                                     // Or $8 today and more time to pay with
    text: 'fractional',                                 // Or $10.2 today and rest with 9 payments of $5.1 with
    text: 'fractional_frequency',
    text: 'noprice'                                     // Or more time to pay with
}
```

```javascript
// [ important authtoken ]
{
    fractional: "3-507|A4AEB753-EBBE-4AFF-8858-E2CB4CFEC348",
    normal: "OP 3340|EC3C629D-CF23-4045-A07A-38A21D39AC16"
}
```


&nbsp;
### 4. Add Mini Cart -

```javascript
var miniCartClasses = {
    cartParent: '.woo_amc_container_wrap_right',        // main parent div class
    cartContent: '.woo_amc_items_scroll',               // parent div class of cart
    totalPrice: '.woo_amc_footer_total'                 // div class of total price
}
```

```javascript
var miniCartSettings = {
    logo: 'op_logo_icon_normal'                         // change mini-cart logo pattern
}
```

&nbsp;
### 5. Add Checkout -
```javascript
//Add Checkout Widget
var checkoutClasses = {
    paymentMethod: '.payment_method_openpay',
    paymentMethodBox: '.payment_box',
    totalPayment: '.order-total .amount',
    paymentLabel: 'payment_method_openpay'
}
```
```javascript
//Add Checkout Widget Settings
var checkoutSettings = {
    payOfMonth: [2, 3],
    frequency: ['Fortnightly', 'Weekly'],               //'Fortnightly','Weekly'
    logo: 'op_logo_normal',                             // use logo format
    checkoutMessageFormat: 'op_checkout_text_button'    // Please check the details below
}
```
```javascript
// [ Checkout Message format - ]
{
    checkoutMessageFormat: 'op_checkout_text',           // only text
    checkoutMessageFormat: 'op_checkout_button',         // only button
    checkoutMessageFormat: 'op_checkout_text_button'     // button with text
}
```

&nbsp;
### 6. Modify learn more popup settings -
```javascript
//Snippet for Learn more popup
var LearnMorePopUpSettings = {
    bannerImage: 'slider',                              // use banner image name
    openpayLogo: 'op_logo_grey',                        // use logo format
    merchantLogo: '',                                   // Use merchant logo path
    taglineColor: '#ffffff',                            // use tagline color
}
```
