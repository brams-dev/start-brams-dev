export async function onRequest(context) {
	// Contents of context object
	const {
		request, // same as existing Worker API
		env, // same as existing Worker API
		params, // if filename includes [id] or [[path]]
		waitUntil, // same as ctx.waitUntil in existing Worker API
		next, // used for middleware or to fetch assets
		data, // arbitrary space for passing data between middlewares
	} = context;

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