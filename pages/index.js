import Head from 'next/head';
import { useState } from 'react';
import Clock from './../components/Clock';
import Todoist from './../components/Todoist';
import Settings from './../components/Settings';
import Astro from '../components/Astro';
import YouTube from './../components/YouTube';
import ClockSettings from '../components/Settings/ClockSettings';
import TodoistSettings from '../components/Settings/TodoistSettings';
import SunriseSettings from '../components/Settings/SunriseSettings';
import VideoSettings from '../components/Settings/VideoSettings';

const POSITIONS = [
	'TOP_LEFT',
	'TOP_CENTER',
	'TOP_RIGHT',
	'MIDDLE_LEFT',
	'MIDDLE_CENTER',
	'MIDDLE_RIGHT',
	'BOTTOM_LEFT',
	'BOTTOM_CENTER',
	'BOTTOM_RIGHT'
];

const MODULES = [
	{
		component: Clock,
		settingsComponent: ClockSettings,
		name: 'clock',
		defaultSettings: {
			shouldShowSeconds: false,
			position: 'TOP_RIGHT'
		}
	},
	{
		component: Astro,
		settingsComponent: SunriseSettings,
		name: 'sun',
		defaultSettings: {
			showSun: false,
			lat: '51.057',
			long: '3.720',
			position: 'TOP_RIGHT'
		}
	},
	{
		component: YouTube,
		settingsComponent: VideoSettings,
		name: 'youtube',
		defaultSettings: {
			volume: 0.05,
			videoId: '5qap5aO4i9A',
			showViewers: true,
			viewersUpdateInterval: 30000,
			position: 'BOTTOM_LEFT'
		}
	},
	{
		component: Todoist,
		settingsComponent: TodoistSettings,
		name: 'todoist',
		defaultSettings: {
			token: '',
			position: 'BOTTOM_RIGHT'
		}
	},
];

export default function Home() {
	const [settings, setSettings] = useState(null);

	const getOrder = c => settings?.general?.order?.indexOf(c.name);
	const getVisible = c => settings?.general?.visible?.[c.name];
	const getPosition = c => settings?.[c.name]?.position;

	return (
		<div
			className='Home'
			style={{
				backgroundImage: settings?.general?.background ? `url(${settings.general.background})` : '',
				'--radius-default': `${settings?.general?.radius / 10}rem`,
				'--opacity': settings?.general?.opacity
			}}
		>
			<Head>
				<title>⭐</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
				<script defer data-domain="start.brams.dev" src="https://hit.brams.app/js/script.js"></script>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<main>
				{settings && POSITIONS.map(POS => (
					<div className={`position-area ${POS}`} key={POS}>
						{MODULES
							.filter(c => getPosition(c) === POS && getVisible(c))
							.sort((a, b) => getOrder(a) - getOrder(b))
							.map(c => {
								const Component = c.component;
								return <Component key={c.name} {...settings?.[c.name]} />
							})
						}
					</div>
				))}
			</main>

			<Settings setSettings={setSettings} POSITIONS={POSITIONS} modules={MODULES} />
		</div>
	)
}
