import Head from 'next/head';
import { useState } from 'react';
import Clock from './../components/Clock';
import Todoist from './../components/Todoist';
import Settings from './../components/Settings';
import Astro from '../components/Astro';

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

export default function Home() {
	const [settings, setSettings] = useState(null);

	const components = [
		{
			component: Clock,
			position: settings?.positions?.clock,
			order: settings?.order?.findIndex(item => item === 'clock'),
			visible: settings?.visible.clock,
			props: {
				opacity: settings?.general?.opacity,
				shouldShowSeconds: settings?.clock?.shouldShowSeconds
			}
		},
		{
			component: Todoist,
			position: settings?.positions?.todoist,
			order: settings?.order?.findIndex(item => item === 'todoist'),
			visible: settings?.visible.todoist,
			props: {
				opacity: settings?.general?.opacity,
				token: settings?.todoist?.token
			}
		},
		{
			component: Astro,
			position: settings?.positions?.astro,
			order: settings?.order?.findIndex(item => item === 'astro'),
			visible: settings?.visible.astro,
			props: {
				opacity: settings?.general?.opacity,
				lat: settings?.astro?.lat,
				long: settings?.astro?.long
			}
		}
	];

	return (
		<div
			className='Home'
			style={{
				backgroundImage: settings?.general?.background ? `url(${settings.general.background})` : ''
			}}
		>
			<Head>
				<title>⭐</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
				<script defer data-domain="start.brams.dev" src="https://hit.brams.app/js/script.js"></script>
			</Head>

			<main>
				{settings && POSITIONS.map(POS => (
					<div className={`position-area ${POS}`} key={POS}>
						{components
							.filter(c => c.position === POS && c.visible)
							.sort((a, b) => a.order - b.order)
							.map(c => {
								const Component = c.component;
								return <Component key={c.component.name} {...c.props} />
							})
						}
					</div>
				))}
			</main>

			<Settings setSettings={setSettings} POSITIONS={POSITIONS} />
		</div>
	)
}
