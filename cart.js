let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Personal Three Door Refrigerator',
        tag: 'Home and Living1',
        price: 4396,
        inCart: 0
    },
    {
        name: 'Palermo Queen Size Bedframe',
        tag: 'Home and Living2',
        price: 19990,
        inCart: 0
    },
    {
        name: 'Solid Wood Dining Chair',
        tag: 'Home and Living3',
        price: 359,
        inCart: 0
    },
    {
        name: 'Sofa Bed for Living Room',
        tag: 'Home and Living4',
        price: 6490,
        inCart: 0
    }
];

// ADD TO CART LISTENERS
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// GRAB LOCAL STORAGE INITIAL VALUE
function onLoadNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers; 
    }
}

// UPDATE LOACAL STORAGE AND CART VALUE 
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);    
        document.querySelector(".cart span").textContent = productNumbers + 1; 

    } else {
        localStorage.setItem('cartNumbers', 1);   
        document.querySelector(".cart span").textContent = 1; 
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);


    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
    
        cartItems = {
                        [product.tag]: product
                    }
    }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// COST AND TOTSL COST LOCAL STORAGE
function totalCost(product) {
    // console.log("The price is ", product.price);
    let cartCost = localStorage.getItem("totalCost");
    

    console.log("My cartCost is ", cartCost);
    console.log(typeof cartCost);
        
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    console.log(cartItems);

    if(cartItems && productContainer) {
        productContainer.innerHTML = "";

        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            `
        })
    }
    console.log(cartItems);
}



// CALL LOCAL STORAGE AUTO UPDATE FUNCTION
onLoadNumbers();

// DISPLAY CART ITEMS FROM DATA ON LOCAL STORAGE
displayCart();


// https://www.youtube.com/watch?v=IY5UN82FZ2Q 19:07
