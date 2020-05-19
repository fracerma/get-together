export default{
    props: ["wine"],
    template: `
    <div class="item-component">
        <h5>{{wine.title}}</h5>
        <img v-bind:src="wine.imageUrl">
        <div>
            <p>{{wine.description}}
                <br>
                {{wine.price}}
            </p>
            
        </div>
        <a class="btn bg-red" v-on:click="addItem">Add to your party</a>
    </div>
    `,
    methods: {
        addItem: function(){
            this.$emit("addItem",this.wine);
        }
    },
}