import notComp from './notification-component.js';

export default {
  props: ["notifications", "not"],
  template: `
    <div>
    <div id="notifications" v-if="notifications && notifications.length > 0" >
        <div >
            <notComp v-for="not in notifications" v-bind:not="not"></notComp>
        </div>
    </div>
    <div v-else="notifications.length == 0">
        <p>There are no notifications yet.</p>
    </div>
    </div>
    
    `,
  methods: {},
  mounted() {
    fetch("/notifications/all", {
      credentials: "include",
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.notifications = data;
        console.log(this.notifications);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      this.$root.$data.socket.on("newComment", (data) => {
        this.notifications.unshift(data);
      })
      this.$root.$data.socket.on("newInvitation", (data) => {
        this.notifications.unshift(data);
      })

      this.$root.$data.socket.on("newFriend", (data) => {
        console.log("ok")
        this.notifications.unshift(data);
      })

      this.$root.$data.socket.on("joined", (data) => {
        this.notifications.unshift(data);
      })

    this.$root.$data.socket.on("accept", (data) => {
        this.notifications.unshift(data);
      });
  },
  components: {
    notComp,
  },
};
