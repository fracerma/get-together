import friendComponent from "../../profile/friend-component.js"
export default{
    props:["partecipants"],
    template:`
    <div class="friends-component">
        <div class="high-bar bg-blue">
                <span v-on:click="">Select your friends</span>
        </div>
        <div class="content">
                <friendComponent v-for="user in friends"
                    v-bind:user="user"
                    v-on:invited="addInvited"
                    v-on:uninvited="removeInvited"
                    >
                </friendComponent>
        </div>
    </div>
    `,
    data() {
        return {
            friends:[]
        }
    },
    components:{
        friendComponent
    },
    methods: {
        addInvited: function(id){
            this.partecipants.push(id);
        },
        removeInvited: function(id){
            const index=this.partecipants.findIndex((o)=>{
                return o === id;
            })
            console.log(index);
            if (index !== -1) {
                    this.partecipants.splice(index, 1);
            }
        }
    },
    beforeCreate() {
        fetch(`/user/friend`,{
            method: "GET",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                    this.friends=data;
            }).catch(e=>{
                console.log(e);
            });
    }
}