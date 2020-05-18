import friendsComponent from "./friends-component.js"
import settingComponent from "./settingParty-component.js"
export default{
    template:`
        <div class="partyProgram-component">
            <settingComponent />
            <friendsComponent />
        </div>
    `,
    data() {
        return {
            mode: 'single',
            selectedDate: null,
            selectedTime: null
        }
    },
    components:{
        friendsComponent,
        settingComponent
    },
    methods: {
        printDate: function(){
            console.log(this.selectedDate);
        }
    },
}