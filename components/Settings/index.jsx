import React, { useEffect, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import GeneralSettings from './GeneralSettings';
import semver from 'semver';

const EARLIEST_VERSION = '5.0.0';
const LATEST_VERSION = '5.0.0';
const INITIAL_SETTINGS = {
	general: {
		background: '/fern.webp',
		opacity: 0.5,
		order: [],
		visible: {},
		radius: 12
	},
	version: LATEST_VERSION
};

const UPGRADERS = [
	// {
	// 	from: '4.2.1',
	// 	to: '5.0.0',
	// 	upgrade: settings => {
	// 		const newSettings = {
	// 			...settings,
	// 			video: {
	// 				...settings.video,
	// 				url: `https://www.youtube.com/watch?v=${settings.video.videoId}`
	// 			}
	// 		};

	// 		delete newSettings.video.videoId;
	// 		return newSettings;
	// 	}
	// }
];

const upgrade = oldSettings => UPGRADERS.reduce((settings, upgrader) => {
	if (upgrader.from !== (settings.version ?? EARLIEST_VERSION)) return;
	return {
		...upgrader.upgrade(settings),
		version: upgrader.to
	};
}, oldSettings);

export default function Settings(props) {
	const getDefaultSettings = () => {
		let settings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));

		settings = {
			...settings,
			general: {
				...settings.general,
				order: props.modules.map(m => m.name)
			},
			...Object.fromEntries(props.modules.map(m => ([m.name, m.defaultSettings])))
		};

		return settings;
	};
	const [showSettings, setShowSettings] = useState(false);
	const keyPressed = useKeyPress('s');
	const [activeMenuItem, setActiveMenuItem] = useState('general');

	const { settings, setSettings } = props;

	useEffect(() => {
		if (keyPressed) setShowSettings(!showSettings);
	}, [keyPressed]);

	useEffect(() => {
		if (!settings) return setSettings(getDefaultSettings());
		if (semver.lt(settings.version ?? EARLIEST_VERSION, LATEST_VERSION)) return setSettings(upgrade(settings));

		setSettings(settings);
	}, [settings]);

	const setSetting = module => key => value => setSettings({ ...settings, [module]: { ...settings?.[module], [key]: value } });

	const renderModuleSettings = module => {
		const Settings = module.settingsComponent;

		return <Settings
			key={module.name}
			settings={settings?.[module.name]}
			setSetting={setSetting(module.name)}
		/>
	};

	const renderGeneralSettings = () => activeMenuItem === 'general' ? (
		<GeneralSettings
			settings={settings.general}
			setSetting={setSetting('general')}
			reset={() => setSettings(getDefaultSettings())}
		/>
	) : null;

	if (!showSettings) return null;

	return (
		<div className='Settings' onClick={() => setShowSettings(false)}>
			<div className='window' onClick={e => e.stopPropagation()}>
				<div className='menu'>
					<ul>
						<li
							onClick={() => setActiveMenuItem('general')}
							className={`${activeMenuItem === 'general' ? 'active' : ''}`}
						>
							General
						</li>

						{settings.general.order.map(name => (
							<li
								key={name}
								onClick={() => setActiveMenuItem(name)}
								className={`${activeMenuItem === name ? 'active' : ''} ${!settings.general.visible?.[name] ? 'hidden' : ''}`}
							>
								{name}
								{
									settings.general.visible?.[name]
										? <FiEye onClick={e => { e.stopPropagation(); setSetting('general')('visible')({ ...settings.general.visible, [name]: false }); }} />
										: <FiEyeOff onClick={e => { e.stopPropagation(); setSetting('general')('visible')({ ...settings.general.visible, [name]: true }); }} />
								}
							</li>
						))}
					</ul>
				</div>
				<div className='items'>
					<div className='close' onClick={() => setShowSettings(false)}>x</div>
					{renderGeneralSettings()}
					{props.modules
						.filter(m => activeMenuItem === m.name)
						.map(renderModuleSettings)
					}
				</div>
			</div>
		</div>
	);
}
