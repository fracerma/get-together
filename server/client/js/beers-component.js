Vue.component("beers-component",{
    props: ["beers"],
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-orange" v-on:click="openContent">
            <span>Select some beers</span>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <beer-component v-for="(beerIt, index) in beers"
                v-bind:beer="beerIt"
                v-bind:key="index"
                > </beer-component>
            </div>
        </transition>
        
        
    </div>
    `,
    data() {
        return {
            focused: true
        }
    },
    methods: {
        openContent: function() {
            this.focused=!this.focused;
        }
    }
});