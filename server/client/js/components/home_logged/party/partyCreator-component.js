import recipesComponent from "./recipes-component.js"
import beersComponent from "./beers-component.js"
import cocktailsComponent from "./cocktails-component.js"
import listComponent from "./list-component.js"

export default{
    template: `
    <div class="party-component">
        <div class="left-side">
            <recipesComponent></recipesComponent>
            <beersComponent></beersComponent>
            <cocktailsComponent></cocktailsComponent>
        </div>
        <div class="right-side">
            <listComponent v-bind:list="party"> </listComponent>
        </div>
    </div>
    `,
    data() {
        return {
            party:{
                recipes:[{
                    title: "Bucatini alla michi"
                }],
                wines: [{
                    title: "merlot grigio"
                }],
                cocktails: [{
                    name: "Long Islans"
                }
                ],
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
        cocktailsComponent,
        listComponent
    }
}