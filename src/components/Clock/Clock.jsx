import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Clock.scss';
import useInterval from './../../hooks/useInterval';
import { selectShowSeconds, toggleShowSeconds } from './../../redux/settingsSlice';

export default function Clock() {
	const dispatch = useDispatch();
	const showSeconds = useSelector(selectShowSeconds);
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
		<div className='Clock' onClick={() => dispatch(toggleShowSeconds())}>
			{time.hour}:{time.min}{showSeconds ? `:${time.sec}` : ''}
		</div>
	);
}