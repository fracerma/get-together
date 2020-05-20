export default{
    props: ["wine"],
    template: `
    <div class="item-component">
        <h5>{{wine.title}}</h5>
        <img v-bind:src="wine.imageUrl">
        <div>
            <p>
                <span v-if="!show">
                    {{descriptionShort}} <span class="show" v-on:click="show=!show">(...)</span>
                </span>
                <span v-if="show">
                    {{description}}
                </span>
                <br>
                {{wine.price}}
            </p>
            
        </div>
        <a class="btn bg-red" v-on:click="addItem">Add to your party</a>
    </div>
    `,
    data() {
        return {
            descriptionShort: this.wine.description.substring(0,300)+this.wine.description.substring(300).split(".")[0]+".",
            description: this.wine.description,
            show: false
        }
    },
    methods: {
        addItem: function(){
            this.$emit("addItem",this.wine);
        }
    },
}