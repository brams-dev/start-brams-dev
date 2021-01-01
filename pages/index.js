import Head from 'next/head';
import Clock from '../components/Clock';
import styles from './../styles/Home.module.css';
import useLocalStorage from './../hooks/useLocalStorage';

export default function Home() {
	const [clockPosition, setClockPosition] = useLocalStorage('clockPosition', {
		alignItems: 'center',
		justifyContent: 'center'
	});
	const [shouldShowSeconds, setShouldShowSeconds] = useLocalStorage('shouldShowSeconds', false);

	const setPosition = (pos) => {
		if (JSON.stringify(pos) === JSON.stringify(clockPosition)) setShouldShowSeconds(!shouldShowSeconds);
		setClockPosition(pos);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>⭐</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main
				className={styles.main}
				style={{...clockPosition}}
			>
				<Clock shouldShowSeconds={shouldShowSeconds} />
			</main>

			<div className={styles.positionGrid}>
				<div onClick={() => setPosition({
					alignItems: 'flex-start',
					justifyContent: 'flex-start'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'center',
					justifyContent: 'flex-start'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'flex-end',
					justifyContent: 'flex-start'
				})}></div>

				<div onClick={() => setPosition({
					alignItems: 'flex-start',
					justifyContent: 'center'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'center',
					justifyContent: 'center'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'flex-end',
					justifyContent: 'center'
				})}></div>

				<div onClick={() => setPosition({
					alignItems: 'flex-start',
					justifyContent: 'flex-end'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'center',
					justifyContent: 'flex-end'
				})}></div>
				<div onClick={() => setPosition({
					alignItems: 'flex-end',
					justifyContent: 'flex-end'
				})}></div>
			</div>
		</div>
	)
}
