import Position from '../../components/SettingItem/Position';
import Slider from '../../components/SettingItem/Slider';

export default function BookmarksSettings({ settings, setSetting }) {
	const setBookmarkName = (index, name) => setSetting('items')([
		...settings.items.slice(0, index),
		{ ...settings.items?.[index], name },
		...settings.items.slice(index + 1, settings.items.length)
	]);

	const setBookmarkLocation = (index, location) => setSetting('items')([
		...settings.items.slice(0, index),
		{ ...settings.items?.[index], location },
		...settings.items.slice(index + 1, settings.items.length)
	]);

	const newBookmark = () => setSetting('items')([
		...settings.items, { name: '', location: ''}
	]);

	const removeBookmark = (index) => setSetting('items')([
		...settings.items.slice(0, index),
		...settings.items.slice(index + 1, settings.items.length)
	]);

	const renderBookmarkInput = (bookmark, index) => (
		<div className='bookmark-input'>
			<input type="text" className='name' value={bookmark.name} onChange={e => setBookmarkName(index, e.target.value)} />
			<input type="text" className='location' value={bookmark.location} onChange={e => setBookmarkLocation(index, e.target.value)} />
			<button onClick={() => removeBookmark(index)}>remove</button>
		</div>
	);

	return (
		<>
			<Position
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<Slider
				title='columns'
				value={settings?.columns ?? 1}
				setValue={setSetting('columns')}
				min={1}
				max={4}
				step={1}
			/>

			<div className='item bookmarks'>
				<h2>Bookmarks</h2>

				{settings?.items?.map(renderBookmarkInput)}
				<button onClick={newBookmark}>add</button>
			</div>
		</>
	);
}
