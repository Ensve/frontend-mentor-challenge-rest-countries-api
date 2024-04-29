import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";
import nodeAdapter from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), tailwind()],
    output: "server",
    prefetch: true,
    adapter: nodeAdapter({
        mode: 'ssr'
    })
});
