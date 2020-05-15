import beerComponent from "./beer-component.js"
export default{
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-green" >
            <span v-on:click="openContent">Select some Cocktails</span>
            <input v-model="beer_name" placeholder="enter beer name" v-on:change="fetchBeer">
            <input v-model="food" placeholder="enter food name for pairing" v-on:change="fetchBeer">
            <input v-model="abv_lt" placeholder="enter alcool max" v-on:change="fetchBeer">
            <input v-model="abv_gt" placeholder="enter alcool min" v-on:change="fetchBeer">
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <beerComponent v-for="(beerIt, index) in beers"
                v-bind:beer="beerIt"
                v-bind:key="index"
                > </beerComponent>
            </div>
        </transition>
    </div>
    `,
    data() {
        return {
            focused: false,
            beers: null,
            beer_name: null,
            food: null,
            abv_gt: null,
            abv_lt: null
        }
    },
    methods: {
        openContent: function() {
            this.focused=!this.focused;
        },
        fetchBeer: function(){
            this.focused=true;
            const url= new URLSearchParams(Object.assign({},
                this.beer_name?{beer_name:this.beer_name}:null,
                this.food?{food:this.food}:null,
                this.abv_lt?{abv_lt:this.abv_lt}:null,
                this.abv_gt?{abv_gt:this.abv_gt}:null
                ));
            console.log(url.toString());
            
            fetch(`/api/beers?`+url.toString())
            .then(response => response.json())
            .then(data => this.beers=data.slice(0,4));
        }
    },
    beforeCreate() {
        fetch('/api/cocktails/random?number=4',{
            method: "GET"
        }).then(response => response.json())
        .then(data => this.cocktails=data);
    }
    ,
    components:{
        beerComponent
    }
}