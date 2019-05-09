<template>
    <div>
        <div class="uk-child-width-1-1@s uk-light" uk-grid>
    <div>
        <div class="uk-background-top-right uk-background-cover uk-height-medium uk-panel" :style="{ backgroundImage: 'url(' + back_image + ')' }" style="background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; ">
     <div>
            <div uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky ; cls-inactive: uk-navbar-transparent uk-light; top: 200" style="	box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
                0 5px 15px 0 rgba(0,0,0,0.08);">
            <nav class="uk-navbar-container uk-margin" uk-navbar >
            <div class="uk-navbar-left uk-margin-small-left">
                    <a class="uk-navbar-toggle" href="#" uk-toggle="target: #offcanvas-nav" style="color:black">
                        <span uk-navbar-toggle-icon></span> <span class="uk-margin-small-left "></span>
                    </a>

                </div>
                <div class="uk-navbar-center">
                
                </div>
                <div class="nav-overlay uk-navbar-right">        
                    <div class="uk-navbar-right">
                        <a class="uk-navbar-toggle uk-margin-small-right" href="" uk-search-icon uk-toggle="target: #offcanvas-flip" style="color:black"></a>
                    </div>       
                </div>
            </nav>
    
            </div>
        <div>
             <h3 class="uk-text-center" style="font-family: 'Montserrat', sans-serif;color:white">{{ store_name }}</h3>
            <p class="uk-text-meta uk-text-center uk-text-uppercase" style="font-family: 'Montserrat', sans-serif;color:white">{{ store_desc }}</p>
         </div>
         </div>
        </div>
    </div>
  
</div>
  
    <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar uk-container uk-text-center">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Search</h3>

                    <div class="">
                        <VueFuse placeholder="Type Here To Search" event-name="results" :list="dish" :keys="['name']" />
                        <!--search results-->
                           <dl class="uk-description-list uk-margin-small-left uk-margin-small-right"  v-for="i in results">
                            <a href="#modals" uk-toggle>
                                <dt style="color:white">{{ i['name'] }}</dt>
                                <hr class="uk-divider-small uk-text-center">
                            </a>
                            
                            </dl>
                            
                            <div v-for="i in results">
                                 <div id="modals" uk-modal>
                                        <div class="uk-modal-dialog uk-margin-auto-vertical">
                                            <button class="uk-modal-close-default" type="button" uk-close></button>
                                            <div class="uk-modal-header">
                                                <h2 class="uk-modal-title" style="font-family: 'Montserrat', sans-serif;;font-size:1.3em">{{ i.name }} (&#8377;{{ i.price }})</h2>
                                            </div>
                                            <div class="uk-modal-body uk-text-center">
                                                
                                                <p style="font-family: 'Montserrat', sans-serif;">
                                                    <img class="uk-border-circle uk-margin-small-right" width="100"  height="40" :src="i.image" />
                                                    <br><br>
                                                    {{ i.description }}
                                                </p>
                                            </div>
                                            <div class="uk-modal-footer uk-text-center">
                                                <a href="tel:" class="uk-button uk-button-primary"
                                                       v-on:click.prevent="addToCart(i)">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                              
                            </div>
                    </div>

    </div>
</div>

         
           
    </div>
</template>
<script>
    import VueFuse from './VueFuse.vue';

    import _ from 'lodash';
    import axios from 'axios';
    import api_endpoint from '../api_endpoint.js';
    import Cookies from 'js-cookie';

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
    var csrftoken = Cookies.get('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

    export default {
        name: 'm',
        components:
            {
                //from search
                VueFuse
            },
        mounted() { 
            //cartItems in localStorage
            if (localStorage.getItem('cart')) {
                try {
                    this.cart = JSON.parse(localStorage.getItem('cart'));

                } catch (e) {
                    localStorage.removeItem('cart');
                }
            }
            //sum in localStorage
            if (localStorage.getItem('sum')) {
                try {
                    this.sum = JSON.parse(localStorage.getItem('sum'));

                } catch (e) {
                    localStorage.removeItem('sum');
                }
            }
            // fetching menu items and filtering by category
            axios.post(api_endpoint.store)
                .then(response => (this.starter = response.data["items"], this.type = _.uniqBy(this.starter, 'category'), this.store_hashid = response.data['store_hashid'], this.dish = response.data["items"]));
                //store
                 axios.post(api_endpoint.store)
                .then(response => (this.store_name = response.data["store_name"], this.store_desc = response.data["store_description"], this.back_image = response.data["cover_image"]));

        },
        name: 'men',
        data() {
            return {
                starter: [],
                cart: [],
                sum: 0,
                type: [],
                customer_pin_enabled: false,
                checkout_enabled: true,
                customer_pin:null,
                store_hashid: null,
                //from search
                results: [],
                dish: [],
                //store
                 store_name: '',
                store_desc: '',
                back_image: '',
                store_name: '',
                store_desc: '',
                back_image: ''

            }

        },
        watch: {
            cart: {
                handler: function() {
                    if(this.cart.length > 0) {
                        this.customer_pin_enabled = true;
                    }
                    else {
                        this.customer_pin_enabled = false;
                    }
                },
                deep:true
            }
        },
        methods:
            {
                //from search
                  runSearch() {
                    this.$search('John', this.dish, {keys: ['category']}).then(result => {
                    this.results = result
                     })
                },


                addToCart: function (item) {
                    showSnackbar("Added to cart", 1000);

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
                            item.quantity += 1
                            this.sum = this.sum + item.price;
                            this.cart.push(item);
                        }
                    }
                    // Saving item to cart
                    const parsed = JSON.stringify(this.cart);
                    localStorage.setItem('cart', parsed);

                    // Saving sum to localStorage After adding to cart
                    const parse = JSON.stringify(this.sum);
                    localStorage.setItem('sum', parse);
                },

                quantity: function (item) {
                    var quant = 0;
                    this.cart.forEach(element => {
                        if (element.itemID == item.itemID) {
                            quant = element.quantity
                        }
                    });

                    return quant;
                },

                // for removing item from cart
                removeFromCart: function (item) {
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
                            item.quantity -= 1
                            this.sum = this.sum - item.price;
                            this.cart.push(item);
                        }
                    }
                    // removing item to cart
                    this.removeZero();
                    const parsed = JSON.stringify(this.cart);
                    localStorage.setItem('cart', parsed);

                    // deducting sum
                    const parse = JSON.stringify(this.sum);
                    localStorage.setItem('sum', parse);
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
                   
                    if(this.cart.length > 0 && this.customer_pin) {
                        showSnackbar("Placing your order...");
                    document.getElementById("lulz").disabled = true;  
                    document.getElementById("lulz").style.cursor = "auto";

                        axios.post(api_endpoint.checkout, {
                            "customer_pin": this.customer_pin,
                            "order": JSON.stringify(this.cart),
                            "store_hashid": this.store_hashid
                        })
                            .then(function (response) {
                                if (response.data === "customer_does_not_exist") {
                                    showSnackbar("Incorrect Customer PIN. Please enter correct PIN.", 2000);
                                      document.getElementById("lulz").disabled = false;  
                    
                                }
                                else if(response.data === "store_does_not_exist") {
                                    showSnackbar("Okay this is weird. Store does not exist :(");
                                    document.getElementById("lulz").disabled = false;  
                                    
                                }
                                else if(response.data === "incorrect_store_hashid") {
                                    showSnackbar("Hash ID of store is incorrect.", 2000);
                                }
                                else if(response.data.match("checkout_successful")) {
                                    // They checkout was successful
                                    showSnackbar("Order Placed successfully!", 2000);
                                      document.getElementById("lulz").disabled = true;  
                                   document.getElementById("lulz").style.cursor = "auto";

                                    // Clear cart after order is placed
                                    localStorage.setItem('cart', []);
                                    localStorage.setItem('sum', 0);

                                    // Redirect the page after 1 second
                                    setTimeout(function () {
                                        window.location.replace(response.data);
                                    }, 1000);
                                }
                                else {
                                    console.log(response.data);
                                    showSnackbar("Something unknown happened!", 1000);
                                }

                            })
                            .catch(function (response) {
                                console.log(response);
                                showSnackbar("Error in placing order!", 1000);
                            })
                            .then(function () {
                                // finally block
                            });
                    }
                    else if(this.cart.length == 0) {
                        showSnackbar("Add something to cart first!", 1500);
                    }
                    else if(!this.customer_pin) {
                        showSnackbar("Enter your Customer PIN", 2000);
                    }
                    else {
                        showSnackbar("There is some problem with your cart :( Please order from reception.", 1500);
                    }
                },
            },
            //from search
      created() {
            this.$on('results', results => {
                this.results = results
            })
        }
    }
</script>



<style>

</style>
