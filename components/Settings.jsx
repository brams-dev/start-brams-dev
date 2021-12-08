import React, { useEffect, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiArrowUpCircle, FiArrowDownCircle, FiEyeOff, FiEye } from 'react-icons/fi';

const INITIAL_SETTINGS = {
	general: {
		background: '/fern.webp',
		opacity: 0.5
	},
	order: [
		'clock',
		'astro',
		'todoist',
		'youtube'
	],
	positions: {
		clock: 'TOP_RIGHT',
		todoist: 'TOP_RIGHT'
	},
	visible: {
		clock: true,
		todoist: false,
		astro: true
	},
	clock: {
		shouldShowSeconds: false
	},
	todoist: {
		token: null
	},
	astro: {
		showSun: false,
		lat: '',
		long: ''
	},
	youtube: {
		volume: 0.2,
		videoId: '5qap5aO4i9A',
		showViewers: true,
		viewersUpdateInterval: 30000
	}
};

const YOUTUBE_SUGGESTIONS = [
	{
		id: '5qap5aO4i9A',
		image: 'https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg'
	},
	{
		id: 'DWcJFNfaw9c',
		image: 'https://i.ytimg.com/vi/DWcJFNfaw9c/hq720_live.jpg'
	},
	{
		id: 'L9Q1HUdUMp0',
		image: '/L9Q1HUdUMp0.png'
	},
	{
		id: 'zVqJv_dKUEs',
		image: 'https://i.ytimg.com/vi/zVqJv_dKUEs/hq720.jpg'
	},
	{
		id: 'Dx5qFachd3A',
		image: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAcrdR4Ftmjc-5yMqGmfAUOLwhFLA'
	},
	{
		id: 'DSGyEsJ17cI',
		image: 'https://i.ytimg.com/vi/DSGyEsJ17cI/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCWDI21MEk676eyaS7OetCwDbns-Q'
	},
	{
		id: '-5KAN9_CzSA',
		image: 'https://i.ytimg.com/vi/-5KAN9_CzSA/hq720.jpg'
	},
	{
		id: 'oKfYJYd0r5w',
		image: 'https://i.ytimg.com/vi/oKfYJYd0r5w/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCfiGXhpq3PxmLubi1FM14SFbIIrw'
	},
	{
		id: '-8etvVhgc6Q',
		image: 'https://i.ytimg.com/vi/-8etvVhgc6Q/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCgrEpTd1i0EGxZH5JuihtH7gAo0Q'
	},
	{
		id: '5X18D-EbjUc',
		image: 'https://i.ytimg.com/vi/5X18D-EbjUc/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5qf_Br31osySWg9XfiQJ9bOMZKw'
	},
	{
		id: 'JEuAYnjtJP0',
		image: 'https://i.ytimg.com/vi/JEuAYnjtJP0/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiuaMI7x-kPrFn4LMmtr-wuTa0gg'
	},
	{
		id: 'pZHCGAxRrq4',
		image: 'https://i.ytimg.com/vi/pZHCGAxRrq4/hqdefault_live.jpg?sqp=CJypxI0G-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAfTen_6eB4jOna43FJWUpDjRj7Tw'
	},
];

export default function Settings(props) {
	const [settings, setSettings] = useLocalStorage('settings', INITIAL_SETTINGS);
	const [showSettings, setShowSettings] = useState(false);
	const keyPressed = useKeyPress('s');
	const [activeMenuItem, setActiveMenuItem] = useState('general');

	useEffect(() => {
		if (keyPressed) setShowSettings(!showSettings);
	}, [keyPressed]);

	useEffect(() => {
		props.setSettings(settings);
	}, [settings]);

	const getGridHeight = () => {
		const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
		const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

		return 10 / width * height;
	};

	const setClockPosition = value => setSettings({ ...settings, positions: { ...settings.positions, clock: value } });
	const setTodoistPosition = value => setSettings({ ...settings, positions: { ...settings.positions, todoist: value } });
	const setAstroPosition = value => setSettings({ ...settings, positions: { ...settings.positions, astro: value } });
	const setYouTubePosition = value => setSettings({ ...settings, positions: { ...settings.positions, youtube: value } });
	const setShouldShowSeconds = value => setSettings({ ...settings, clock: { ...settings.clock, shouldShowSeconds: value } });
	const setBackground = value => setSettings({ ...settings, general: { ...settings.general, background: value } });
	const setOpacity = value => setSettings({ ...settings, general: { ...settings.general, opacity: value } });
	const setTodoistToken = value => setSettings({ ...settings, todoist: { ...settings.todoist, token: value } });
	const setAstroLat = value => setSettings({ ...settings, astro: { ...settings.astro, lat: value } });
	const setAstroLong = value => setSettings({ ...settings, astro: { ...settings.astro, long: value } });
	const setYouTubeVideoId = value => setSettings({ ...settings, youtube: { ...settings.youtube, videoId: value } });
	const setYouTubeVolume = value => setSettings({ ...settings, youtube: { ...settings.youtube, volume: value } });
	const setYouTubeShowViewers = value => setSettings({ ...settings, youtube: { ...settings.youtube, showViewers: value } });
	const setYouTubeViewersUpdateInterval = value => setSettings({ ...settings, youtube: { ...settings.youtube, viewersUpdateInterval: value } });
	const changeOrder = (title, currentPos, direction) => {
		if (direction === 'up' && currentPos <= 0) return null;
		if (direction === 'down' && currentPos >= settings.order.length) return null;

		const desiredPos = direction === 'up' ? currentPos - 1 : currentPos + 1;
		
		const newOrder = settings.order.slice();
		newOrder[currentPos] = newOrder[desiredPos];
		newOrder[desiredPos] = title;
		setSettings({ ...settings, order: newOrder });
	};
	const setComponentVisibility = title => setSettings({ ...settings, visible: { ...settings.visible, [title]: !settings.visible?.[title] }});
	
	if (!showSettings) return null;

	const renderGeneralSettings = () => activeMenuItem === 'general' ? (
		<>
			<div className='item background'>
				<h2>Background</h2>
				<input type='text' value={settings.general.background} onChange={e => setBackground(e.target.value)} />
			</div>

			<div className='item opacity'>
				<h2>Opacity</h2>
				<span>{Math.round(settings.general.opacity * 100)}%</span>
				<input
					type='range'
					min='0'
					max='100'
					step={5}
					value={settings.general.opacity * 100}
					onChange={e => setOpacity(e.target.value / 100)}
				/>
			</div>

			<div className='item component-order'>
				<h2>Order</h2>
				<div className='order-items'>
					{settings.order.map((title, key) => (
						<div className={`order-item ${!settings.visible?.[title] ? 'hidden' : ''}`} key={title}>
							{title}
							<span className='actions'>
								{key === 0 ? <span className='icon filler'></span> : <FiArrowUpCircle className='icon' onClick={() => changeOrder(title, key, 'up')} />}
								{key === settings.order.length - 1 ? <span className='icon filler'></span> : <FiArrowDownCircle className='icon' onClick={() => changeOrder(title, key, 'down')} />}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	) : null;

	const renderClockSettings = () => activeMenuItem === 'clock' ? (
		<>
			<div className='item position'>
				<h2>Position</h2>
				<div
					className={'position-grid'}
					style={{
						width: '10rem',
						height: getGridHeight() + 'rem'
					}}
				>
					{props.POSITIONS.map(POS => (
						<div
							key={`clock-${POS}`}
							className={JSON.stringify(settings.positions.clock) === JSON.stringify(POS) ? 'selected' : ''}
							onClick={() => setClockPosition(POS)}
						></div>
					))}
				</div>
			</div>

			<div className='item yes-no'>
				<h2>Show seconds</h2>
				<div onClick={() => setShouldShowSeconds(!settings.clock.shouldShowSeconds)}>
					<span
						className={settings.clock.shouldShowSeconds ? 'selected' : ''}
					>
						Yes
					</span>
					{' / '}
					<span
						className={!settings.clock.shouldShowSeconds ? 'selected' : ''}
					>
						No
					</span>
				</div>
			</div>
		</>
	) : null;

	const renderTodoistSettings = () => activeMenuItem === 'todoist' ? (
		<>
			<div className='item position'>
				<h2>Position</h2>
				<div
					className={'position-grid'}
					style={{
						width: '10rem',
						height: getGridHeight() + 'rem'
					}}
				>
					{props.POSITIONS.map(POS => (
						<div
							key={`todoist-${POS}`}
							className={JSON.stringify(settings.positions.todoist) === JSON.stringify(POS) ? 'selected' : ''}
							onClick={() => setTodoistPosition(POS)}
						></div>
					))}
				</div>
			</div>

			<div className='item todoist-token'>
				<h2>Token</h2>
				<input type='password' value={settings.todoist.token} onChange={e => setTodoistToken(e.target.value)} />
			</div>
		</>
	) : null;

	const renderAstroSettings = () => activeMenuItem === 'astro' ? (
		<>
			<div className='item position'>
				<h2>Position</h2>
				<div
					className={'position-grid'}
					style={{
						width: '10rem',
						height: getGridHeight() + 'rem'
					}}
				>
					{props.POSITIONS.map(POS => (
						<div
							key={`astro-${POS}`}
							className={JSON.stringify(settings.positions.astro) === JSON.stringify(POS) ? 'selected' : ''}
							onClick={() => setAstroPosition(POS)}
						></div>
					))}
				</div>
			</div>

			<div className='item astro-lat'>
				<h2>Latitude</h2>
				<input type='text' value={settings.astro.lat} onChange={e => setAstroLat(e.target.value)} />
			</div>

			<div className='item astro-long'>
				<h2>Longitude</h2>
				<input type='text' value={settings.astro.long} onChange={e => setAstroLong(e.target.value)} />
			</div>
		</>
	) : null;

	const renderYouTubeSettings = () => activeMenuItem === 'youtube' ? (
		<>
			<div className='item position'>
				<h2>Position</h2>
				<div
					className={'position-grid'}
					style={{
						width: '10rem',
						height: getGridHeight() + 'rem'
					}}
				>
					{props.POSITIONS.map(POS => (
						<div
							key={`youtube-${POS}`}
							className={JSON.stringify(settings.positions.youtube) === JSON.stringify(POS) ? 'selected' : ''}
							onClick={() => setYouTubePosition(POS)}
						></div>
					))}
				</div>
			</div>

			<div className='item youtube-videoId'>
				<h2>Video id</h2>
				<div className='suggestions'>
					{YOUTUBE_SUGGESTIONS.map(suggestion => (
						<img key={suggestion.id} src={suggestion.image} alt="" onClick={() => setYouTubeVideoId(suggestion.id)} />
					))}
				</div>
				<input type='text' value={settings.youtube.videoId} onChange={e => setYouTubeVideoId(e.target.value)} />
			</div>

			<div className='item youtube-volume slider'>
				<h2>Volume</h2>
				<span>{Math.round(settings.youtube.volume * 100)}%</span>
				<input
					type='range'
					min='0'
					max='100'
					step={1}
					value={settings.youtube.volume * 100}
					onChange={e => setYouTubeVolume(e.target.value / 100)}
				/>
			</div>

			<div className='item yes-no'>
				<h2>Show viewers</h2>
				<div onClick={() => setYouTubeShowViewers(!settings.youtube.showViewers)}>
					<span
						className={settings.youtube.showViewers ? 'selected' : ''}
					>
						Yes
					</span>
					{' / '}
					<span
						className={!settings.youtube.showViewers ? 'selected' : ''}
					>
						No
					</span>
				</div>
			</div>

			<div className='item youtube-update-interval'>
				<h2>Viewers update interval</h2>
				<input type='text' value={settings.youtube.viewersUpdateInterval} onChange={e => setYouTubeViewersUpdateInterval(e.target.value)} />
			</div>
		</>
	) : null;

	return (
		<div className='Settings'>
			<div className='window' style={{ backgroundColor: `rgba(0, 0, 0, ${settings.general.opacity ?? 0.5})` }}>
				<div className='menu'>
					<ul>
						<li
							onClick={() => setActiveMenuItem('general')}
							className={`${activeMenuItem === 'general' ? 'active' : ''}`}
						>
							General
						</li>

						{settings.order.map(title => (
							<li
								key={title}
								onClick={() => setActiveMenuItem(title)}
								className={`${activeMenuItem === title ? 'active' : ''} ${!settings.visible?.[title] ? 'hidden' : ''}`}
							>
								{title}
								{
									settings.visible?.[title]
										? <FiEye onClick={e => { e.stopPropagation(); setComponentVisibility(title); }} />
										: <FiEyeOff onClick={e => { e.stopPropagation(); setComponentVisibility(title); }} />
								}
							</li>
						))}
					</ul>
				</div>
				<div className='items'>
					<div className='close' onClick={() => setShowSettings(false)}>x</div>
					{renderGeneralSettings()}
					{renderClockSettings()}
					{renderTodoistSettings()}
					{renderAstroSettings()}
					{renderYouTubeSettings()}
				</div>
			</div>
		</div>
	);
}
