    var app=new Vue({
        el: "#app",
        data:{
            beers: [
                {
                    name: "Pilsen Lager",
                    description: "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
                    image_url: "https://images.punkapi.com/v2/4.png",
                    abv: 6.3
                },
                {
                    name: "Fake Lager",
                    description: "Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager – a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.",
                    image_url: "https://images.punkapi.com/v2/8.png",
                    abv: 4.7
                },
                {
                    name: "India Session Lager - Prototype Challenge",
                    description: "BrewDog’s level of dry-hop to a beer formed with a baseline of 100% pilsner malt – and at under 4.5% ABV – gives you a style that flirts at the edges of several others. Think aromas of fresh cut grass, nettle, white grape, melon, tangerine - with similar flavours leading to a dry, bitter finish.",
                    image_url: "https://images.punkapi.com/v2/keg.png",
                    abv: 4.4
                },
                {
                    name: "Black Tokyo Horizon (w/Nøgne Ø & Mikkeller)",
                    description: "Special Collaboration between Nøgne, Mikkeller and BrewDog which is a recipe based on all three brewers’ big stouts; Nøgne Ø Dark Horizon, Mikkeller Black and BrewDog Tokyo*.",
                    image_url: "https://images.punkapi.com/v2/159.png",
                    abv: 17.2
                }
            ],
            recipes: [
                {
                    title: "Cabbage Salad with Peanuts",
                    image: "https://spoonacular.com/recipeImages/723984-556x370.jpg",
                    readyInMinutes: 15,
                    servings: 2,
                    summary: "Buffalo Ranch Chicken Dip might be just the hor d'oeuvre you are searching for. This recipe makes 7 servings with <b>753 calories</b>, <b>27g of protein</b>, and <b>68g of fat</b> each. For <b>$2.44 per serving</b>, this recipe <b>covers 24%</b> of your daily requirements of vitamins and minerals. It can be enjoyed any time, but it is especially good for <b>The Super Bowl</b>. If you have sharp cheddar cheese, ranch dressing, green onions, and a few other ingredients on hand, you can make it. 356 people have tried and liked this recipe. It is a good option if you're following a <b>gluten free</b> diet. From preparation to the plate, this recipe takes around <b>45 minutes</b>.",
                    leng: "en",
                    type: "api_recipe"
                },
                {
                    title: "Stuffed Sweet Potato with Spinach, Hummus & Feta",
                    image: "https://spoonacular.com/recipeImages/584549-556x370.jpg",
                    readyInMinutes: 16,
                    summary: "Grilled Zucchini with Goat Cheese and Balsamic-Honey Syrup might be just the side dish you are searching for. This recipe serves 2 and costs $2.18 per serving. One serving contains <b>272 calories</b>, <b>8g of protein</b>, and <b>14g of fat</b>. This recipe is liked by 11132 foodies and cooks. It can be enjoyed any time, but it is especially good for <b>The Fourth Of July</b>. From preparation to the plate, this recipe takes about <b>45 minutes</b>. If you have balsamic vinegar, pepper, salt, and a few other ingredients on hand, you can make it. It is a good option if you're following a <b>gluten free and vegetarian</b> diet.",
                    servings: 1,
                    leng: "en",
                    type: "api_recipe"
                }
            ]
        },
        methods: {
            overlayComponent: function(event){
            }
        }
    });
