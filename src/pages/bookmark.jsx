export default function Bookmark(props) {
	const url = props['*'];
	if (typeof window !== 'undefined') window.location.replace(url);
	return null;
}
