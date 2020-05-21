import friendsComponent from "./friends-component.js"
import settingComponent from "./settingParty-component.js"
export default{
    props: ["party"],
    template:`
        <div class="partyProgram-component">
            <settingComponent v-on:next="nextStep" />
            <friendsComponent v-bind:partecipants="partecipants"/>
        </div>
    `,
    data() {
        return {
            partecipants: this.party.partecipants
        }
    },
    components:{
        friendsComponent,
        settingComponent
    },
    methods: {
        nextStep: function(name,date,startTime,finishTime){
            this.party.name=name;
            this.party.startDate=date;
            this.party.finishDate=date;
            this.$emit("next");
        }
    }
}