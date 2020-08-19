export default function Bookmark(props) {
	const url = props['*'];
	window.location.replace(url);
}
