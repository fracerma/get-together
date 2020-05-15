export default{
    props: ["list"],
    template:`
    <div class="list-component">
        <h4> La tua lista </h4>
        <div class="section-list">
            <h5> Recipes: </h5>
            <ul>
                <li v-for="recipe in list.recipes">
                    {{recipe.title}}
                    <a> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Wines: </h5>
            <ul>
                <li v-for="wines in list.wines">
                    {{wines.title}}
                    <a> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Beers: </h5>
            <ul>
                <li v-for="beer in list.beers">
                    {{beer.name}}
                    <a> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Cocktails: </h5>
            <ul>
                <li v-for="cocktail in list.cocktails">
                    {{cocktail.name}}
                    <a> remove </a>
                </li>
            </ul>
        </div>
    </div>
    `
}