export default{
    props: ["cocktail"],
    template: `
    <div class="item-component">
        <h5>{{cocktail.name}}</h5>
        <img v-bind:src="cocktail.image_url">
        <div>
            <p>{{cocktail.description}}</p>
        </div>
        <a class="btn bg-orange" href="#">Add to your party</a>
    </div>
    `
}