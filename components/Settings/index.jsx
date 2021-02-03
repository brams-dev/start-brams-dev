import React, { useEffect, useState } from 'react';
import useKeyPress from './../../hooks/useKeyPress';
import useLocalStorage from './../../hooks/useLocalStorage';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

const INITIAL_SETTINGS = {
	general: {
		background: '/fern.webp',
		opacity: 0.5
	},
	order: [
		'clock',
		'astro',
		'todoist'
	],
	positions: {
		clock: 'TOP_RIGHT',
		todoist: 'TOP_RIGHT'
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
	}
};

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
	const setShouldShowSeconds = value => setSettings({ ...settings, clock: { ...settings.clock, shouldShowSeconds: value } });
	const setBackground = value => setSettings({ ...settings, general: { ...settings.general, background: value } });
	const setOpacity = value => setSettings({ ...settings, general: { ...settings.general, opacity: value } });
	const setTodoistToken = value => setSettings({ ...settings, todoist: { ...settings.todoist, token: value } });
	const setAstroLat = value => setSettings({ ...settings, astro: { ...settings.astro, lat: value } });
	const setAstroLong = value => setSettings({ ...settings, astro: { ...settings.astro, long: value } });
	const setAstroShowSun = value => setSettings({ ...settings, astro: { ...settings.astro, showSun: value } });
	const changeOrder = (title, currentPos, direction) => {
		if (direction === 'up' && currentPos <= 0) return null;
		if (direction === 'down' && currentPos >= settings.order.length) return null;

		const desiredPos = direction === 'up' ? currentPos - 1 : currentPos + 1;
		
		const newOrder = settings.order.slice();
		newOrder[currentPos] = newOrder[desiredPos];
		newOrder[desiredPos] = title;
		setSettings({ ...settings, order: newOrder });
	};
	
	if (!showSettings) return null;

	console.log(settings.order.length);

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
						<div className='order-item' key={title}>
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
			<div className='item yes-no'>
				<h2>Show sunrise/sunset</h2>
				<div onClick={() => setAstroShowSun(!settings.astro.showSun)}>
					<span
						className={settings.astro.showSun ? 'selected' : ''}
					>
						Yes
					</span>
					{' / '}
					<span
						className={!settings.astro.showSun ? 'selected' : ''}
					>
						No
					</span>
				</div>
			</div>

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
				<h2>Latitude:</h2>
				<input type='text' value={settings.astro.lat} onChange={e => setAstroLat(e.target.value)} />
			</div>

			<div className='item astro-long'>
				<h2>Longitude:</h2>
				<input type='text' value={settings.astro.long} onChange={e => setAstroLong(e.target.value)} />
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
								className={`${activeMenuItem === title ? 'active' : ''}`}
							>
								{title}
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
				</div>
			</div>
		</div>
	);
}
