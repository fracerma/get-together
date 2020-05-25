import friendComp from "./friend-component.js"
import { bus } from "../../../main.js";

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
            credentials: 'include',
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
        <div id="addFriendDiv">
            <button id="addFriend" class="btn btn-primary" v-on:click="switchComponent('addFriendsComp')">Add a friend</button> 
        </div>
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
                credentials: 'include',
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
        },
        switchComponent: function (comp) {
            bus.$emit("switchComp", comp);
        },
    },
    components:{
        friendComp
    },
}