<template>
    <div class="portfolio">
        <h3>Portfolio</h3>
        <button class="btn btn-primary" @click.prevent="showCreatorModal">Add address</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" 
                :key="record.address"
                >
                    <td>{{record.name}}({{record.ticker}})</td>
                    <td>{{record.address}}</td>
                    <td>{{record.balance}}</td>
                    <td>
                        <span class="currency-controls">
                            <a href="#" @click.prevent="deleteRecord(record)">Delete</a>
                        </span>
                    </td>

                </tr>
            </tbody>
        </table>
        <address-creator ref="creator" v-on:create-address="saveNew"></address-creator>
    </div>
</template>
<script>
import api from '../api';
import AddressCreator from '../components/AddressCreator.vue';

export default {
    components: {AddressCreator},
    data() {
        return {
            records: []
        }
    },
    created() {
        this.refreshPortfolio(); 
    },
    methods: {
        refreshPortfolio() {
            api.getPortfolio().then(data => this.records = data);
        },
        showCreatorModal() {
            this.$refs['creator'].show();
        },
        saveNew(record) {
            api.createAddress(record).then(data => {
                this.refreshPortfolio();
                this.$refs['creator'].hide();
            });
        },
        deleteRecord(record) {
            if (confirm(`Are you sure you want to delete ${record.address} (${record.name})?`)) {
                api.deleteAddress(record).then(res => {
                    let index = this.records.indexOf(record);
                    this.records.splice(index, 1);
                });
            }
        }
    }
}
</script>
<style>
.currency-controls {visibility: hidden;}
tbody tr:hover .currency-controls {visibility: visible;}
    
</style>