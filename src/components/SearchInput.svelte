<script lang="ts">
    import { fade } from 'svelte/transition';
    import {createEventDispatcher, onDestroy} from 'svelte';
    import {countriesStore} from "../stores/store.ts";

    const dispatch = createEventDispatcher();

    let countries = [];
    let uniqueRegions = new Set();

    const unsubscribe = countriesStore.subscribe((data) => {
        countries = data;
        uniqueRegions = new Set(data.map((country) => country.region));
    });

    onDestroy(() => {
        unsubscribe();
    });

    function selectRegion(region) {
        dispatch('regionSelected', region);
    }


    // Emit the search value to the parent component whenever it changes
    function handleSearch(event: Event) {
        searchValue = (event.target as HTMLInputElement).value;
        dispatch('search', { term: searchValue });
    }

    let isDropdownVisible = false;

    function toggleDropdown() {
        isDropdownVisible = !isDropdownVisible;
    }

    function closeDropdown() {
        isDropdownVisible = false;
    }

</script>

<div class="h-full flex flex-col sm:flex-row items-start justify-between w-full p-4">
    <form class="flex flex-1 items-center mb-4 sm:mb-0 justify-start">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input on:input={handleSearch} value={searchValue} type="text" id="simple-search" class="bg-gray-50 focus:outline-none shadow text-gray-800 text-sm rounded block pl-10 pr-4 py-2.5 dark:bg-[#2b3945] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for a country..." required />
        </div>
    </form>

    <div class="relative self-start sm:self-center">
        <button type="button" on:click={toggleDropdown} class="bg-white shadow text-gray-800 dark:text-gray-200 dark:bg-[#2b3945] hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-5 py-2 flex items-center">
            Filter by Region
            <svg class={`w-2.5 h-2.5 ml-3 transition-transform duration-200 ease-in-out ${isDropdownVisible ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
        {#if isDropdownVisible}
            <div class="absolute z-10 mt-1 w-44 bg-white rounded shadow dark:shadow-gray-900 dark:bg-[#2b3945]" transition:fade={{ duration: 100 }}>
                {#each Array.from(uniqueRegions) as region}
                <ul class="text-sm text-gray-800 dark:text-gray-200">
                    <li><button type="button" on:click={() => selectRegion(region)}>{region} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{region}</button></li>
                </ul>
                {/each}
            </div>
        {/if}
    </div>
</div>
