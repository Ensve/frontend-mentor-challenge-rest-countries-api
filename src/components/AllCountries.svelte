<script lang="ts">
    import { onMount } from 'svelte';
    import CountryCard from './CountryCard.svelte';
    import {fade} from 'svelte/transition';

    interface Country {
        flagUrl: string;
        name: string;
        population: number;
        region: string;
        capital: string;
        ccn3: string;
    }

    let allCountries: Country[] = [];
    let countries: Country[] = [];
    let searchQuery: string = "";
    let selectedRegion: string = "";
    let isDropdownVisible = false;

    onMount(async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        allCountries = data.map((country: any) => ({
            flagUrl: country.flags.svg,
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital ? country.capital[0] : 'No capital',
            ccn3: country.ccn3
        }));
        countries = allCountries;
    });

    function filterRegion(region: string) {
        selectedRegion = region;
        countries = selectedRegion ? allCountries.filter(c => c.region === selectedRegion) : allCountries;
        updateFilteredCountries();
        closeDropdown();
        console.log(selectedRegion);
    }

    function updateFilteredCountries() {
        let filtered = allCountries;
        if (selectedRegion) {
            filtered = filtered.filter(c => c.region === selectedRegion);
        }
        if (searchQuery) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
            searchQuery = "";
        }
        countries = filtered;
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            updateFilteredCountries();
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
    }

    function toggleDropdown() {
        isDropdownVisible = !isDropdownVisible;
    }

    function closeDropdown() {
        isDropdownVisible = false;
    }


</script>

<div class="h-full flex flex-col sm:flex-row items-start justify-between w-full p-4">
    <form class="flex flex-1 items-center mb-4 sm:mb-0 justify-start" on:submit={handleSubmit}>
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="simple-search" bind:value={searchQuery} class="bg-gray-50 focus:outline-none shadow text-gray-800 text-sm rounded block pl-10 pr-4 py-2.5 dark:bg-[#2b3945] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for a country..." required on:keypress={handleKeyPress} />
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
                <ul class="text-sm text-gray-800 dark:text-gray-200">
                        <li><button type="button" on:click={() => filterRegion('')} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">All</button></li>
                    {#each Array.from(new Set(allCountries.map(cRegion => cRegion.region))) as region}
                        <li><button type="button" on:click={() => filterRegion(region)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">{region}</button></li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>
<div class="h-full w-full px-4 py-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {#each countries as country}
            <CountryCard {country} />
        {/each}
    </div>
</div>
