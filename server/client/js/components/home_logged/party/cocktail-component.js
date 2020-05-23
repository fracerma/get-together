export default{
    props: ["cocktail","btn"],
    template: `
    <div class="item-component">
        <h5>{{cocktail.cocktailName}}</h5>
        <img v-bind:src="cocktail.photo">
        <div>
            <p>{{cocktail.instructions}}</p>
        </div>
        <a v-if="btn=='add'" class="btn bg-green" v-on:click="addItem">Add to your party</a>
        <a v-if="btn=='remove'" class="btn bg-green" v-on:click="addItem">Delete cocktail</a>
    </div>
    `,
    methods: {
        addItem: function(){
            this.$emit("addItem",this.cocktail)
        },
        emitRemove: function(){
            this.$emit("removeItem",this.cocktail);
        }
    },
}