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
    `
}