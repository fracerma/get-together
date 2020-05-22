import recipesComponent from "./recipes-component.js"
import beersComponent from "./beers-component.js"
import cocktailsComponent from "./cocktails-component.js"
import winesComponent from "./wines-component.js"
import listComponent from "./list-component.js"

export default{
    props: ["party"],
    template: `
    <div class="party-component">
        <div>
        <a class="btn bg-orange" v-on:click="backStep" style="color: white;"> &#10094 Back </a>
        </div>
        <div class="items-conteiner">
            <div class="left-side">
                <recipesComponent v-on:addRecipe="addRecipe"></recipesComponent>
                <winesComponent v-on:addWine="addWine"></winesComponent>
                <beersComponent v-on:addBeer="addBeer"></beersComponent>
                <cocktailsComponent v-on:addCocktail="addCocktail"></cocktailsComponent>
            </div>
            <div class="right-side">
                <listComponent v-bind:list="party" v-on:reload="$emit('reload')"> </listComponent>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        //methods to add to the party an item
        addBeer: function(value){
            const index=this.party.beers.findIndex(x=>x.id===value.id);
            if(index==-1){
                value.quantity=1;
                this.party.beers.push(value);
            }
            else{
                this.party.beers[index].quantity++;
            }
        },
        addRecipe: function(value){
            const index=this.party.recipes.findIndex(x=>x.id===value.id);
            
            if(index==-1){
                value.quantity=1;
                this.party.recipes.push(value);
            }
            else{
                this.party.recipes[index].quantity++;
            }
        },
        addWine: function(value){
            const index=this.party.wines.findIndex(x=>x.id===value.id);
            console.log(this.party.wines);
            if(index==-1){
                value.quantity=1;
                this.party.wines.push(value);
            }
            else{
                this.party.wines[index].quantity++;
            }
            ;
            
        },
        addCocktail: function(value){
            const index=this.party.cocktails.findIndex(x=>x.cocktailID===value.cocktailID);
            if(index==-1){
                value.quantity=1;
                this.party.cocktails.push(value);
            }
            else{
                this.party.cocktails[index].quantity++;
            }
        },
        backStep: function(){
            this.$emit("back");
        }
    },
    components:{
        recipesComponent,
        beersComponent,
        cocktailsComponent,
        winesComponent,
        listComponent
    }
}