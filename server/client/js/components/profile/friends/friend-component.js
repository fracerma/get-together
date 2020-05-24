export default {
    template: `
        <div class="item-component friend" v-if="reveal">
            <div class="conteiner-component">
                <h5>{{firstName}} {{lastName}}</h5>
                <img v-bind:src="image">
                <span v-if="user.status == 'pending'">Pending</span>
                <div class="bottomB">
                    <button class="btn btn-primary btn-view" @click="view">View profile</button>
                    <button class="btn btn-danger btn-remove" @click="remove">Remove friend</button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            image: this.user.image,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            id: this.user.id,
            reveal: true,
        }
    },
    methods: {
        view: function(){

        },
        remove: function(){
            if (confirm("Are you sure you want to remove " + this.firstName + " " + this.lastName + " from your friends?")){
                fetch('/friends/remove', {
                    credentials: 'same-origin',
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ friendId: this.id }),
                })
                    .then(response => response.json())
                    .then(data => {
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                this.reveal = false;
            }
        }
    },
    props: ["user"]
}