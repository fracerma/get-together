export default{
    name: "party-component",
    template:`
    <div>
        <div class="title">{{party.name}}</div>
        <div class="principalcontent">
            <h3>
                <a id='about'> DATE: </a>
                <a id='value'>{{party.startDate.split("T")[0]}}</a>
             </h3>
            <h3>
                <a id='about'>FROM:</a>
                <a id='value'>{{party.startDate.split("T")[1].split(".")[0]}}</a>
            </h3>
            <h3>
                <a id='about'>TO: </a>
                <a id='value'>{{party.finishDate.split("T")[1].split(".")[0]}}</a>
            </h3>

            <h5>
                <a id='about'> OWNER: </a>
                <a id='value'> {{party.Users[0].firstName}}</a>
            </h5>
        </div>
    </div>
    `,
    data(){
        return{
            party:null
        }
    },
    created() {
        fetch('/parties/'+this.$route.params.id,{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.party=data);
    }
}
