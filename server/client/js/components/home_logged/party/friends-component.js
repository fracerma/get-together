import friendComponent from "../../profile/friend-component.js"
export default{
    props:["partecipants","error"],
    template:`
    <div class="friends-component">
        <div class="high-bar bg-blue">
                <span v-on:click="">Select your friends</span>
        </div>
        <p class="error">{{error}}</p>
        <div class="content">
            
                <friendComponent v-for="user in friends"
                    v-bind:key="user.id"
                    v-bind:user="user"
                    v-on:invited="addInvited"
                    v-on:uninvited="removeInvited"
                    btn="add"
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
                    this.friends=data.filter(x=>x.status=="accepted");
            }).catch(e=>{
                console.log(e);
            });
    },
    watch: {
        error:function(val){
            this.errorText=val;
        }
    },  
}