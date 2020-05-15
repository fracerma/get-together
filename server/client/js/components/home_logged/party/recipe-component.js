
export default{
    props: ["recipe"],
    template: `
    <div class="item-component"> 
        <div v-if="openInfo" id="overlay"></div>
        <h5>{{recipe.title}}</h5>
        <img v-bind:src="recipe.image">
        <div>
            <p><span v-html="summary"></span></p>
        </div>
        <a class="btn bg-blue" href="#">Add to your party</a>
    </div>
    `,
    data() {
        return {
            openInfo: false,
            summary: this.recipe.summary.split("All things considered")[0]
        }
    }
}