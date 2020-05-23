export default{
    props: ["beer","btn"],
    template: `
    <div class="item-component">
        <h5>{{beer.name}}</h5>
        <img v-bind:src="beer.image_url">
        <div>
            <p>{{beer.description}}</p>
        </div>
        <a v-if="btn=='add'" class="btn bg-yellow" v-on:click="emitAdd">Add to your party</a>
        <a v-if="btn=='remove'" class="btn bg-yellow" v-on:click="emitAdd">Delete beer</a>
    </div>
    `,
    methods: {
        emitAdd: function(){
            this.$emit("addItem",this.beer);
        },
        emitRemove: function(){
            this.$emit("removeItem",this.beer);
        }
    },
}