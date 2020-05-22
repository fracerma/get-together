import friendComponent from "../profile/friend-component.js"
import recipeComponent from "../home_logged/party/recipe-component.js"
import wineComponent from "../home_logged/party/wine-component.js"
import beerComponent from "../home_logged/party/beer-component.js"
import cocktailComponent from "../home_logged/party/cocktail-component.js"

export default{
    name: "party",
    template:`
    <div >
        <router-link to="/parties" id="lateralbutton" class="btn bg-orange" style="color: white;"> Back </router-link>
        <div class="all">
            <div class="title">{{party.name}}</div>
                <div class="info">
                    <div class="principalcontent">
                        <h3>
                            <a id='about'> DATE: </a>
                            <a id='value'>{{party.startDate.split("T")[0]}}</a>
                        </h3>
                        <h3>
                            <a id='about'>FROM:</a>
                            <a id='value'>{{party.startDate.split("T")[1].split(".")[0]}}</a>
                        </h3>
                        <h3>
                            <a id='about'>TO: </a>
                            <a id='value'>{{party.finishDate.split("T")[1].split(".")[0]}}</a>
                        </h3>

                        <h5>
                            <a id='about'> OWNER: </a>
                            <a id='value'> {{party.Users[0].firstName}}</a>
                        </h5>
                    </div>
                </div>

    
            <div class="middle">

                <div class="high-bar bg-lightsalmon" id="bar" > <span>Partecipants: </span></div>
                    <div class="part" >
                        <friendComponent id="it"v-for="user in party.Users" v-if="party.owner != user.id"
                            v-bind:key="user.id"
                            v-bind:user="user"
                            >
                        </friendComponent>
                    </div>

                <div class="high-bar bg-lightsalmon" id="bar" > <span> About: </span></div>
                <div class="aboutcontent">

                    <div class="ptrecipes">   
                        <div class="high-bar bg-moccasin" id="barsmall" > <span> Recipes: </span></div>
                        <recipeComponent id="it" v-for="recipe in party.apiRecipes" v-if="party.apiRecipes!=null"
                            v-bind:recipe="recipe"
                            v-bind:key="recipe.id"
                        >
                        </recipeComponent>
                    </div>

                    <div class="ptwines">   
                        <div class="high-bar bg-moccasin" id="barsmall" > <span> Wines: </span></div>
                        <wineComponent id="it" v-for="(wine, index) in party.wines" v-if="party.wines!=null"
                            v-bind:wine="wine"
                            v-bind:key="wine.id"
                        > 
                        </wineComponent>
                    </div>

                    <div class="ptbeers"> 
                        <div class="high-bar bg-moccasin" id="barsmall" > <span> Beers: </span></div>  
                        <beerComponent id="it" v-for="(beerIt, index) in party.beers" v-if="party.beers!=null"
                            v-bind:beer="beerIt"
                            v-bind:key="index"
                        > 
                        </beerComponent>
                    </div>

                    <div class="ptcocktail"> 
                        <div class="high-bar bg-moccasin" id="barsmall" > <span> Cocktail: </span></div> 
                        <cocktailComponent id="it" v-for="(cocktail, index) in party.cocktails" v-if="party.cocktails!=null"
                            v-bind:cocktail="cocktail"
                            v-bind:key="cocktail.cocktailID"
                        > 
                        </cocktailComponent> 
                    </div>

                </div>
            </div>



            <div class="down">
                <div class="high-bar bg-lightsalmon" id="bar" > <span>Comments: </span></div>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            party:null
        }
    },
    components:{
        friendComponent,
        recipeComponent,
        wineComponent,
        beerComponent,
        cocktailComponent
    },
    created() {
        fetch('/parties/'+this.$route.params.id,{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.party=data);
    }
}
