<script lang="ts">
    import { MoonSolid, SunSolid } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    let darkMode = false;

    onMount(() => {
        try {
            darkMode = localStorage.getItem('darkMode') === 'true';
            updateTheme();
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    });

    function toggleDarkMode() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode.toString());
        updateTheme();
    }

    function updateTheme() {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
</script>

<nav>
    <div class="fixed z-50 w-full h-[70px] flex justify-between items-center px-4 bg-[#F0F0F8] dark:bg-[#2b3945] dark:text-gray-200 text-gray-800 shadow-md shadow-gray-200 dark:shadow-gray-800">
        <div class="flex flex-row gap-4 items-center text-xl sm:text-3xl font-bold whitespace-nowrap overflow-hidden">
            <a href="/" class="truncate">
                <h1>Where in the world?</h1>
            </a>
        </div>
        <div class="flex flex-row items-center justify-center font-medium gap-1 whitespace-nowrap overflow-hidden">
            <button type="button" on:click={toggleDarkMode}>
                {#if darkMode}
                    <SunSolid class="w-6 h-6" />
                {:else}
                    <MoonSolid class="w-6 h-6" />
                {/if}
            </button>
            {#if darkMode}
                <p class="truncate">Light mode</p>
            {:else}
                <p class="truncate">Dark mode</p>
            {/if}
        </div>
    </div>
</nav>
