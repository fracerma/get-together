import recipeComponent from "./recipe-component.js"
export default{
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-blue" >
            <span v-on:click="openContent">Select recipes</span>
            <input v-model="query" placeholder="search recipe name" v-on:change="fetchRecipe">
            
            <input v-model="diets" placeholder="diets type" v-on:change="fetchRecipe">
            <select v-model="cuisine" v-on:change="fetchRecipe">
                <option value="" selected disabled hidden>Choose here</option>
                <option label="None"></option>
                <option value="African">African</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Cajun">Cajun</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Chinese">Chinese</option>
                <option value="Eastern European">Eastern European</option>
                <option value="European">European</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Indian">Indian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Jewish">Jewish</option>
                <option value="Korean">Korean</option>
                <option value="Latin American">Latin American</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Nordic">Nordic</option>
                <option value="Southern">Southern</option>
                <option value="Spanish">Spanish</option>
                <option value="Thai">Thai</option>
                <option value="Vietnamese">Vietnamese</option>
            </select>
            <select v-model="intolerances" v-on:change="fetchRecipe">
                <option value="Dairy">Dairy</option>
                <option value="Egg">Egg</option>
                <option value="Gluten">Gluten</option>
                <option value="Grain">Grain</option>
                <option value="Peanut">Peanut</option>
                <option value="Seafood">Seafood</option>
                <option value="Sesame">Sesame</option>
                <option value="Shellfish">Shellfish</option>
                <option value="Soy">Soy</option>
                <option value="Sulfite">Sulfite</option>
                <option value="Tree Nut">Tree Nut</option>
                <option value="Wheat">Wheat</option>
             </select>
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
            focused: false,
            recipes: null,
            query:null,
            cuisine: null,
            diets: null,
            intolerances:null
        }
    },
    methods: {
        openContent: function() {
            this.focused=!this.focused;
        },
        fetchRecipe: function(){
            this.focused=true;
            const url= new URLSearchParams(Object.assign({},
                this.query?{query:this.query}:null,
                this.cuisine?{cuisine:this.cuisine}:null,
                this.diets?{diets:this.diets}:null,
                this.intolerances?{intolerances:this.intolerances}:null,
                {number: 4}
                ));
            fetch(`/api/recipes?`+url.toString())
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.recipes=data
            });
        }
    },
    beforeCreate() {
        fetch('/api/recipes/random?number=4',{
            method: "GET"
        }).then(response => response.json())
        .then(data => this.recipes=data);
    },
    components:{
        'recipe-component': recipeComponent
    }
};