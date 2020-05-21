export default{
    props: ["recipe","type","btn"],
    template: `
    <div class="item-component"> 
        <div v-if="openInfo" id="overlay"></div>
        <router-link :to="link">
            <h5>{{recipe.title}}</h5>
        </router-link>
        <img v-bind:src="recipe.image">
        <div>
            <p>
            <span v-if="!show" v-html="summaryShort"></span>
            <span class="show" v-if="!show" v-on:click="show=!show">(...)</span>
            <span v-if="show" v-html="summary"></span>
            </p>
        </div>
        <a v-if="btn=='add'" class="btn bg-blue" v-on:click="emitAdd">Add to your party</a>
        <a v-if="btn=='remove'" class="btn bg-blue" v-on:click="emitRemove">Delete recipe</a>
    </div>
    `,
    data() {
        return {
            openInfo: false,
            summaryShort: this.recipe.summary.substring(0,300)+this.recipe.summary.substring(300).split(".")[0]+".",
            summary: this.recipe.summary,
            show:false,
            link:"/recipes/"+this.recipe.id+"?type="+this.type
        }
    },
    methods: {
        emitAdd: function(){
            this.$emit("addItem",this.recipe);
        },
        emitRemove: function(){
            this.$emit("removeItem",this.recipe);
        }
    }
}