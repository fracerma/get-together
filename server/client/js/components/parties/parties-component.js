
export default{
    name: "parties",
    template:`
    <div class="parties-component">
        <router-link to="/" id="lateralbutton" class="btn bg-orange" style="color: white;"> Create Party </router-link>
        <div class="line">
            <div class="container-parties">
                <div id="bar" class="high-bar bg-yellow" >
                    <span> Your parties </span>
                </div>
                <div>
                    <div v-for="party in yourparties" class="parties-elements">
                        <router-link :to='"/parties/"+party.id' id="link">
                            <li> "{{party.name}}" on {{party.startDate.split("T")[0]}}</li>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="container-parties">
                <div id="bar" class="high-bar bg-red" >
                    <span> Parties you have been invited to </span>
                </div>
                <div>
                    <div v-for="party in otherparties" class="parties-elements">
                            <router-link :to='"/parties/"+party.id' id="link">
                                <li> "{{party.name}}" on {{party.startDate.split("T")[0]}}</li>
                            </router-link>
                    </div>
                </div>
            </div>

        </div>


    </div>
    `,
    data() {
        return {
            yourparties: null,
            otherparties: null
        }
    },
    beforeCreate() {
        fetch('/parties',{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.yourparties=data);

        fetch('/parties/other',{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.otherparties=data);
    }
}
