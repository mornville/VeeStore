<template>

  <div class="ro">

      <div class="colorlib-menu" style="font-family: 'Montserrat', sans-serif;">
          <div class="container">		
              <!-- individualType with items -->		
                <div class="row">
                      <div class="col-md-12 animate-box" v-for="i in type">
                          <div class="row">
                              <div class="col-md-12 text-center">
                                  <!-- typeName -->
                                    <ul class="nav nav-tabs text-center" role="tablist" style="">
                                      <li role="presentation" class="active" style="text-transform:uppercase;"><a>{{ i.category }}</a></li>
                                    </ul>
                                  <!-- end -->
                              </div>
                              <!-- additonal Space hid on mobile -->
                                <div class="hid">
                                  <br><br>
                                </div>
                              <!-- end --> 
                          </div>
                          <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" id="main">
                                  <div class="row">
                                      <div class="col-md-6" v-for="item in starter"  v-if="item['category']==i['category']">
                                          <ul class="menu-dish" >
                                              <li>
                                                  <!-- dishImage -->
                                                  <figure class="dish-entry">
                                                    <div class="dish-img" style="background-image: url('static/store/VeeStore/assets/tikka.jpg');background-size:cover;background-repeat:no-repeat"></div>
                                                  </figure>
                                                  <!-- end -->

                                                  <!-- dishDescription -->
                                                  <div class="text">
                                                    <span class="price">&#8377; {{ item['price'] }}</span>
                                                    <h3>{{ item['name'] }}</h3>
                                                    <p class="cat" style="cursor:pointer" v-on:click.prevent="addToCart(item)">Add To Cart</p>
                                                  </div>
                                                  <!-- end  -->
                                              </li>
                                          </ul>
                                      </div>                          
                                  </div>
                                </div>
                              <hr><br><br>
                          </div>
                      </div>
                      <div class="col-md-12 animate-box text-center">
                        <p>Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                        <p><a href="#" class="btn btn-primary btn-outline btn-md" data-toggle="modal" data-target="#exampleModalLong">View Cart</a></p>
                      </div>
                </div>
          </div>
      </div>

      <!-- Button trigger modal -->
      <span style="color:black" id="mybutton" data-toggle="modal" data-target="#exampleModalLong"><span class="cart-notif" style="box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);">{{ cart.length }}</span><i class=" car fa fa-shopping-bag "></i></span>         
      <!-- Modal -->
      <div class="modal fade" style="text-align:center" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLongTitle"  style="text-align:center !important">Cart({{ cart.length }})</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>           
            </div>
          <div class="modal-body" style="box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);">
              <!-- If cart is empty --> 
              <div v-if="!cart.length">
                <div class="container" style="padding:40px;">
                  <h2>Your Cart Is Empty!</h2>
                </div>                   
              </div>   
              <!-- If cart Not empty -->            
              <ul class="list pl0 mt0 measure center" style="padding:40px">
                  <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10" v-for="item in cart"> 
                    <img class="w2 h2 w3-ns h3-ns br-100" src="static/store/VeeStore/assets/tikka.jpg" />
                      <div class="pl3 flex-auto">
                        <span class="f6 db black-70"> {{ item.name }}</span>
                          <span class="f6 db black-70">&#8377; {{item.price}}</span>
                      </div>
                      
                      <div>
                        <a  class="f6 link blue hover-dark-gray"><button v-on:click="removeFromCart(item)" class="btn_add">-</button> {{ item.quantity }} <button v-on:click="addToCart(item)" class="btn_add">+</button></a>
                      </div>
                  </li>  
              </ul>
            </div>
            
            <!-- modalFooter -->
            <div class="modal-footer">
              <button type="button" class="btn btn-small btn-round" data-dismiss="modal">BUY MORE?</button>
                <button class="btn-ghost btn-small btn-round">CHECKOUT (&#8377;{{ sum }})</button>
            </div>
                      
          </div>
        </div>
      </div>       

      <!-- Snackbar --> 
      <div id="snackbar">Added To Cart..</div>

      <search></search> 

      <!-- endApp --> 
  </div>

</template>

<script>
  import search from './search.vue';
  import _ from 'lodash';
  import axios from 'axios'; 

        export default 
        {
            name:'m',
            components:
             {
               search
             },   
            mounted() 
            {   
                //cartItems in localStorage
                if(localStorage.getItem('cart')) 
                {
                    try {
                        this.cart = JSON.parse(localStorage.getItem('cart'));
                        
                    }
                    catch(e) {
                        localStorage.removeItem('cart');
                    }
                }
                //sum in localStorage
                if(localStorage.getItem('sum')) 
                {
                    try {
                        this.sum = JSON.parse(localStorage.getItem('sum'));
                        
                    }
                    catch(e) {
                        localStorage.removeItem('sum');
                    }
                } 
                // fetching menu items and filtering by category  
                axios .get('https://api.jsonbin.io/b/5cb1f15826ddc84cea3e1de5/1')
                .then(response => (this.starter = response.data["items"],this.type = _.uniqBy(this.starter,'category')));
         
            },
            name:'men',
            data() 
            {
              return {
                    starter:[],
                    cart:[],
                    sum:0,
                    type:[],
              }
                
            },
            methods: 
            { 
                //addToCart
                addToCart: function(item) 
                {
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
                    if (this.cart.length == 0)
                    {
                        item.quantity += 1;
                        this.sum = this.sum + item.price;
                        this.cart.push(item);
                    }
                    else 
                    {
                        var found = false;
                        this.cart.forEach(element => 
                        {
                            if (element.itemID === item.itemID) 
                            {
                                element.quantity += 1;
                                this.sum = this.sum + item.price;
                                found = true;
                            }
                        });

                        if (found==false) 
                        {
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
                    
                quantity: function(item) 
                {
                    var quant = 0;
                    this.cart.forEach(element => 
                    {
                            if(element.itemID == item.itemID) 
                            {
                                quant = element.quantity
                            }
                    });
                    
                    return quant;
                },
               //removing from cart
                removeFromCart: function(item) 
                {
                    console.log("executing this!!");
                    if (this.cart.length == 0) 
                    {
                        return;
                    }
                    else 
                    {
                        var found = false;
                        this.cart.forEach(element => 
                        {
                            if (element.itemID === item.itemID) 
                            {                                   
                                  element.quantity -= 1;
                                  this.sum = this.sum - item.price;
                                  found = true;
                            }
                        });
                        if (found==false) 
                        {
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
                //for removing items from cart when quant = 0
                removeZero()
                {
                    var newCart = [];
                    this.cart.forEach(element => 
                    {
                        if(element.quantity != 0) 
                        {
                            newCart.push(element);
                        } 
                    });
                    this.cart = newCart;
                },
            //end methods    
            },
           
          }            
</script>


<style>
h1{
    font-family: 'Montserrat', sans-serif;
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
  background: #EF413F;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
}
a{
    text-decoration:none !important;
    color:inherit;
}
#mybutton {
  position: fixed;
  bottom:20px;
  right: 10px;
  
}
#mybuttontop {
  position: fixed;
  top:20px;
  right: 10px;
  
}
.plus{
      box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
            0 5px 15px 0 rgba(0,0,0,0.08);
    padding:8px;
    
    border-radius: 50%;
    cursor:pointer;
}
.col{
   border : 1px solid black; 
}
.car{
  box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);
    padding:20px;
    font-size:40px;
    background: white;
    border-radius: 50%;
    cursor:pointer;
    

}
.search{
  box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);
    padding:13px;
    font-size:20px;
   
   
    color:white;
    cursor:pointer;
    

}
.starters{
    background: #fff;
    padding:20px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
            0 5px 15px 0 rgba(0,0,0,0.08);
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
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
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
  position: relative; }
  @media screen and (max-width: 768px) {
    .colorlib-reservation,
    .colorlib-menu,
    .colorlib-services,
    #colorlib-contact,
    .colorlib-blog,
    .colorlib-testimony,
    #colorlib-contact,
    .colorlib-about {
      padding: 5em 0; } }
h3{
    font-family: 'Montserrat', sans-serif;
}
.intro-heading {
  margin-bottom: 3em;
  position: relative; }
  .intro-heading h2 {
    font-size: 44px;
    font-weight: 400;
    line-height: 1.4;
    position: relative; }
  .intro-heading span {
    display: block;
    font-size: 18px;
    font-style: italic;
    margin-bottom: 10px;
    font-family: "Lora", Georgia, serif;
    color: #969696;
    font-weight: 400; }
  .intro-heading .icon {
    position: relative;
    padding: 0;
    line-height: 1.3; }
    .intro-heading .icon:after, .intro-heading .icon:before {
      position: absolute;
      top: 51%;
      left: 0;
      right: 0;
      width: 400px;
      height: 1px;
      content: '';
      margin: 0 auto;
    
      z-index: -1; }
      @media screen and (max-width: 768px) {
        .intro-heading .icon:after, .intro-heading .icon:before {
          width: 250px; } }
    .intro-heading .icon:after {
      top: 48%;
      width: 300px; }
      @media screen and (max-width: 768px) {
        .intro-heading .icon:after {
          width: 180px; } }
    .intro-heading .icon i {
      font-size: 60px;
      padding: 0 20px;
      
      color: #b0b0b0; }.intro-heading .icon {
    position: relative;
    padding: 0;
    line-height: 1.3; }
    .intro-heading .icon:after, .intro-heading .icon:before {
      position: absolute;
      top: 51%;
      left: 0;
      right: 0;
      width: 400px;
      height: 1px;
      content: '';
      margin: 0 auto;
      background: #e3e3e3;
      z-index: -1; }
      @media screen and (max-width: 768px) {
        .intro-heading .icon:after, .intro-heading .icon:before {
          width: 250px; } }
    .intro-heading .icon:after {
      top: 48%;
      width: 300px; }
      @media screen and (max-width: 768px) {
        .intro-heading .icon:after {
          width: 180px; } }
    .intro-heading .icon i {
      font-size: 60px;
      padding: 0 20px;
      background: #FBFBFB;
      color: #b0b0b0; }
.nav-tabs {
  border: none;
  border-bottom: none;
  display: inline-block;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s; }
  .nav-tabs li {
    margin: 0 auto;
    font-size: 20px;
    display: block;
    font-weight: 500; }
    @media screen and (max-width: 768px) {
      .nav-tabs li {
        font-size: 12px; } }
    .nav-tabs li a {
      border: none !important;
      border-bottom: none !important;
      background: transparent;
      color: #404044;
      bordeR: 1px solid red;
      padding: 0;
      margin: 0 1em; }
      .nav-tabs li a:hover, .nav-tabs li a:focus {
        background: transparent; }
    .nav-tabs li.active a {
      border: none !important;
      border-bottom: none !important;
      color: #404044 !important;
      background: transparent !important;
      position: relative; }
      .nav-tabs li.active a:after {
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        content: '';
        width: 100%;
        height: 2px;
        background: #FF6107;
        margin: 0 auto; }.tab-pane {
  padding: 2em 0;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s; }
.menu-dish {
  padding: 0 2em;
  margin: 0; }
  @media screen and (max-width: 768px) {
    .menu-dish {
      padding: 0; } }
  .menu-dish li {
    padding: 0;
    margin: 0;
    list-style: none;
    display: block;
    position: relative;
    padding: 10px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s; }
    .menu-dish li:hover, .menu-dish li:focus, .menu-dish li.active {
      background: rgba(255, 255, 255, 0.1); }
    .menu-dish li .dish-entry, .menu-dish li .text {
      display: table-cell;
      vertical-align: top; }
    .menu-dish li .dish-img {
      height: 70px;
      width: 70px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      border-radius: 50%; }
    .menu-dish li .text {
      padding-left: 20px; }
      .menu-dish li .text h3 {
        margin: 10px 0 10px 0;
        font-size: 16px;
        font-weight: 700; }
        @media screen and (max-width: 768px) {
          .menu-dish li .text h3 {
            margin-top: 0px; } }
      .menu-dish li .text .cat {
        color: #7d7d7d;
        font-size: 14px; }
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
            margin-bottom: 0px; } }

@media only screen and (max-width: 480px) {

.pad{
	padding: 40px !important;
}
.hid{
	display:none;
}

}

/* ---- 2.1 Defualt Buttons ---- */
.btn, .btn-ghost, .btn-ghost-light, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light, .btn-text, .btn-text-light, .btn-light, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light {
  position: relative;
  display: inline-block;
  padding: 8px 38px;
  background: #111;
  color: #ececec;
  font-family: "Montserrat", "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 0.9em;
  line-height: 1.8em;
  border-radius: 0;
  -webkit-transition: all 0.5s;
          transition: all 0.5s;
}
.btn_add{
    position: relative;
  display: inline-block;
  padding: 4px 8px;
  background: #111;
  color: #ececec;
  font-family: "Montserrat", "Open Sans", "Helvetica Neue", Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 0.9em;
  line-height: 1.8em;
  border-radius: 0;
  -webkit-transition: all 0.5s;
          transition: all 0.5s;
}

.btn:visited, .btn-ghost:visited, .btn-ghost-light:visited, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:visited, .btn-text:visited, .btn-text-light:visited, .btn-light:visited, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:visited, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:visited {
  color: #ececec;
  background: #111;
}

.btn_add:visited{
  color: #ececec;
  background: #111;
}

.btn:visited:hover, .btn-ghost:visited:hover, .btn-ghost-light:visited:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:visited:hover, .btn-text:visited:hover, .btn-text-light:visited:hover, .btn-light:visited:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:visited:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:visited:hover {
  color: #ececec;
  background: #3f3f3f;
}

.btn_add:visited:hover {
  color: #ececec;
  background: #3f3f3f;
}

.btn:hover, .btn-ghost:hover, .btn-ghost-light:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover, .btn-text:hover, .btn-text-light:hover, .btn-light:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:hover {
  color: #ececec;
  background: #3f3f3f;
}

.btn_add:hover{
  color: #ececec;
  background: #3f3f3f;
}

.btn:focus, .btn-ghost:focus, .btn-ghost-light:focus, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:focus, .btn-text:focus, .btn-text-light:focus, .btn-light:focus, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost:focus, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-light:focus {
  color: #ececec;
  outline: none;
}
.btn_add:focus{
    color: #ececec;
  outline: none;
}
/* ---- 2.2 Ghost Buttons ---- */
.btn-ghost, .btn-ghost-light, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light {
  background: none;
  color: #111;
  border: 2px solid #111;
  overflow: hidden;
  z-index: 1;
}

.btn-ghost:after, .btn-ghost-light:after, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:after {
  content: '';
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
.navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:visited,
.btn-ghost:focus, .btn-ghost-light:focus, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:focus {
  color: #111;
  text-decoration: none;
}

.btn-ghost:hover, .btn-ghost-light:hover, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover {
  color: #ececec;
  background: none;
}

.btn-ghost:hover:visited, .btn-ghost-light:hover:visited, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover:visited {
  color: #ececec;
  text-decoration: none;
}

.btn-ghost:hover:after, .btn-ghost-light:hover:after, .navbar .navbar-nav .dropdown .cart-dropdown .cart-btns .btn-ghost-light:hover:after {
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
.btn-text, .btn-text-light {
  background: none;
  border: 2px solid rgba(17, 17, 17, 0);
  color: #777;
}

.btn-text:visited, .btn-text-light:visited {
  color: #777;
  background: none;
}

.btn-text:visited:hover, .btn-text-light:visited:hover {
  color: #111;
  background: none;
  border: 2px solid #111111;
}

.btn-text:hover, .btn-text-light:hover {
  color: #111;
  background: none;
  border: 2px solid #111111;
}

.btn-text:focus, .btn-text-light:focus {
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
