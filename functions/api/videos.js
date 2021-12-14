export async function onRequest() {
	const result = await fetch('https://api.baserow.io/api/database/rows/table/39830/?user_field_names=true', {
		headers: {
			'Authorization': 'Token kr310bJ19V2MF19P3fMiyo0lxhM9I7dh'
		}
	});
	const data = await result.json();

	const activeItems = data.results
		.filter(r => r.active)
		.map(r => ({
			id: r.videoID,
			image: r.image
		}));

	return new Response(JSON.stringify(activeItems));
}