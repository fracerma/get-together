    import beersComponent from "./components/home_logged/beers-component.js";
    import navBar from "./components/navBar.js"
    import login from "./components/login/login.js"
    import profile from "./components/profile/profile.js"

    const router = new VueRouter({
        routes:[
            {path:"/",component: beersComponent},
            {path:"/login",name:"Login", component: login},
            {path:"/profile", component: profile},
        ]
      })

      router.beforeEach((to, from, next) => {
        if (to.name !== 'Login'&& to.name !== 'Login' && document.cookie.split("=")[0]!="sid") next({ name: 'Login' })
        else next()
      })

    var app=new Vue({
        el:"#app",
        data:{
            isAuthenticated: false
        },
        components:{
            "beers-component": beersComponent,
            "nav-bar":navBar
        },
        router
    });
