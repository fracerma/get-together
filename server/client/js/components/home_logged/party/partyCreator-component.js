import recipesComponent from "./recipes-component.js"
import beersComponent from "./beers-component.js"
import cocktailsComponent from "./cocktails-component.js"

export default{
    template: `
    <div class="party-component">
        <recipesComponent></recipesComponent>
        <beersComponent></beersComponent>
        <cocktailsComponent></cocktailsComponent>
    </div>
    `,
    data() {
        return {
            party:{
                recipes:[],
                wines: [],
                cocktails: [],
                beers: [],
                partecipants: []
            }
        }
    },
    methods: {
        //methods to add to the party an item
        addParty: function(e){

        }
    },
    components:{
        recipesComponent,
        beersComponent,
        cocktailsComponent
    }
}