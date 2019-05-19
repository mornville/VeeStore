<template>
    <div class>
        <div class style="font-family: 'Montserrat', sans-serif;">
            <div class="container">
                <!-- individualType with items -->
                <div class="row">
                    <!-- begin:: Category Heading and Items -->
                    <div class="col-md-12" v-for="(i,index) in type" :key="index">
                        <br>
                        <br>
                        <h3 class="uk-text-center uk-text-uppercase" style="font-family: 'Montserrat', sans-serif;color:black;">{{ i.category }}</h3>
                        <hr class="uk-divider-small uk-text-center">
                        <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
                            <div v-for="(item,index) in starter" :key="index" v-if="item['category']==i['category']">
                                <!-- begin::item card -->
                                
                                <div class="uk-card uk-text-left uk-text-left uk-card-default uk-card-hover" style="color:black;border-radius:10px;" >
                                     <a class :href="'#modal-sections'+item.itemID" uk-toggle>
                                        <li class="flex items-center lh-copy ph0-l uk-margin-small-top">
                                            <img class="uk-margin-small-right" width="120" height="120" :src="item.image" >

                                            <div class="uk-card-body" style="padding: 8px 8px;">
                                            
                                                <h4 class="uk-card-title" style="font-size:1em;margin-bottom:0px;">{{item.name}}  <span class="uk-text-success uk-margin-small-left"> &#8377;{{ item.price}}</span> </h4>
                                                <p class="uk-text-meta .uk-text-truncate" style="margin-top:0px;">{{item.description}}
                                                    <br><br>
                                                
                                                <button class="uk-margin-small-left uk-button uk-button-default uk-button-small" style="font-family: 'Montserrat', sans-serif;;font-size:1em"  v-on:click.prevent.stop="addToCart(item)" :id="'add'+item.itemID" >
                                                      <a href="" class=""  uk-icon="cart"> Add To Cart &nbsp;</a>
                                                </button>                                                    
                                                </p>
                                                
                                                <p class="uk-text-meta"></p>
                                            </div>
                                        </li>
                                     </a>
                                  

                                        
                                  

                                </div>
                                <!-- end::item card -->

                                <!--begin:: item modal-->
                                <div :id="'modal-sections'+item.itemID" uk-modal>
                                    <div class="uk-modal-dialog uk-margin-auto-vertical">
                                        <button
                                            class="uk-modal-close-default"
                                            type="button"
                                            uk-close
                                        ></button>
                                        <div class="uk-modal-header">
                                            <h2
                                                class="uk-modal-title"
                                                style="font-family: 'Montserrat', sans-serif;;font-size:1.3em"
                                            >{{ item.name }} (&#8377;{{ item.price }})</h2>
                                        </div>
                                        <div class="uk-modal-body uk-text-center">
                                            <p style="font-family: 'Montserrat', sans-serif;">
                                                <img
                                                    class="uk-border-circle uk-margin-small-right"
                                                    width="100"
                                                    height="40"
                                                    :src="item.image"
                                                >
                                                <br>
                                                <br>
                                                {{ item.description }}
                                            </p>
                                        </div>
                                        <div class="uk-modal-footer uk-text-center">
                                             <button class="uk-margin-small-left uk-button uk-button-default uk-button-small" style="font-family: 'Montserrat', sans-serif;;font-size:1em"  v-on:click.prevent="addToCart(item)" :id="'addmodal'+item.itemID" >
                                                      <a href="" class=""  uk-icon="cart"> Add To Cart &nbsp;</a>
                                                </button>   
                                        </div>
                                    </div>
                                </div>
                                <!--end:: item modal-->
                            </div>
                        </div>
                    </div>
                    <!-- end:: Category Heading and Items -->

                    <!-- begin::View cart button at bottom -->
                    <div class="col-md-12 animate-box text-center">
                        <p style="margin-top:20px;">
                            <a
                                href="#"
                                class="uk-button uk-button-primary"
                                data-toggle="modal"
                                data-target="#exampleModalLong"
                            >View Cart</a>
                        </p>
                    </div>
                    <!-- end::View cart button at bottom -->
                </div>
            </div>
        </div>

        <!-- begin::Button trigger modal -->
        <span style="color:black" id="mybutton" data-toggle="modal" data-target="#exampleModalLong">
            <span
                class="cart-notif"
                style="box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);"
            >{{ cart.length }}</span>
            <i class="car fa fa-shopping-bag"></i>
        </span>
        <!-- end::Button trigger modal -->

        <!-- begin::Modal -->
        <div  class="modal fade" style="text-align:center" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"  aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3
                            class="modal-title"
                            id="exampleModalLongTitle"
                            style="text-align:center !important"
                        >
                            Cart({{
                            cart.length }})
                        </h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div
                        class="modal-body"
                        style="box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);"
                    >
                        <!-- If cart is empty -->
                        <div v-if="!cart.length">
                            <div class="container" style="padding:40px;">
                                <h2>Your Cart Is Empty!</h2>
                            </div>
                        </div>
                        <!-- If cart Not empty -->
                        <ul
                            class="list pl0 mt0 measure center"
                            style="padding-top:40px;padding-bottom:40px;"
                        >
                            <li
                                class="flex items-center lh-copy pa3 ph0-l bb b--black-10"
                                v-for="item in cart"
                            >
                                <img class="w2 h2 w3-ns h3-ns br-100" :src="item.image">
                                <div class="pl3 flex-auto">
                                    <span class="f6 db black-70">{{ item.name }}</span>
                                    <span class="f6 db black-70">&#8377; {{item.price}}</span>
                                </div>

                                <div>
                                    <a class="f6 link blue hover-dark-gray" style="color:black">
                                        <button
                                            v-on:click="removeFromCart(item)"
                                            class="uk-button uk-button-small uk-button-default"
                                        >-</button>
                                        {{ item.quantity }}
                                        <button
                                            v-on:click="addToCart(item)"
                                            class="uk-button uk-button-small uk-button-default"
                                        >+</button>
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <!-- begin::input for customer pin -->
                        <div v-show="customer_pin_enabled">
                            <label for="customer_pin">Customer Pin - &nbsp;</label>
                            <input type="number" v-model.number="customer_pin" id="customer_pin">
                        </div>
                        <!-- end::input for customer pin-->
                    </div>

                    <!-- modalFooter -->
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="uk-button uk-button-small uk-button-secondary"
                            data-dismiss="modal"
                        >CLOSE</button>
                        <button
                            @click="checkout()"
                            id="lulz"
                            class="uk-button uk-button-small uk-button-default"
                        >CHECKOUT (&#8377;{{ sum }})</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end::Modal -->

        <!-- Snackbar -->
        <div id="snackbar" style="z-index:99999999">Added To Cart</div>

        <!-- endApp -->
    </div>
</template>

<script>
import VueFuse from "./VueFuse.vue";

import _ from "lodash";
import axios from "axios";
import api_endpoint from "../api_endpoint.js";
import Cookies from "js-cookie";

function showSnackbar(text, time) {
    // default value for time
    if (!time) {
        time = 1000;
    }
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = text;
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, time);

}


// For Django post requests
var csrftoken = Cookies.get("csrftoken");
axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

export default {
    name: "m",
    components: {
        //from search
        VueFuse
    },
    mounted() {
        //cartItems in localStorage
        if (localStorage.getItem("cart")) {
            try {
                this.cart = JSON.parse(localStorage.getItem("cart"));
            } catch (e) {
                localStorage.removeItem("cart");
            }
        }
        //sum in localStorage
        if (localStorage.getItem("sum")) {
            try {
                this.sum = JSON.parse(localStorage.getItem("sum"));
            } catch (e) {
                localStorage.removeItem("sum");
            }
        }
        // fetching menu items and filtering by category
        axios
            .post(api_endpoint.store)
            .then(
                response => (
                    (this.starter = response.data["items"]),
                    (this.type = _.uniqBy(this.starter, "category")),
                    (this.store_hashid = response.data["store_hashid"]),
                    (this.dish = response.data["items"]),
                    console.log(this)
                )
            );
        //store
        axios
            .post(api_endpoint.store)
            .then(
                response => (
                    (this.store_name = response.data["store_name"]),
                    (this.store_desc = response.data["store_description"]),
                    (this.back_image = response.data["cover_image"])
                )
            );
    },
    name: "men",
    data() {
        return {
            starter: [],
            cart: [],
            sum: 0,
            type: [],
            customer_pin_enabled: false,
            checkout_enabled: true,
            customer_pin: null,
            store_hashid: null,
            //from search
            results: [],
            dish: [],
            //store
            store_name: "",
            store_desc: "",
            back_image: ""
        };
    },
    watch: {
        cart: {
            handler: function() {
                if (this.cart.length > 0) {
                    this.customer_pin_enabled = true;
                } else {
                    this.customer_pin_enabled = false;
                }
            },
            deep: true
        }
    },
    methods: {
        //from search
        runSearch() {
            this.$search("John", this.dish, { keys: ["category"] }).then(
                result => {
                    this.results = result;
                }
            );
        },

        addToCart: function(item) {

            //animation add to cart 
            var anim = document.getElementById('add'+item.itemID);
            var data = anim.innerHTML;
            anim.innerHTML = "Adding ... ";
            anim.style.cursor = "no-drop";
            anim.disabled = true;
           
            setTimeout(function() 
            {
                anim.innerHTML = data;
                anim.className += "uk-margin-small-left uk-button uk-button-default uk-button-small";
                anim.style.cursor = "pointer";
                anim.disabled = false;
            },500);

             //animation add to cart modal 
            var animod = document.getElementById('addmodal'+item.itemID);
            var data = animod.innerHTML;
            animod.innerHTML = "Adding ... ";
            animod.style.cursor = "no-drop";
            animod.disabled = true;
           
            setTimeout(function() 
            {
                animod.innerHTML = data;
                animod.className += "uk-margin-small-left uk-button uk-button-default uk-button-small";
                animod.style.cursor = "pointer";
                animod.disabled = false;
            },500);

            setTimeout(function() 
            {
                showSnackbar("Added to cart", 1000);
               
            },500);
             


            

            if (this.cart.length === 0) {
                item.quantity += 1;
                this.sum = this.sum + item.price;
                this.cart.push(item);
            } else {
                var found = false;
                this.cart.forEach(element => {
                    if (element.itemID === item.itemID) {
                        element.quantity += 1;
                        this.sum = this.sum + item.price;
                        found = true;
                    }
                });

                if (found == false) {
                    item.quantity += 1;
                    this.sum = this.sum + item.price;
                    this.cart.push(item);
                }
            }
            // Saving item to cart
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);

            // Saving sum to localStorage After adding to cart
            const parse = JSON.stringify(this.sum);
            localStorage.setItem("sum", parse);

            
        },

        quantity: function(item) {
            var quant = 0;
            this.cart.forEach(element => {
                if (element.itemID == item.itemID) {
                    quant = element.quantity;
                }
            });

            return quant;
        },

        // for removing item from cart
        removeFromCart: function(item) {
            if (this.cart.length == 0) {
                return;
            } else {
                var found = false;
                this.cart.forEach(element => {
                    if (element.itemID === item.itemID) {
                        element.quantity -= 1;
                        this.sum = this.sum - item.price;
                        found = true;
                    }
                });
                if (found == false) {
                    item.quantity -= 1;
                    this.sum = this.sum - item.price;
                    this.cart.push(item);
                }
            }
            // removing item to cart
            this.removeZero();
            const parsed = JSON.stringify(this.cart);
            localStorage.setItem("cart", parsed);

            // deducting sum
            const parse = JSON.stringify(this.sum);
            localStorage.setItem("sum", parse);
        },

        // for removing items from cart when count = 0
        removeZero() {
            var newCart = [];
            this.cart.forEach(element => {
                if (element.quantity != 0) {
                    newCart.push(element);
                }
            });
            this.cart = newCart;
        },

        checkout: function() {
            /* Conditions for checkout:
                    1. No. of items should be more than zero
                    2. Show Customer PIN field, if 1 is true
                    3. Verify the PIN
                    4. Redirect to checkout successful page.
                    */

            if (this.cart.length > 0 && this.customer_pin) {
                showSnackbar("Placing your order...");
                document.getElementById("lulz").disabled = true;
                document.getElementById("lulz").style.cursor = "auto";

                axios
                    .post(api_endpoint.checkout, {
                        customer_pin: this.customer_pin,
                        order: JSON.stringify(this.cart),
                        store_hashid: this.store_hashid
                    })
                    .then(function(response) {
                        if (response.data === "customer_does_not_exist") {
                            showSnackbar(
                                "Incorrect Customer PIN. Please enter correct PIN.",
                                2000
                            );
                            document.getElementById("lulz").disabled = false;
                        } else if (response.data === "store_does_not_exist") {
                            showSnackbar(
                                "Okay this is weird. Store does not exist :("
                            );
                            document.getElementById("lulz").disabled = false;
                        } else if (response.data === "incorrect_store_hashid") {
                            showSnackbar(
                                "Hash ID of store is incorrect.",
                                2000
                            );
                        } else if (response.data.match("checkout_successful")) {
                            // They checkout was successful
                            showSnackbar("Order Placed successfully!", 2000);
                            document.getElementById("lulz").disabled = true;
                            document.getElementById("lulz").style.cursor =
                                "auto";

                            // Clear cart after order is placed
                            localStorage.setItem("cart", []);
                            localStorage.setItem("sum", 0);

                            // Redirect the page after 1 second
                            setTimeout(function() {
                                window.location.replace(response.data);
                            }, 1000);
                        } else {
                            console.log(response.data);
                            showSnackbar("Something unknown happened!", 1000);
                        }
                    })
                    .catch(function(response) {
                        console.log(response);
                        showSnackbar("Error in placing order!", 1000);
                    })
                    .then(function() {
                        // finally block
                    });
            } else if (this.cart.length == 0) {
                showSnackbar("Add something to cart first!", 1500);
            } else if (!this.customer_pin) {
                showSnackbar("Enter your Customer PIN", 2000);
            } else {
                showSnackbar(
                    "There is some problem with your cart :( Please order from reception.",
                    1500
                );
            }
        }
    },
    //from search
    created() {
        this.$on("results", results => {
            this.results = results;
        });
    }
};
</script>


<style>
h1 {
    font-family: "Montserrat", sans-serif;
}

.feedback {
    padding: 10px 20px;
}

.cart-notif {
    display: inline-block;
    position: relative;
    padding-left: 0px;
    width: 23px;
    height: 23px;
    top: -20px;
    right: -30px;
    border-radius: 100px;
    background: #ef413f;
    color: #fff;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
}

a {
    text-decoration: none !important;
    color: inherit;
}

#mybutton {
    position: fixed;
    bottom: 20px;
    right: 10px;
}

#mybuttontop {
    position: fixed;
    top: 20px;
    right: 10px;
}

.plus {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
    padding: 8px;

    border-radius: 50%;
    cursor: pointer;
}
/*from search*/
.search {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
    padding: 13px;
    font-size: 20px;

    color: white;
    cursor: pointer;
}

.center {
    margin: auto;
    text-align: center;
}

.fuse {
    position: sticky;
    top: 18px;
    left: 70px;
}

input:active body {
    display: none !important;
}
/* end search */
.col {
    border: 1px solid black;
}

.car {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
    padding: 20px;
    font-size: 40px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}

.search {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
    padding: 13px;
    font-size: 20px;

    color: white;
    cursor: pointer;
}

.starters {
    background: #fff;
    padding: 20px;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }
    to {
        bottom: 0;
        opacity: 0;
    }
}

.colorlib-menu,
.colorlib-services,
#colorlib-contact,
.colorlib-blog,
.colorlib-testimony,
#colorlib-contact,
.colorlib-about {
    padding: 7em 0;
    clear: both;
    position: relative;
}

@media screen and (max-width: 768px) {
    .colorlib-reservation,
    .colorlib-menu,
    .colorlib-services,
    #colorlib-contact,
    .colorlib-blog,
    .colorlib-testimony,
    #colorlib-contact,
    .colorlib-about {
        padding: 5em 0;
    }
}

h3 {
    font-family: "Montserrat", sans-serif;
}

.intro-heading {
    margin-bottom: 3em;
    position: relative;
}

.intro-heading h2 {
    font-size: 44px;
    font-weight: 400;
    line-height: 1.4;
    position: relative;
}

.intro-heading span {
    display: block;
    font-size: 18px;
    font-style: italic;
    margin-bottom: 10px;
    font-family: "Lora", Georgia, serif;
    color: #969696;
    font-weight: 400;
}

.intro-heading .icon {
    position: relative;
    padding: 0;
    line-height: 1.3;
}

.intro-heading .icon:after,
.intro-heading .icon:before {
    position: absolute;
    top: 51%;
    left: 0;
    right: 0;
    width: 400px;
    height: 1px;
    content: "";
    margin: 0 auto;

    z-index: -1;
}

@media screen and (max-width: 768px) {
    .intro-heading .icon:after,
    .intro-heading .icon:before {
        width: 250px;
    }
}

.intro-heading .icon:after {
    top: 48%;
    width: 300px;
}

@media screen and (max-width: 768px) {
    .intro-heading .icon:after {
        width: 180px;
    }
}

.intro-heading .icon i {
    font-size: 60px;
    padding: 0 20px;

    color: #b0b0b0;
}

.intro-heading .icon {
    position: relative;
    padding: 0;
    line-height: 1.3;
}

.intro-heading .icon:after,
.intro-heading .icon:before {
    position: absolute;
    top: 51%;
    left: 0;
    right: 0;
    width: 400px;
    height: 1px;
    content: "";
    margin: 0 auto;
    background: #e3e3e3;
    z-index: -1;
}

@media screen and (max-width: 768px) {
    .intro-heading .icon:after,
    .intro-heading .icon:before {
        width: 250px;
    }
}

.intro-heading .icon:after {
    top: 48%;
    width: 300px;
}

@media screen and (max-width: 768px) {
    .intro-heading .icon:after {
        width: 180px;
    }
}

.intro-heading .icon i {
    font-size: 60px;
    padding: 0 20px;
    background: #fbfbfb;
    color: #b0b0b0;
}

.nav-tabs {
    border: none;
    border-bottom: none;
    display: inline-block;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}

.nav-tabs li {
    margin: 0 auto;
    font-size: 20px;
    display: block;
    font-weight: 500;
}

@media screen and (max-width: 768px) {
    .nav-tabs li {
        font-size: 12px;
    }
}

.nav-tabs li a {
    border: none !important;
    border-bottom: none !important;
    background: transparent;
    color: #404044;
    border: 1px solid red;
    padding: 0;
    margin: 0 1em;
}

.nav-tabs li a:hover,
.nav-tabs li a:focus {
    background: transparent;
}

.nav-tabs li.active a {
    border: none !important;
    border-bottom: none !important;
    color: #404044 !important;
    background: transparent !important;
    position: relative;
}

.nav-tabs li.active a:after {
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    content: "";
    width: 100%;
    height: 2px;
    background: #ff6107;
    margin: 0 auto;
}

.tab-pane {
    padding: 2em 0;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}

.menu-dish {
    padding: 0 2em;
    margin: 0;
}

@media screen and (max-width: 768px) {
    .menu-dish {
        padding: 0;
    }
}

.menu-dish li {
    padding: 0;
    margin: 0;
    list-style: none;
    display: block;
    position: relative;
    padding: 10px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}

.menu-dish li:hover,
.menu-dish li:focus,
.menu-dish li.active {
    background: rgba(255, 255, 255, 0.1);
}

.menu-dish li .dish-entry,
.menu-dish li .text {
    display: table-cell;
    vertical-align: top;
}

.menu-dish li .dish-img {
    height: 70px;
    width: 70px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    border-radius: 50%;
}

.menu-dish li .text {
    padding-left: 20px;
}

.menu-dish li .text h3 {
    margin: 10px 0 10px 0;
    font-size: 16px;
    font-weight: 700;
}

@media screen and (max-width: 768px) {
    .menu-dish li .text h3 {
        margin-top: 0px;
    }
}

.menu-dish li .text .cat {
    color: #7d7d7d;
    font-size: 14px;
}

.menu-dish li .text .price {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 24px;
    color: #404044;
}

@media screen and (max-width: 480px) {
    .menu-dish li .text .price {
        right: 0;
        top: 0px;
        position: relative;
        display: block;
        margin-bottom: 0px;
    }
}

@media only screen and (max-width: 480px) {
    .pad {
        padding: 40px !important;
    }

    .hid {
        display: none;
    }
}

/* ---- 2.1 Defualt Buttons ---- */
.btn,
.btn-ghost,
.btn-ghost-light,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light,
.btn-text,
.btn-text-light,
.btn-light,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light {
    position: relative;
    display: inline-block;
    padding: 8px 38px;
    background: #111;
    color: #ececec;
    font-family: "Montserrat", "Open Sans", "Helvetica Neue", Helvetica,
        sans-serif;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-size: 0.9em;
    line-height: 1.8em;
    border-radius: 0;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

.btn_add {
    position: relative;
    display: inline-block;
    padding: 4px 8px;
    background: #111;
    color: #ececec;
    font-family: "Montserrat", "Open Sans", "Helvetica Neue", Helvetica,
        sans-serif;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-size: 0.9em;
    line-height: 1.8em;
    border-radius: 0;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

.btn:visited,
.btn-ghost:visited,
.btn-ghost-light:visited,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost-light:visited,
.btn-text:visited,
.btn-text-light:visited,
.btn-light:visited,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:visited,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:visited {
    color: #ececec;
    background: #111;
}

.btn_add:visited {
    color: #ececec;
    background: #111;
}

.btn:visited:hover,
.btn-ghost:visited:hover,
.btn-ghost-light:visited:hover,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost-light:visited:hover,
.btn-text:visited:hover,
.btn-text-light:visited:hover,
.btn-light:visited:hover,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost:visited:hover,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-light:visited:hover {
    color: #ececec;
    background: #3f3f3f;
}

.btn_add:visited:hover {
    color: #ececec;
    background: #3f3f3f;
}

.btn:hover,
.btn-ghost:hover,
.btn-ghost-light:hover,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover,
.btn-text:hover,
.btn-text-light:hover,
.btn-light:hover,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:hover,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:hover {
    color: #ececec;
    background: #3f3f3f;
}

.btn_add:hover {
    color: #ececec;
    background: #3f3f3f;
}

.btn:focus,
.btn-ghost:focus,
.btn-ghost-light:focus,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:focus,
.btn-text:focus,
.btn-text-light:focus,
.btn-light:focus,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:focus,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:focus {
    color: #ececec;
    outline: none;
}

.btn_add:focus {
    color: #ececec;
    outline: none;
}

/* ---- 2.2 Ghost Buttons ---- */
.btn-ghost,
.btn-ghost-light,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light {
    background: none;
    color: #111;
    border: 2px solid #111;
    overflow: hidden;
    z-index: 1;
}

.btn-ghost:after,
.btn-ghost-light:after,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:after {
    content: "";
    position: absolute;
    background: #111;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    -webkit-transition: top 0.3s;
    transition: top 0.3s;
    z-index: -1;
}

.btn-ghost:visited,
.btn-ghost-light:visited,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost-light:visited,
.btn-ghost:focus,
.btn-ghost-light:focus,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:focus {
    color: #111;
    text-decoration: none;
}

.btn-ghost:hover,
.btn-ghost-light:hover,
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover {
    color: #ececec;
    background: none;
}

.btn-ghost:hover:visited,
.btn-ghost-light:hover:visited,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost-light:hover:visited {
    color: #ececec;
    text-decoration: none;
}

.btn-ghost:hover:after,
.btn-ghost-light:hover:after,
.navbar
    .navbar-nav
    .dropdown
    .cart-dropdown
    .cart-btns
    .btn-ghost-light:hover:after {
    top: 0;
}

input[class="btn-ghost"]:hover {
    color: #ececec;
    background: #111;
}

input[class="btn-ghost"]:after {
    content: none;
}

/* ---- 2.3 Buttons Rounded ---- */
.btn-round {
    border-radius: 25px;
}

/* ---- 2.4 Text Buttons ---- */
.btn-text,
.btn-text-light {
    background: none;
    border: 2px solid rgba(17, 17, 17, 0);
    color: #777;
}

.btn-text:visited,
.btn-text-light:visited {
    color: #777;
    background: none;
}

.btn-text:visited:hover,
.btn-text-light:visited:hover {
    color: #111;
    background: none;
    border: 2px solid #111111;
}

.btn-text:hover,
.btn-text-light:hover {
    color: #111;
    background: none;
    border: 2px solid #111111;
}

.btn-text:focus,
.btn-text-light:focus {
    color: #111;
    outline: none;
    text-decoration: none;
}

/* ---- 2.5 Button Sizes ---- */
.btn-large {
    padding: 10px 54px;
    font-size: 1.1em;
    letter-spacing: 3px;
}

.btn-small {
    padding: 6px 33px;
    font-size: 0.75em;
}

/* ---- 2.6 Light Buttons ---- */
.btn-light {
    color: #111;
    background: #ececec;
}

.btn-light:visited {
    color: #111;
    background: #ececec;
}

.btn-light:visited:hover {
    color: #111;
    background: #bebebe;
}

.btn-light:hover {
    color: #111;
    background: #bebebe;
}

.btn-light:focus {
    color: #111;
}

.btn-ghost-light {
    z-index: 1;
    border-color: #ececec;
    color: #ececec;
}

.btn-ghost-light:after {
    background: #ececec;
}

.btn-ghost-light:hover {
    color: #111;
}

.btn-ghost-light:hover:visited {
    color: #111;
}

.btn-ghost-light:visited {
    color: #ececec;
}

input[class="btn-ghost-light"] {
    z-index: 1;
}

input[class="btn-ghost-light"]:hover {
    z-index: 1;
    color: #111;
    background: #ececec;
}

.btn-text-light {
    border: 2px solid rgba(235, 235, 235, 0);
}

.btn-text-light:visited:hover {
    color: #ececec;
    border: 2px solid #ebebeb;
}

.btn-text-light:hover {
    color: #ececec;
    border: 2px solid #ebebeb;
}

.btn-text-light:focus {
    color: #ececec;
}
</style>
