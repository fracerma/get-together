import friendComponent from "../profile/friend-component.js"
import recipeComponent from "../home_logged/party/recipe-component.js"
import wineComponent from "../home_logged/party/wine-component.js"
import beerComponent from "../home_logged/party/beer-component.js"
import cocktailComponent from "../home_logged/party/cocktail-component.js"

export default{
    name: "party",
    template:`
    <div>
        <div class="all">
    
        <router-link to="/parties" id="lateralbutton" class="btn bg-orange" style="color: white;">&#10094 Back </router-link>
        <div id="modifybutton">
            <rbutton v-show="party.isOwner" v-on:click="edit" >
                <svg class="bi bi-pencil"  viewBox="0 0 18 20"  xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                </svg>
            </button>
        </div>

        <div class="title" v-if="!modify">{{party.name}}</div>
        <div class="title" v-if="modify">
            <input type="text placeholder="{{party.name}}></input>
        </div>
        <div class="info">
            <h3 class="el">
                <a id='about'> 
                    <svg class="bi bi-calendar" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                    </svg>
                </a>
                <a id='value'>{{party.startDate.split("T")[0]}}</a>
            </h3>
            <h3 class="el">
                <a id='about'>
                    <svg class="bi bi-watch" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 14.333v-1.86A5.985 5.985 0 012 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86A5.985 5.985 0 0114 8a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H5.667C4.747 16 4 15.254 4 14.333zM13 8A5 5 0 103 8a5 5 0 0010 0z" clip-rule="evenodd"/>
                        <rect width="1" height="2" x="13.5" y="7" rx=".5"/>
                        <path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 010-1h1.5V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                    </svg> 
                </a>
                <a id='value'>{{party.startDate.split("T")[1].split(".")[0]}}</a>

                <a id='value'> to: </a>
                <a id='value'>{{party.finishDate.split("T")[1].split(".")[0]}}</a>
            </h3>

            <h3 class="el">
                <a id='about'>
                    <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>
                    </svg>
                </a>
                <a id='value'> {{party.Users[0].firstName}}</a>
            </h3>
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
                        btn="remove"
                    >
                    </recipeComponent>
                </div>

                <div class="ptwines">   
                    <div class="high-bar bg-moccasin" id="barsmall" > <span> Wines: </span></div>
                    <wineComponent id="it" v-for="(wine, index) in party.wines" v-if="party.wines!=null"
                        v-bind:wine="wine"
                        v-bind:key="wine.id"
                        btn="remove"
                    > 
                    </wineComponent>
                </div>

                <div class="ptbeers"> 
                    <div class="high-bar bg-moccasin" id="barsmall" > <span> Beers: </span></div>  
                    <beerComponent id="it" v-for="(beerIt, index) in party.beers" v-if="party.beers!=null"
                        v-bind:beer="beerIt"
                        v-bind:key="index"
                        btn="remove"
                    > 
                    </beerComponent>
                </div>

                <div class="ptcocktail"> 
                    <div class="high-bar bg-moccasin" id="barsmall" > <span> Cocktail: </span></div> 
                    <cocktailComponent id="it" v-for="(cocktail, index) in party.cocktails" v-if="party.cocktails!=null"
                        v-bind:cocktail="cocktail"
                        v-bind:key="cocktail.cocktailID"
                        btn="remove"
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
            party:null,
            modify:false
        }
    },
    components:{
        friendComponent,
        recipeComponent,
        wineComponent,
        beerComponent,
        cocktailComponent
    },
    beforeCreate() {
        fetch('/parties/'+this.$route.params.id,{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.party=data);
    },
    methods: {
        edit: function(event){
            if(event){
                if(this.modify==true) this.modify=false;
                else this.modify=true;
            }
        }
    }
}
