export default{
    template:`
        <div class="settingParty-component">
            <div class="high-bar bg-orange">
                    <span v-on:click="">Setting up your party</span>
            </div>
            <div content
            <div>
                Select date: <br>
                 <DatePicker v-model="selectedDate" value-type="date" type="date" />
            </div>
            <div>
                Select time: <br>
                from <DatePicker v-model="selectedTimeStart" format="HH:mm" :minute-step="15" type="time">
                    <div slot="icon-calendar">
                    <svg id="Capa_1" enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                    </div>
                </DatePicker>
                to <DatePicker v-model="selectedTimeFinish" format="HH:mm" :minute-step="15" type="time">
                    <div slot="icon-calendar">
                    <svg enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                    </div>
                </DatePicker>
            </div>
        </div>
        `,
        data() {
            return {
                mode: 'single',
                selectedDate: null,
                selectedTimeStart: null,
                selectedTimeFinish: null
            }
        },
        components:{
            DatePicker
        },
        methods: {
            printDate: function(){
                console.log(this.selectedDate);
            }
        },
}