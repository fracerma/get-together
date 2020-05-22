import friendsComponent from "./friends-component.js"
import settingComponent from "./settingParty-component.js"
export default{
    props: ["party"],
    template:`
        <div class="partyProgram-component">
            <settingComponent v-on:next="nextStep" />
            <friendsComponent v-bind:error="friendError" v-bind:partecipants="partecipants"/>
        </div>
    `,
    data() {
        return {
            partecipants: this.party.partecipants,
            friendError: null
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
            if(this.partecipants.length==0) this.friendError="Select at least one friend";
            else this.$emit("next");
        }
    }
}