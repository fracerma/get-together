import partyItems from "./party/partyItems-component.js"
import partyProgram from "./party/partyProgram-component.js"
export default{
    template:`
        <div>
            <partyProgram v-on:next="nextStep" v-bind:party="party" v-show="state"> </partyProgram>
            <partyItems  v-on:back="nextStep" v-bind:party="party" v-show="!state"></partyItems>
        </div>
    `,
    data() {
        return {
            state:true,
            party:{
                name:null,
                date:null,
                startTime: null,
                finishTime: null,
                recipes:[],
                wines: [],
                cocktails: [],
                beers: [],
                partecipants: []
            }
        }
    },
    components:{
        partyItems,
        partyProgram
    },
    methods: {
        nextStep: function(){
            this.state=!this.state;
        }
    },

}