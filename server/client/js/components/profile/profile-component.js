import middleComp from "./middle-component.js";
import { bus } from "../../main.js";

export default {
  data() {
    return { section: "Profile" }
  },
  template: `
  <div>

      <div class="high-bar high-top">
          <h2 id="title">{{ section }}</h2>
        </div>
      <div class="high-bar high-left">
          <input   class="btn btn-primary leftB" type="button" value="Profile info" @click="switchComponent('infoComp')">
       
          <input class="btn btn-primary leftB" type="button" value="Friends" @click="switchComponent('friendsComp')">
      
          <input class="btn btn-primary leftB"  type="button" value="Notifications" @click="switchComponent('notComp')">

      </div>
      
      <middleComp class="middleComp"></middleComp>
      
  </div>
    `,
  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
      if (comp == 'infoComp')
        this.section = "Profile";
      if (comp == 'notComp')
        this.section = "Notifications";
      if (comp == 'friendsComp')
        this.section = "Friends";
    },
  },
  components: {
    middleComp
  },
}


