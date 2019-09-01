import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = '382727eda67e30fc204b09cb52d59261';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        } catch (err) {
            alert(`${err}! Error ${query} not found!`);
        }
    }
}
//https://www.food2fork.com/api/search
//382727eda67e30fc204b09cb52d59261