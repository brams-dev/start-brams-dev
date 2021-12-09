export default function Bookmarks(props) {
	console.log(props);

	const renderBookmark = bookmark => {
		let url;
		try {
			url = new URL(bookmark.location);
		} catch (error) {
			
		}

		return (
			<div className='bookmark'>
				<a href={bookmark.location} target='__blank'>
					{url && <img src={`https://external-content.duckduckgo.com/ip3/${url.hostname}.ico`} alt="" />}
					{bookmark.name}
				</a>
			</div>
		);
	};

	if (!props.items || props.items.length <= 0) return null;

	return (
		<div
			className='Bookmarks module'
			style={{
				'--columns': props?.columns ?? 1
			}}
		>
			{props.items.map(renderBookmark)}
		</div>
	);
}
