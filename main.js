// Variables Scoope:

// Containers.
const product_container = document.querySelector(".product-container");
const footer_container = document.querySelector("footer");
const money_machine = document.querySelector(".money-machine-style");
const product_list_content = document.createElement("div");
const info_buy = document.querySelector(".info-buy-style");
const message_box = document.querySelector(".message-box");



// Input Elements.
const product_name = document.getElementById("product-name");
const product_quantity = document.getElementById("product-quantity");
const product_price = document.getElementById("product-price");
const final_price = document.getElementById("final-price");
const money_display = document.getElementById("money-disply");

// Button Elements.
const buy_btn = document.getElementById("buy-btn");
const ok_btn = document.getElementById("ok-btn");
const backspace_btn = document.getElementById("backspace-btn");
const ok_message_btn = document.getElementById("ok-message");

const message = document.querySelector("h3");

// Products Information List.
let products = [
    {

        id: 0,
        name: "Water",
        price: 50,
        quantity: 100,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Juice",
        price: 75,
        quantity: 8,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Chocolate",
        price: 100,
        quantity: 5,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Chips",
        price: 150,
        quantity: 7,
        state: false,
        product_btn: document.createElement("button"),

    }

];

// Normal Variables.
let current_product = 0;

let quantity_left = 0;

let total_money = 0;

let money_list = [];

let arr_products_info = [
    {
    
        "productID": 0,
        "quantityToken": 0,
        "finalPrice": 0,
        "state": true,
    
    },
    {        

        "productID": 0,

    },
];

// Preparing The Products Part
products.forEach((pro, index) => {

    pro.id = index + 1;
    pro.product_btn.innerText = `${pro.id}: ${pro.name} ${pro.quantity} $${pro.price}`;
    
    pro.product_btn.classList.add("pro-btn-style");
    
    product_list_content.appendChild(pro.product_btn);
    product_list_content.classList.add("pro-list-content");
    
    info_buy.before(product_list_content);

});

// Click Money Number Event
const click_number = (number) => {

    money_display.value += number;

}

const message_note = (text) => {

    footer_container.style.filter = "blur(5px)";
    money_machine.style.filter = "blur(5px)";
    product_container.style.filter = "blur(5px)";
    
    message_box.style.display = "flex";
    message.innerText = text;

};

// OK Event
ok_btn.addEventListener("click", () => {

    money_list.push(Number(money_display.value.slice(1)));
    money_display.value = '$';

});

// Backspace Event
backspace_btn.addEventListener("click", () => {

    let arr_backspace = [];

    for(let counter = 0; counter < money_display.value.length; counter++){

        if(money_display.value[counter] == '$'){

            continue;

        }else{

            arr_backspace.push(money_display.value[counter]);

        }

    }

    arr_backspace.pop();
    money_display.value = `$${arr_backspace.join('')}`;
    
    if(arr_backspace[0] == null){
    
        money_display.value = '$';
    
    }

});

ok_message_btn.addEventListener("click", () => {

    footer_container.style.filter = "blur(0px)";
    money_machine.style.filter = "blur(0px)";
    product_container.style.filter = "blur(0px)";

    message_box.style.display = "none";

});

// Products List Event
// Working Abt That Tomorrow Inshallah You Will Find The Solution🤲.
products.forEach((product, index) => {

    product.product_btn.addEventListener("click", () => {

        arr_products_info[1]["productID"] = product.id;

        if(arr_products_info[0]["productID"] == arr_products_info[1]["productID"]){
            
            current_product = index;

            if(product.quantity > arr_products_info[0]["quantityToken"]){

                arr_products_info[0]["quantityToken"] += 1;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product.price;

                product_name.value = `Product: ${product.name}`;
                product_quantity.value = `Quantity: ${arr_products_info[0]["quantityToken"]}`;

                product_price.value = `Price: $${product.price}`;
                final_price.value = `Final Peice: $${arr_products_info[0]["finalPrice"]}`;

                quantity_left = product.quantity - arr_products_info[0]["quantityToken"];
                product.product_btn.innerText = `${product.id}: ${product.name} ${quantity_left} $${product.price}`;

            }else{

                text = `The Quantity Of ${product.name} Is Zero:(\nCome Back Later:)`;
                message_note(text);

            }
        
        }else if(arr_products_info[0]["productID"] != arr_products_info[1]["productID"]){

            products[current_product].product_btn.innerText = `${products[current_product].id}: ${products[current_product].name} ${products[current_product].quantity} $${products[current_product].price}`;
            
            arr_products_info[0]["quantityToken"] = 0;

            arr_products_info[0]["productID"] = arr_products_info[1]["productID"];
            
            current_product = index;

            if(product.quantity >= arr_products_info[0]["quantityToken"]){
                
                arr_products_info[0]["quantityToken"] += 1;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product.price;

                product_name.value = `Product: ${product.name}`;
                product_quantity.value = `Quantity: ${arr_products_info[0]["quantityToken"]}`;

                product_price.value = `Price: $${product.price}`;
                final_price.value = `Final Peice: $${arr_products_info[0]["finalPrice"]}`;

                quantity_left = product.quantity - arr_products_info[0]["quantityToken"];
                product.product_btn.innerText = `${product.id}: ${product.name} ${quantity_left} $${product.price}`;

            }else{

                text = `The Quantity Of ${product.name} Is Zero:(\nCome Back Later:)`;
                message_note(text);

            }

        }
        
    });
    
});

// Buy Event
buy_btn.addEventListener("click", () => {
    
    money_list.forEach((money) => {

        total_money += money;
    
    });

    products.forEach((product, index) => {

        if(arr_products_info[0]["productID"] == product.id){

            if(product.quantity >= arr_products_info[0]["quantityToken"]){

                if(total_money >= arr_products_info[0]["finalPrice"]){

                    let text = '';

                    product_name.value = `Product: `;
                    product_quantity.value = `Quantity: 0`;
                
                    product_price.value = `Price: $0`;
                    final_price.value = `Final Peice: $0`;
                    
                    quantity_left = product.quantity - arr_products_info[0]["quantityToken"];
                    product.product_btn.innerText = `${product.id}: ${product.name} ${quantity_left} $${product.price}`;
    
                    product.quantity = quantity_left;
                    
                    if(total_money > arr_products_info[0]["finalPrice"]){
                
                        text = `You Have $${total_money - arr_products_info[0]["finalPrice"]} Left \nThank You For Using Our Machine:)`;
                    
                    }else{
                        
                        text = `Thank You For Using Our Machine:)`;
                        
                    }
                    
                    message_note(text);
    
                    total_money = 0;

                }else if(total_money < arr_products_info[0]["finalPrice"]){

                    text = `Your Money Is Not Enough To Buy This Product:( \nYou Only Have $${total_money}`;
                    message_note(text);

                    products[current_product].product_btn.innerText = `${products[current_product].id}: ${products[current_product].name} ${products[current_product].quantity} $${products[current_product].price}`;
                
                    product_name.value = `Product: `;
                    product_quantity.value = `Quantity: 0`;
                
                    product_price.value = `Price: $0`;
                    final_price.value = `Final Peice: $0`;
                }
            
            }else{

                text = `The Quantity Of ${product.name} Is Zero:(\nCome Back Later:)`;
                message_note(text);

            }

        }

    });

    arr_products_info[0]["productID"] = 0;
    arr_products_info[0]["quantityToken"] = 0;

});

// Created By Dark Knight:-