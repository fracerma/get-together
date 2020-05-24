import friendComp from "./friend-component.js"

export default {
    props: ["user"],
    data() {
        return {
            friends: null,
            newFriend:""
        }
    },
    created() {
        fetch('/user/friend', {
            credentials: 'same-origin',
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.friends = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    
   
    template: `
        <div class="content">
        <input  v-model="newFriend" v-on:keyup.enter="addFriend">
        <button v-on:click="addFriend">Add a friend</button> 
        <div v-if="friends">
            <friendComp v-for="user in friends"
                v-bind:user="user">
            </friendComp>
        </div>
        </div>
    `,
    methods: {
        addFriend: function(){
            fetch('/friends', {
                credentials: 'same-origin',
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': this.newFriend,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if( data ){
                        alert("Friend request sent!");
                    }
                    else 
                        alert("Sorry, user not found");
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    },
    components:{
        friendComp
    },
}