import { bus } from "../../../main.js";
export default {
    data() {
        return {
            profile: null,
            defaultImg: '../../image/no-profile-picture.jpg',
        };
    },
    created() {
        fetch('/user/info', {
            credentials: 'same-origin',
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.profile = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
  template: `
<div class="info" v-if="profile">
    <img id="profilePic" src='../../image/no-profile-picture.jpg'></img>
    <div class="data">
        <p>Nome: {{ profile.firstName }}</p>
        <p>Cognome: {{ profile.lastName }}</p>
        <p>E-mail: {{ profile.email }}</p>
    </div>
    <button id="" class="btn btn-primary leftB" type="button" value="Edit" @click="switchComponent('editComp')"></button>
</div>
    `,

    methods:{
        switchComponent(comp) {
            bus.$emit("switchComp", comp);
    }
    }

};
