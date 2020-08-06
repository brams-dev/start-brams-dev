import React from 'react';
import { useSelector } from 'react-redux';
import './Bookmarks.scss';
import Bookmark from './../Bookmark/Bookmark';
import { selectBookmarks } from './../../redux/settingsSlice';

export default function Bookmarks() {
	const bookmarks = useSelector(selectBookmarks);

	return (
		<div className='Bookmarks'>
			{bookmarks.map(bookmark => (
				<Bookmark key={bookmark.name} {...bookmark} />
			))}
		</div>
	);
}
