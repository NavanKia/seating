export const tables: Table[] = [
	{
		number: 1,
		guests: ["Navan Chawla", "Kia Shakiba"],
	},
	{
		number: 2,
		guests: ["John Smith", "Jane Smith"],
	},
	{
		number: 3,
		guests: ["John Smith", "Jane Smith"],
	},
];

export type Table = {
	number: number;
	guests: string[];
};
