import { useState, useEffect } from 'react';
import useInterval from '../../hooks/useInterval';

export default function Clock(props) {
	const [time, setTime] = useState({});

	const updateTime = () => {
		const date = new Date();
		const hour = `0${date.getHours()}`.slice(-2);
		const min = `0${date.getMinutes()}`.slice(-2);
		const sec = `0${date.getSeconds()}`.slice(-2);

		setTime({ hour, min, sec });
	};

	useEffect(updateTime, []);
	useInterval(updateTime, 1000);

	return (
		<div className='Clock module'>
			{time.hour}:{time.min}{props.shouldShowSeconds ? `:${time.sec}` : ''}
		</div>
	);
}
