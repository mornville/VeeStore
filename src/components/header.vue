<template>
<header class="tc pv4 pv5-ns pad mont" style="background-image:url('assets/menu.jpg'); background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; ">
  <img src="http://tachyons.io/img/logo.jpg" class="br3 ba b--black-10 h3 w3" alt="avatar" style="margin-bottom:40px">
  <h1 class="f5 f4-ns fw6 black-70 white mont" style="font-size:2em">{{ store_name}} MENU</h1>
  <h2 class="f6 black-70 fw2 ttu white tracked mont" style="padding:10px;">{{ store_desc }}</h2>
</header>

</template>
<script>
export default {
   props: ['store_name','store_desc']
}
</script>

<style scoped>
.white{
	color:whitesmoke;
}
.pad{
padding:100px !important;
}
.mont{
   font-family: 'Montserrat', sans-serif !important;
}

@media only screen and (max-width: 480px) {

.pad{
	padding: 40px !important;
}
.fw2{
	display:none;
}

}
</style>

