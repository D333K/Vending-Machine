// Variables Scoope:

// Container Elements.
const container = document.querySelector(".product-container");
const product_list_content = document.createElement("div");
const info_buy = document.querySelector(".info-buy-style");

// Input Elements.
const product_name = document.getElementById("product-name");
const product_quantity = document.getElementById("product-quantity");

const product_price = document.getElementById("product-price");
const final_price = document.getElementById("final-price");

const money_display = document.getElementById("money-disply");

// Button Element.
const buy_btn = document.getElementById("buy-btn");
const ok_btn = document.getElementById("ok-btn");
const backspace_btn = document.getElementById("backspace-btn");

// Products Information List.
let products = [
    {
        name: "Water",
        price: 50,
        quantity: 100,
        number: 0,
        state: false,
        product_btn: document.createElement("button"),
    },
    {
        name: "Juice",
        price: 75,
        quantity: 8,
        number: 0,
        state: false,
        product_btn: document.createElement("button"),
    },
    {
        name: "Chocolate",
        price: 100,
        quantity: 5,
        number: 0,
        state: false,
        product_btn: document.createElement("button"),
    },
    {
        name: "Chips",
        price: 150,
        quantity: 7,
        number: 0,
        state: false,
        product_btn: document.createElement("button"),
    }
];

// Normal Variables.
let quantity_left = 0;
let total_money = 0;
let arr_products_info = [{
    "productName": products[0].name,
    "quantityToken": 0,
    "finalPrice": 0,
    "state": true
    },
    {}
];

// Preparing The Products Part
products.forEach((pro, index) => {
    pro.number = index + 1;
    pro.product_btn.innerText = `${pro.number}: ${pro.name} ${pro.quantity} $${pro.price}`;
    
    pro.product_btn.classList.add("pro-btn-style");
    
    product_list_content.appendChild(pro.product_btn);
    product_list_content.classList.add("pro-list-content");
    
    info_buy.before(product_list_content);
});

// Click Money Number Event
function click_number(number){
    money_display.value += number;
}

// OK Event
ok_btn.addEventListener("click", () => {
    total_money = money_display.value.slice(1);
    money_display.value = '$';
});

// Backspace Event
backspace_btn.addEventListener("click", () => {
    let arr_backspace = [];
    for(let counter = 0; counter < money_display.value.length; counter++){
        if(money_display.value[counter] == '$'){
            continue;
        }
        else{
            arr_backspace.push(money_display.value[counter]);
        }
    }

    arr_backspace.pop();
    money_display.value = `$${arr_backspace.join('')}`;
    if(arr_backspace[0] == null){
        money_display.value = '$';
    }
});

// Products List Event
// Working Abt That Tomorrow Inshallah You Will Find The Solution🤲.
products.forEach((product_event) => {
    product_event.product_btn.addEventListener("click", () => {
        arr_products_info[1]["productName"] = product_event.name;
        
        if(product_event.quantity > arr_products_info[0]["quantityToken"]){
            if(arr_products_info[0]["productName"] == arr_products_info[1]["productName"]){
                arr_products_info[0]["quantityToken"]++;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product_event.price;
                
            }
            else if(arr_products_info[0]["productName"] != arr_products_info[1]["productName"]){
                arr_products_info[0]["productName"] = arr_products_info[1]["productName"];
                arr_products_info[0]["quantityToken"] = 1;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product_event.price;
                
            }
            
            product_name.value = `Product: ${arr_products_info[0]["productName"]}`;
            product_quantity.value = `Quantity: ${arr_products_info[0]["quantityToken"]}`;
            product_price.value = `Price: $${product_event.price}`;
            final_price.value = `Final Peice: $${arr_products_info[0]["finalPrice"]}`;
            
        }
        else{
            alert(`The Quantity Of ${product_event.name} Is Zero:(\nCome Back Later:)`);

        }        
    });
    
});

// Buy Event
buy_btn.addEventListener("click", () => {
    for(let product_index = 0; product_index < products.length; product_index++){

        if(products[product_index].name === arr_products_info[0]["productName"]){
            if(total_money >= arr_products_info[0]["finalPrice"]){
                product_name.value = `Product: `;
                product_quantity.value = `Quantity: 0`;
                product_price.value = `Price: $0`;
                final_price.value = `Final Peice: $0`;
                
                quantity_left = products[product_index].quantity - arr_products_info[0]["quantityToken"];
                products[product_index].product_btn.innerText = `${products[product_index].number}: ${products[product_index].name} ${quantity_left} $${products[product_index].price}`;
    
                if(total_money > arr_products_info[0]["finalPrice"]){
                    alert(`You Have $${total_money - arr_products_info[0]["finalPrice"]} Left \nThankYou For Using Our Machine:)`);
                
                }
                else
                    alert(`ThankYou For Using Our Machine:)`);
    
                total_money = 0;
                return;

            }
            else if(total_money < arr_products_info[0]["finalPrice"]){
                alert(`Your Money Is Not Enough To Buy This Product:( \nYou Just Have $${total_money}`);
    
                product_name.value = `Product: `;
                product_quantity.value = `Quantity: 0`;
                product_price.value = `Price: $0`;
                final_price.value = `Final Peice: $0`;
            }
        }
    }
});

// Created By Dark Knight:-