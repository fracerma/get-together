import partyItems from "./party/partyItems-component.js"
import partyProgram from "./party/partyProgram-component.js"
//COMPONENT PRINCIPALE DELLA HOME DEGLI UTENTI LOGGATI  
export default{
    name: "homeComponent",
    /*template che contiente i due component principali nella creazione di un party: 
       - partyProgram: per settare le informazioni principale (nome, data, ora)
                       e per selezionare gli amici da invitare al party
       - partyItems:   per cercare e poi selezionare le ricette, i vini, le birre e i cocktail
                       ottenuti dal database */
    template:`
        <div>
            <partyProgram v-on:next="nextStep" v-bind:party="party" v-show="state"> </partyProgram>
            <partyItems v-on:back="nextStep" v-on:reload="reload" v-bind:party="party" v-show="!state"></partyItems>
        </div>
    `,/* con la v-bind passo alle proprietà di entrami i component l'oggetto party che entrambi andranno a modificare
         con la v-show scelgo quale dei due far visualizzare, l'evento reload avviene quando ho finito la creazione di
            party e devo distruggere questo component */

    data() {
        return {
            state:true,
            party:{                 //oggetto principale che conterrà tutte le informazioni di un party
                name:null,          
                startDate:null,
                finishDate: null,
                recipes:[],
                wines: [],
                cocktails: [],
                beers: [],
                partecipants: []
            }
        }
    },
    components:{                  //components che uso
        partyItems,
        partyProgram
    },
    methods: {
        nextStep: function(){    //funzione per nascondere il primo component e vedere il secondo
            this.state=!this.state;
        },
        reload(){               // funzione per distruggere il component
            this.$destroy();
        }
    },

}