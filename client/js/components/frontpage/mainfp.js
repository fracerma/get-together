import navBar from "./nav.js"

var fp=new Vue({
    el:"#fp",
    data:{
        bannerImage:"../../../image/Principal.jpg",
        error: ""
    },
    components:{
        "nav-bar":navBar
    },
    methods: {
        login(e){
            e.preventDefault();
            const data={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: $("#emailform").val(),
                    password: $("#pswform").val()
                })
            }
            fetch("/login",data).then(response=>{
                if(response.status==400){
                     this.error=("Invalid email or password");
                     $("#pswform").val("");
                }
                else if (response.redirected) {
                    window.location.href = response.url;
                }
            })
        },
        register(e){
            e.preventDefault();
            const data={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    firstName: $("#firstnameform").val(),
                    lastName: $("#lastnameform").val(),
                    email: $("#emailform").val(),
                    password: $("#pswform").val()
                })
            }
            fetch("/register",data).then(response=>{
                if(response.status==400){
                     this.error=("Email already used");
                     $("#pswform").val("");
                     $("#emailform").val("");
                }
                else if (response.redirected) {
                    window.location.href = response.url;
                }
            })
        },
    },
});
