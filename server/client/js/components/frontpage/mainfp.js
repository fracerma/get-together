import navBar from "./nav.js"

var fp=new Vue({
    el:"#fp",
    data:{
        bannerImage:"../../../image/Principal.jpg"
    },
    components:{
        "nav-bar":navBar
    }
});
