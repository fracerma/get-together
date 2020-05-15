export default{
    props: ["beer"],
    template: `
    <div class="item-component">
        <h5>{{beer.name}}</h5>
        <img v-bind:src="beer.image_url">
        <div>
            <p>{{beer.description}}</p>
        </div>
        <a class="btn bg-orange" href="#">Add to your party</a>
    </div>
    `
}