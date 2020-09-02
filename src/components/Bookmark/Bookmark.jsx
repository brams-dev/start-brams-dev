import React from 'react';
import './Bookmark.scss';

export default function Bookmark({ name, href, show }) {	
	if (!show) return null;

	const url = new URL(href);

	return (
		<div className={`Bookmark umami--click--bookmark-${url.hostname}`}>
			<a href={href} target='__blank' rel='noopener'>
				<span className='image'>
					<img src={`https://api.faviconkit.com/${url.hostname}/24`} />
				</span>
				<span className='name'>
					{name}
				</span>
			</a>
		</div>
	);
}
