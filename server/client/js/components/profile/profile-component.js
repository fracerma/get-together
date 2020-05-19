export default{
    template: `
    <div>
        Loggedd innn!
        <div id="friend-conteinter">
        </div>
        <form action="user/friend" method="post">
            <input type="text" name="friendId" id="" placeholder="Id del tuo amico">
            <input type="submit" value="Aggiungi">
        </form>
    </div>
    `,
    methods: {
        getFriend: function(){
            fetch("user/friend", {
                    method: 'GET',
                    credentials: 'include'
                    })
                .then((response) => response.json())
                .then((json) => {
                   //TODO render friend
                }).catch((err) => {
                    console.log(err);
                });
        },
        //TODO da fare bene
        aggiungiAmico: function(){
            fetch("/user/accept", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                credentials: 'include', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friendId: null
                })
            }).then(response=>{
                console.log(response);
                getFriend();
            });
        }

    }
}