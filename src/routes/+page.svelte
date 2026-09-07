<script lang="ts">
	import { tables, type Table } from "$lib/tables";

	let query: string = $state("");
	const filteredTables = $derived(getFilteredTables());

	function getFilteredTables(): Table[] {
		if (!query) return tables;
		const q = query.toLowerCase();

		return tables.filter((t): boolean => {
			return !!t.guests.find((g) => g.toLowerCase().includes(q));
		});
	}
</script>

<section>
	<h1>Navan & Kia</h1>

	<input
		type="search"
		placeholder="Search for your name..."
		bind:value={query}
	/>

	<div class="tables">
		{#each filteredTables as t (t.number)}
			{@render table(t)}
		{/each}

		{#if !filteredTables.length}
			<p>No guest by that name was found.</p>
		{/if}
	</div>
</section>

{#snippet table(t: Table)}
	<div class="table">
		<h2>Table {t.number}</h2>

		{#each t.guests as g (g)}
			<span>{g}</span>
		{/each}
	</div>
{/snippet}

<style lang="scss">
	@use "$lib/styles/app";

	.tables {
		width: 100%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.table {
			width: 100%;
			margin-top: 16px;
			display: flex;
			flex-direction: column;

			h2 {
				color: app.$text;
				font-size: 1.15em;
				font-weight: 700;
			}
		}

		p {
			color: app.$text;
			font-size: 1em;
			margin-top: 16px;
		}
	}

	input[type="search"] {
		color: app.$text;
		font-size: 1em;
		width: 100%;
		max-width: 600px;
		margin-top: 16px;
		padding: 12px 16px;
		border: 1px solid #dddddd;
		border-radius: 4px;
	}

	h1 {
		color: app.$text-theme;
		font-family: "Liana";
		font-size: 2.5em;
		margin-top: 16px;
	}

	section {
		padding: 8px 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
