import Search from './models/Search';

// Global state
const state = {};

const cotrolSearch = async () => {
    // 1. Get query from view
    const query = 'pizza';

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for result

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render result on UI
        console.log(state.search.result);
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();

    cotrolSearch();
});