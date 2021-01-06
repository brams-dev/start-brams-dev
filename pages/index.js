import Head from 'next/head';
import { useState } from 'react';
import Clock from '../components/Clock';
import Settings from './../components/Settings';

export default function Home() {
	const [settings, setSettings] = useState({});

	return (
		<div
			className='Home'
			style={{
				backgroundImage: `url(${settings.background})`
			}}
		>
			<Head>
				<title>⭐</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main
				style={{...settings.clockPosition}}
			>
				<Clock opacity={settings.opacity} shouldShowSeconds={settings.shouldShowSeconds} />
			</main>

			<Settings setSettings={setSettings} />
		</div>
	)
}
