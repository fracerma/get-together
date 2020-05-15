    import partyCreator from "./components/home_logged/party/partyCreator-component.js";
    import navBar from "./components/navBar.js"
    import profile from "./components/profile/profile-component.js"
    import recipes from "./components/recipes/recipes-component.js"
    import parties from "./components/parties/parties-component.js"

    const router = new VueRouter({
        routes:[
            {path:"/",name:"PartyCreator", component:partyCreator },
            {path:"/profile",name:"Profile", component: profile},
            {path:"/recipes",name:"Recipes", component: recipes},
            {path:"/parties",name:"Parties", component: parties}
        ]
      });

    var app=new Vue({
        el:"#app",
        data:{
            isAuthenticated: false
        },
        components:{
            "nav-bar":navBar
        },
        router
    });
