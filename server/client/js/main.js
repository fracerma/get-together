    import navBar from "./components/navBar.js"
    import profile from "./components/profile/profile-component.js"
    import recipes from "./components/recipes/recipesPage-component.js"
    import recipeInfo from "./components/recipes/recipeInfo-component.js"
    import parties from "./components/parties/parties-component.js"
    import homeComponent from "./components/home_logged/home-component.js";

    const router = new VueRouter({
        routes:[
            {path:"/",name:"Home", component: homeComponent },
            {path:"/_=_",redirect: '/'},
            {path:"/profile",name:"Profile", component: profile},
            {path:"/recipes",name:"Recipes", component: recipes},
            {path:"/recipes/:id",name:"RecipeInfo", component: recipeInfo},
            {path:"/parties",name:"Parties", component: parties}
        ]
      });
      
Vue.use(DatePicker);
var app = new Vue({
  el: "#app",
  data: {
    bannerImage: "../image/Principal.jpg",
  },
  components: {
    "nav-bar": navBar,
  },
  router,
});
