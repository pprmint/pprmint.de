export async function getData(path: string, params: string) {
	const res = await fetch(`${process.env.STRAPI_API_URL}/${path}?${params}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
}
