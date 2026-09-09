<script lang="ts">
	import { tables, type Table } from "$lib/tables";
	import SearchSvg from "$lib/svgs/SearchSvg.svelte";

	let query: string = $state("");
	const filteredTables = $derived(getFilteredTables());

	function getFilteredTables(): Table[] {
		if (!query) return tables;
		const q = query.toLowerCase();

		return tables.filter((t): boolean => {
			return !!t.guests.find(isMatchingGuest);
		});
	}

	function isMatchingGuest(guest: string): boolean {
		if (!query) return false;
		return guest.toLowerCase().includes(query.toLowerCase());
	}
</script>

<section>
	<h1>Navan & Kia</h1>
	<span class="date">September 2026</span>

	<div class="search">
		<SearchSvg />

		<input
			type="search"
			placeholder="Type your name to find your table"
			bind:value={query}
		/>
	</div>

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

		<ul>
			{#each t.guests as g (g)}
				<li class={isMatchingGuest(g) ? "highlight" : ""}>{g}</li>
			{/each}
		</ul>
	</div>
{/snippet}

<style lang="scss">
	@use "$lib/styles/app";

	.tables {
		width: 100%;
		max-width: 980px;
		margin-top: 1.5rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;

		@media screen and (max-width: 860px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 560px) {
			grid-template-columns: repeat(1, 1fr);
		}

		.table {
			padding: 1.6rem 1.6rem 1.4rem;
			background-color: #ffffff;
			border: 1px solid app.$gold-light;
			border-radius: 0.75rem;
			display: flex;
			flex-direction: column;

			h2 {
				color: app.$text;
				font-size: 1.35em;
				font-weight: 700;
				margin-bottom: 1rem;
				padding-bottom: 0.85rem;
				border-bottom: 1px solid app.$gold-light;
			}

			ul {
				list-style-type: none;

				li {
					color: app.$text;
					font-size: 1rem;
					padding: 0.35rem 0;
					border-top: 1px dashed app.$gold-light;

					&.highlight {
						color: app.$text-theme;
					}

					&:first-of-type {
						border-top: none;
					}
				}
			}
		}

		p {
			color: app.$text;
			font-size: 1rem;
			margin-top: 1rem;
		}
	}

	.search {
		width: 100%;
		max-width: 600px;
		margin-top: 1rem;
		background-color: #ffffff;
		border: 1px solid app.$gold-light;
		border-radius: 1.75rem;
		display: flex;
		align-items: center;
		overflow: hidden;

		:global(svg) {
			height: 1em;
			width: 1em;
			margin-left: 1rem;
			fill: app.$text;
			flex: 0 0 auto;
		}

		input {
			color: app.$text;
			font-size: 1rem;
			padding: 0.75rem 1rem;
			background: transparent;
			flex: 1 1 auto;
		}
	}

	h1 {
		color: app.$text-theme;
		font-family: "Liana";
		font-size: 3.5rem;
		font-weight: 700;
		margin-top: 2rem;

		@media screen and (max-width: 560px) {
			font-size: 2.75rem;
		}
	}

	.date {
		color: app.$text-muted;
		font-size: 1rem;
		margin: 0.5rem 0 1rem;
	}

	section {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
