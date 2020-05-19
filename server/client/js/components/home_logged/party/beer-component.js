export default{
    props: ["beer"],
    template: `
    <div class="item-component">
        <h5>{{beer.name}}</h5>
        <img v-bind:src="beer.image_url">
        <div>
            <p>{{beer.description}}</p>
        </div>
        <a class="btn bg-yellow" v-on:click="emitAdd">Add to your party</a>
    </div>
    `,
    methods: {
        emitAdd: function(){
            this.$emit("addItem",this.beer);
        }
    },
}