import Head from 'next/head';
import { useState } from 'react';
import Clock from './../components/Clock';
import Todoist from './../components/Todoist';
import Settings from './../components/Settings';

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
			props: {
				opacity: settings?.general?.opacity,
				shouldShowSeconds: settings?.clock?.shouldShowSeconds
			}
		},
		{
			component: Todoist,
			position: settings?.positions?.todoist,
			props: {
				opacity: settings?.general?.opacity,
				token: settings?.todoist?.token
			}
		}
	];

	return (
		<div
			className='Home'
			style={{
				backgroundImage: `url(${settings?.general?.background})`
			}}
		>
			<Head>
				<title>⭐</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main>
				{settings && POSITIONS.map(POS => (
					<div className={`position-area ${POS}`} key={POS}>
						{components.filter(c => c.position === POS).map(c => {
							const Component = c.component;
							return <Component key={c.component.name} {...c.props} />
						})}
					</div>
				))}
			</main>

			<Settings setSettings={setSettings} POSITIONS={POSITIONS} />
		</div>
	)
}
