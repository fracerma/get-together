import middleComp from "./middle-component.js";
import { bus } from "../../main.js";

export default {
  data() {
    return { section: "Profile" };
  },
  template: `
  <div id="entire">

      <div class="high-bar high-top">
          <h2 id="title">{{ section }}</h2>
      </div>
      <div class="high-left">
          <button  class="btn btn-default leftB"  @click="switchComponent('infoComp')">Profile info</button>
       
          <button class="btn btn-default leftB"  @click="switchComponent('friendsComp')">Friends</button>
      
          <button class="btn btn-default leftB"  @click="switchComponent('notComp')">Notifications</button>
          <a href="/logout" type="button" class="btn-default logout leftB">Log out</a>

      </div>
      
      <middleComp class="middleComp"></middleComp>
      
  </div>
    `,
  methods: {
    switchComponent: function (comp) {
      bus.$emit("switchComp", comp);
      if (comp == "infoComp") this.section = "Profile";
      if (comp == "notComp") this.section = "Notifications";
      if (comp == "friendsComp") this.section = "Friends";
    },
    logout: function () {
      fetch("/logout", {
        credentials: "include",
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  components: {
    middleComp,
  },
};


