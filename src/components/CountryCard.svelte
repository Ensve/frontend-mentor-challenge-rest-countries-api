<script lang="ts">
    export let country: any;
</script>

<div class="bg-gray-50 text-gray-800 dark:text-gray-200 dark:bg-[#2b3945] rounded-lg">
    <a href={`/country/${country.ccn3}`}>
        <img src={country.flagUrl} alt={`Flag of ${country.name}`} class="w-full h-40 object-cover rounded-t-lg">
        <div class="py-4 px-5 flex flex-col justify-start items-start gap-3">
            <h1 class="text-xl font-bold">{country.name}</h1>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
        </div>
    </a>
</div>
