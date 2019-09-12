import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state
const state = {};

const cotrolSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render result on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert(`Something wrong with the search...`);
            clearLoader();
        }
        
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    cotrolSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {
    // 1. Get ID fro urk
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // 2. Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Hightlight selected search item 
        if (state.search) searchView.hightlightSelected(id);

        // 3. Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // 4. Get recipe data and pasre ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // 5. Calc serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6. Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Err processing recipe!');
        }    
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));