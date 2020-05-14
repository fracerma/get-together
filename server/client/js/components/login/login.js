export default{
    template: `
    <form action="login" method="post">
        <label for="email">Email:</label>
        <input type="text" name="email" id="">
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="">
        <button type="submit">Login</button>
    </form>
    `
}