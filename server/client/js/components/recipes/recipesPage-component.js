export default{
    template:`
    <div>
        <h1>Add your recipe:</h1>
        <form action="/recipes" method="post">
            Url:<input type="text" name="sourceUrl" id="">
            Tipo:<select name="dishTypes" id="">
                <option value="main course">Primo</option>
                <option value="appetaizer">Stuzzichino</option>
            </select>
            Cucina:<select name="cuisines" id="">
                <option value="italian">Italiana</option>
                <option value="american">Americana</option>
            </select>
            Dieta:<select name="diets" id="">
                <option value="vegetarian">Vegetariano</option>
            </select>
            Lingua: <input type="text" name="leng" id="">
            <input type="submit" value="Aggiungi">
        </form>
    </div>
    `,
    data() {
        return {
            myRecipes:[],
            othersRecipes: []
        }
    },
    methods: {
        fetchMyRecipes: function(){
            fetch("/recipes", {
                method: 'GET',
                credentials: 'include'
                })
            .then((response) => response.json())
            .then((json) => {
                this.recipes=json;
            }).catch((err) => {
                 console.log(err);
            });
        },
        fetchOtherRecipes: function(){
            fetch("/recipes/all", {
                method: 'GET',
                credentials: 'include'
                })
            .then((response) => response.json())
            .then((json) => {
                this.othersRecipes=json;
            }).catch((err) => {
                 console.log(err);
            }); 
        }
    },
     

        
}