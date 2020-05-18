export default{
    template: `
        <div class="item-component">
            <div class="conteiner-component">
                <h5>{{firstName}} {{lastName}}</h5>
                <img v-bind:src="image">
                <div>
                    <p></p>
                </div>
                <a class="btn bg-blue" v-on:click="">Invite party</a>
            </div>
        </div>
    `,
    data() {
        return {
            image: this.user.image,
            firstName: this.user.firstName,
            lastName: this.user.lastName
        }
    },
    methods: {
        
    },
    props: ["user"]
}