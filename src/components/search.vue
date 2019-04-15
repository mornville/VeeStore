<template>
    <section>

        <!-- Search -->
        <span style="color:black" id="mybuttontop" data-toggle="modal" data-target="#search"
              class=" btn btn-light btn-round"><i class=" fa fa-search "></i></span>


        <!-- Modal -->
        <div class="modal fade" style="text-align:center" id="search" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLongTitle" style="text-align:center !important">Search
                            Bar</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body"
                         style="box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),0 5px 15px 0 rgba(0,0,0,0.08);">
                        <div class="md:w-1/2 center bg-teal-light min-h-screen overflow-scroll">
                            <p class="text-grey-darkest px-12">Search For the Dish You Love <span
                                    class="fa fa-heart"> </span></p>
                            <div class="flex flex-col pt-8">
                                <VueFuse placeholder="Search :)" event-name="results" :list="dish" :keys="['name']"
                                         class="w-64 text-center h-8 border rounded-lg center"/>
                            </div>

                            <ul class="list pl0 mt0 measure center" style="padding:40px">
                                <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10" v-for="i in results"
                                    :key="i.name">
                                    <img class="w2 h2 w3-ns h3-ns br-100" :src="i.image"/>
                                    <div class="pl3 flex-auto">
                                        <span class="f6 db black-70"> {{ i.name }}</span>

                                    </div>

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </section>
</template>


<script>
    import VueFuse from './VueFuse.vue';
    import axios from 'axios';
    import api_endpoint from '../api_endpoint.js';
    import Cookies from 'js-cookie';

    // For Django post requests
    var csrftoken = Cookies.get('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

    export default {
        name: 'app',
        components: {
            VueFuse
        },
        mounted() {

            // fetching menu items
            axios.post(api_endpoint.store)
                .then(response => (this.dish = response.data["items"]));

        },
        data() {
            return {
                results: [],
                dish: [],

            }
        },
        methods: {
            runSearch() {
                this.$search('John', this.dish, {keys: ['category']}).then(result => {
                    this.results = result
                })
            }
        },
        created() {
            this.$on('results', results => {
                this.results = results
            })
        }
    }
</script>

<style scoped>
    .search {
        box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
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
</style>
