<template>
    <header class="tc pv4 pv5-ns pad mont" :style="{ backgroundImage: 'url(' + back_image + ')' }"
            style="background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; ">
        <img src="http://tachyons.io/img/logo.jpg" class="br3 ba b--black-10 h3 w3" alt="avatar"
             style="margin-bottom:40px">
        <h1 class="f5 f4-ns fw6 black-70 white mont" style="font-size:2em">{{ store_name }}</h1>
        <h2 class="f6 black-70 fw2 ttu white tracked mont" style="padding:10px;">{{ store_desc }}</h2>
    </header>

</template>
<script>
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import api_endpoint from "../api_endpoint.js";

    // For Django post requests
    var csrftoken = Cookies.get('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

    export default {
        mounted() {
            // fetching store name , desc, back image
            axios.post(api_endpoint.store)
                .then(response => (this.store_name = response.data["store_name"], this.store_desc = response.data["store_description"], this.back_image = response.data["cover_image"]));

        },
        data() {
            return {
                store_name: '',
                store_desc: '',
                back_image: ''
            }
        }
    }
</script>

<style scoped>
    .white {
        color: whitesmoke;
    }

    .pad {
        padding: 100px !important;
    }

    .mont {
        font-family: 'Montserrat', sans-serif !important;
    }

    @media only screen and (max-width: 480px) {

        .pad {
            padding: 40px !important;
        }

        .fw2 {
            display: none;
        }

    }
</style>

