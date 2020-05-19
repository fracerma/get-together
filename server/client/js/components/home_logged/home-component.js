import partyItems from "./party/partyItems-component.js"
import partyProgram from "./party/partyProgram-component.js"
export default{
    template:`
        <div>
            <partyProgram v-show="state"> </partyProgram>
            <partyItems v-show="!state"></partyItems>
        </div>
    `,
    data() {
        return {
            state:false
        }
    },
    components:{
        partyItems,
        partyProgram
    }

}