export default{
    props:["user"],
    template: `
        <div class="item-component">
            <div class="conteiner-component">
                <h5>{{firstName}} {{lastName}}</h5>
                <img v-bind:src="image">
                <div>
                    <p></p>
                </div>
                <a class="btn bg-blue" v-on:click="inviteToParty" v-on:mouseout="removeDelete" v-on:mouseover="deleteText" v-html="buttonText"></a>
            </div>
        </div>
    `,
    data() {
        return {
            id: this.user.id,
            image: this.user.image,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            buttonText:"Invite to party",
            invited: false
        }
    },
    methods: {
        inviteToParty: function() {
            if(!this.invited){
                this.buttonText="Invited &#10004";
                this.$emit("invited",this.id);
            }else{
                this.buttonText="Invite to party";
                this.$emit("uninvited",this.id);
            }
            this.invited=!this.invited;
        },
        deleteText: function(){
            if(this.invited){
                this.buttonText="Remove &#10006";
            }
        },
        removeDelete: function(){
            if(this.invited){
                this.buttonText="Invited &#10004";
            }
        }
    },
    props: ["user"],
    beforeMount() {
        console.log(this.image);
        if(this.image==null) this.image="https://loremflickr.com/320/240/food";
    }
}