import { bus } from "../../../main.js";
export default {
  data() {
    return {
      profile: null,
      image: "../../../../../image/no-profile-picture.jpg",
    };
  },
  created() {
    fetch("/user/info", {
      credentials: "include",
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.profile = data;
        if( !this.profile.image ){
          this.image=this.profile.image;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  template: `
<div class="info" v-if="profile">
    <img id="profilePic" v-bind:src='image'></img>
    <div class="leftInfo">
    <div class="data">
        <p>Nome: {{ profile.firstName }}</p>
        <p>Cognome: {{ profile.lastName }}</p>
        <p>E-mail: {{ profile.email }}</p>
    </div>
    <button id="" class="btn btn-primary editB"  @click="switchComponent('editComp')">Edit</button>
    </div>

</div>
    `,

  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
  },
};
