import React from 'react';
import { useSelector } from 'react-redux';
import { selectWallpaper, selectIsMinimized } from './../../redux/settingsSlice';
import './Start.scss';
import Options from './../Options/Options';
import Clock from './../Clock/Clock';
// import DuckDuckGo from './../DuckDuckGo/DuckDuckGo';
import Bookmarks from './../Bookmarks/Bookmarks';
import IPInfo from './../IPInfo/IPInfo';

export default function Start() {
	const wallpaper = useSelector(selectWallpaper);
	const isMinimized = useSelector(selectIsMinimized);

	return (
		<main
			style={{
				backgroundImage: `url(${wallpaper})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center'
			}}
		>
			<div className='Start'>
				<Options />
				<div className={`minimizeable minimized-${isMinimized}`}>
					<Clock />
					{/* <DuckDuckGo /> */}
					<Bookmarks />
					<IPInfo />
				</div>

				{/* <input className='background-url' type='url' value={backgroundUrl} onChange={e => setBackgroundUrl(e.target.value)} /> */}
			</div>
		</main>
	);
}
