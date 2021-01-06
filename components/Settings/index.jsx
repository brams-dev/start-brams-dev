import React, { useEffect, useState } from 'react';
import { useDoubleTap } from 'use-double-tap';
import useKeyPress from './../../hooks/useKeyPress';
import useLocalStorage from './../../hooks/useLocalStorage';

const INITIAL_SETTINGS = {
	clockPosition: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	shouldShowSeconds: false,
	background: '/fern.webp'
};

const CLOCK_POSITIONS = {
	TOP_LEFT: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	TOP_CENTER: {
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	TOP_RIGHT: {
		alignItems: 'flex-end',
		justifyContent: 'flex-start'
	},
	MIDDLE_LEFT: {
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	MIDDLE_CENTER: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	MIDDLE_RIGHT: {
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	BOTTOM_LEFT: {
		alignItems: 'flex-start',
		justifyContent: 'flex-end'
	},
	BOTTOM_CENTER: {
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	BOTTOM_RIGHT: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	}
};

export default function Settings(props) {
	const [settings, setSettings] = useLocalStorage('settings', INITIAL_SETTINGS);
	const [showSettings, setShowSettings] = useState(false);
	const keyPressed = useKeyPress('s');
	const doubleTapBind = useDoubleTap(() => setShowSettings(!showSettings));

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

	const setClockPosition = value => setSettings({ ...settings, clockPosition: value });
	const setShouldShowSeconds = value => setSettings({ ...settings, shouldShowSeconds: value });
	const setBackground = value => setSettings({ ...settings, background: value });
	const setOpacity = value => setSettings({ ...settings, opacity: value });
	
	if (!showSettings) return <div className='double-tap-catcher' {...doubleTapBind}></div>;

	return (
		<div className='Settings'>
			<div className='items' style={{ backgroundColor: `rgba(0, 0, 0, ${settings.opacity ?? 0.5})` }}>
				<div className='close' onClick={() => setShowSettings(false)}>x</div>
				<div className='item clock-position'>
					<h2>Clock position</h2>
					<div
						className={'position-grid'}
						style={{
							width: '10rem',
							height: getGridHeight() + 'rem'
						}}
					>
						{Object.entries(CLOCK_POSITIONS).map(([key, pos]) => (
							<div
								key={key}
								className={JSON.stringify(settings.clockPosition) === JSON.stringify(pos) ? 'selected' : ''}
								onClick={() => setClockPosition(pos)}
							></div>
						))}
					</div>
				</div>

				<div className='item clock-seconds'>
					<h2>Show seconds</h2>
					<div onClick={() => setShouldShowSeconds(!settings.shouldShowSeconds)}>
						<span
							className={settings.shouldShowSeconds ? 'selected' : ''}
						>
							Yes
							</span>
						{' / '}
						<span
							className={!settings.shouldShowSeconds ? 'selected' : ''}
						>
							No
							</span>
					</div>
				</div>

				<div className='item background'>
					<h2>Background</h2>
					<input type='text' value={settings.background} onChange={e => setBackground(e.target.value)} />
				</div>

				<div className='item opacity'>
					<h2>Opacity</h2>
					<span>{Math.round(settings.opacity * 100)}%</span>
					<input
						type='range'
						min='0' 
						max='100' 
						step={5} 
						value={settings.opacity * 100} 
						onChange={e => setOpacity(e.target.value / 100)}
					/>
				</div>
			</div>
		</div>
	);
}
