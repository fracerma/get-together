import addFriendComp from "./add-friend-component.js"
import { bus } from "../../../main.js";

export default {
    props: ["user"],
    data() {
        return {
            friends: null,
            newFriend: "",
        }
    },
   watch: {
       newFriend: function(val){
          if( val ){
              setTimeout(() => { this.wait(val)},1000);
              
          }
       }
   },
    template: `
        <div class="content">
            <button v-on:click="switchComponent('friendsComp')" class="btn bg-blue" style="margin:10px">&#10094 Back </button>
            <h2>Search for a person to add to your friends:</h2>
            <input  v-model="newFriend" > 
            <div v-if="friends">
                <addFriendComp v-for="user in friends" v-bind:key="user.id"
                    v-bind:user="user">
                </addFriendComp>
            </div>
        </div>
    `,
    methods: {
        wait: function(value){
            if (this.newFriend == value) {
                this.search(this.newFriend);
                return;
            }
        },
        switchComponent: function(comp) {
            bus.$emit("switchComp", comp);
          },
        search: function(v){
                this.friends = null;
            fetch("/user/search?query=" + this.newFriend, {
                    credentials: "include",
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.friends = data;
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        },
    
    components: {
        addFriendComp
    },
}