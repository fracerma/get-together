Vue.component("recipes-component",{
    props: ["recipes"],
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-blue" v-on:click="openContent">
            <span>Select recipes</span>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <recipe-component v-for="(recipeIt, index) in recipes"
                    v-bind:recipe="recipeIt"
                    v-bind:key="index+100"
                > </recipe-component>
            </div>
        </transition>
        
        
    </div>
    `,
    data() {
        return {
            focused: false
        }
    },
    methods: {
        openContent: function() {
            this.focused=!this.focused;
        }
    }
});