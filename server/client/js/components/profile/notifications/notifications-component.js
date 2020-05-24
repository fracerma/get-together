import notComp from './notification-component.js';

export default {
    props: ["notifications", "not"],
    template: `
    <div id="notifications" v-if="notifications" >
        <div >
            <notComp v-for="not in notifications" v-bind:not="not"></notComp>
        </div>
    </div>
    `,
    methods: {},
    mounted() {
        fetch('/notifications/all', {
            credentials: 'same-origin',
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                this.notifications = data;
                console.log(this.notifications);
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    },
    components: {
        notComp
    }
};
