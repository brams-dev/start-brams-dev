import { useContext, useState } from 'react';
import Head from 'next/head';
import { GlobalsContext } from './_app';
import useLocalStorage from '../hooks/useLocalStorage';
import Settings from './../components/Settings';

import Clock from './../modules/Clock/module';
import Sun from './../modules/Sun/module';
import Bookmarks from './../modules/Bookmarks/module';
import Video from './../modules/Video/module';
import Todoist from './../modules/Todoist/module';

import ClockSettings from './../modules/Clock/settings';
import SunSettings from './../modules/Sun/settings';
import BookmarksSettings from './../modules/Bookmarks/settings';
import VideoSettings from './../modules/Video/settings';
import TodoistSettings from './../modules/Todoist/settings';

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
		component: Sun,
		settingsComponent: SunSettings,
		name: 'sun',
		defaultSettings: {
			showSun: false,
			lat: '51.057',
			long: '3.720',
			position: 'TOP_RIGHT'
		}
	},
	{
		component: Bookmarks,
		settingsComponent: BookmarksSettings,
		name: 'bookmarks',
		defaultSettings: {
			items: [
				{
					name: 'Hacker News',
					location: 'https://hackernews.com'
				}
			]
		}
	},
	{
		component: Video,
		settingsComponent: VideoSettings,
		name: 'video',
		defaultSettings: {
			volume: 0.05,
			videoId: 'jfKfPfyJRdk',
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
	const [settings, setSettings, isInitialized] = useLocalStorage('settings');
	const { positions } = useContext(GlobalsContext);

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
				{settings && positions.map(pos => (
					<div className={`position-area ${pos}`} key={pos}>
						{MODULES
							.filter(c => getPosition(c) === pos && getVisible(c))
							.sort((a, b) => getOrder(a) - getOrder(b))
							.map(c => {
								const Component = c.component;
								return <Component key={c.name} {...settings?.[c.name]} />
							})
						}
					</div>
				))}
			</main>

			<Settings settings={settings} setSettings={setSettings} isInitialized={isInitialized} modules={MODULES} />
		</div>
	)
}
