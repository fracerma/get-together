import friendComponent from "../../profile/friend-component.js"
export default{
    template:`
    <div class="friends-component">
        <div class="high-bar bg-blue">
                <span v-on:click="">Select your friends</span>
        </div>
        <div class="content">
                <friendComponent v-for="user in friends"
                    v-bind:user="user">
                </friendComponent>
        </div>
    </div>
    `,
    data() {
        return {
            friends:[
                {
                    id: 1,
                    firstName: "Francesco",
                    lastName: "Cermaria",
                    image: "https://scontent-fco1-1.xx.fbcdn.net/v/t1.0-9/s960x960/36580356_10216008996407325_6489365511724335104_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=pw_xW0WRSWwAX8PsyNQ&_nc_ht=scontent-fco1-1.xx&_nc_tp=7&oh=dcab30803a1f67b6b05ec83b7bd1928e&oe=5EE8A596"
                },
                {
                    id: 2,
                    firstName:"Michela",
                    lastName:"Capasso",
                    image: "https://scontent-fco1-1.xx.fbcdn.net/v/t31.0-8/p960x960/615319_3489952228039_2096343544_o.jpg?_nc_cat=106&_nc_sid=210fed&_nc_ohc=jJToQsxIU3UAX-CSUAK&_nc_ht=scontent-fco1-1.xx&_nc_tp=6&oh=4ef3451ec41929847090659c47ffb74b&oe=5EE8D894"
                },
                {
                    id:3,
                    firstName: "Riccardo",
                    lastName:"Casciotti",
                    image: "https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F71405101_156464868900136_7294168160803779704_n.jpg%3Foe%3D5EC56801%26oh%3Df22175a90dcd8fdbbc9ae99b109d0d4b&t=l&u=393917951250%40c.us&i=1573061309&n=Twt75PkQmKaMiXvkIwHWJD9QNOFUan5lk%2F4fjMMAimE%3D"
                },
                {
                    id: 1,
                    firstName: "Francesco",
                    lastName: "Cermaria",
                    image: "https://scontent-fco1-1.xx.fbcdn.net/v/t1.0-9/s960x960/36580356_10216008996407325_6489365511724335104_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=pw_xW0WRSWwAX8PsyNQ&_nc_ht=scontent-fco1-1.xx&_nc_tp=7&oh=dcab30803a1f67b6b05ec83b7bd1928e&oe=5EE8A596"
                },
                {
                    id: 2,
                    firstName:"Michela",
                    lastName:"Capasso",
                    image: "https://scontent-fco1-1.xx.fbcdn.net/v/t31.0-8/p960x960/615319_3489952228039_2096343544_o.jpg?_nc_cat=106&_nc_sid=210fed&_nc_ohc=jJToQsxIU3UAX-CSUAK&_nc_ht=scontent-fco1-1.xx&_nc_tp=6&oh=4ef3451ec41929847090659c47ffb74b&oe=5EE8D894"
                },
                {
                    id:3,
                    firstName: "Riccardo",
                    lastName:"Casciotti",
                    image: "https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F71405101_156464868900136_7294168160803779704_n.jpg%3Foe%3D5EC56801%26oh%3Df22175a90dcd8fdbbc9ae99b109d0d4b&t=l&u=393917951250%40c.us&i=1573061309&n=Twt75PkQmKaMiXvkIwHWJD9QNOFUan5lk%2F4fjMMAimE%3D"
                }
            ]
        }
    },
    components:{
        friendComponent
    }
}