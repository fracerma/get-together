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
            this.party.date=date;
            this.party.startTime=startTime;
            this.party.finishTime=finishTime;
            this.$emit("next");
        }
    }
}