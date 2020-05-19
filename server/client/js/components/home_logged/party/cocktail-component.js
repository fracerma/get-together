export default{
    props: ["cocktail"],
    template: `
    <div class="item-component">
        <h5>{{cocktail.cocktailName}}</h5>
        <img v-bind:src="cocktail.photo">
        <div>
            <p>{{cocktail.instructions}}</p>
        </div>
        <a class="btn bg-green" v-on:click="addItem">Add to your party</a>
    </div>
    `,
    methods: {
        addItem: function(){
            this.$emit("addItem",this.cocktail)
        }
    },
}