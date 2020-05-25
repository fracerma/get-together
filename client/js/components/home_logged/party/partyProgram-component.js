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
            const timeStart=startTime.split(":");
            date.setHours(timeStart[0],timeStart[1]);
            this.party.startDate=date;
            if(finishTime){
                const timeFinish=finishTime.split(":");
                const finishDate= new Date(date);
                if(timeFinish[0]>=timeStart[0]) finishDate.setHours(timeFinish[0],timeFinish[1]);
                else {
                    finishDate.setDate(finishDate.getDate()+1);
                    finishDate.setHours(finishTime[0],finishTime[1]);
                }
                this.party.finishDate=finishDate;
            }
            if(this.partecipants.length==0) this.friendError="Select at least one friend";
            else this.$emit("next");
        }
    }
}