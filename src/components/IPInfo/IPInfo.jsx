import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './IPInfo.scss';
import { selectIPInfoSource, toggleIPInfoSource } from './../../redux/settingsSlice';

const SOURCES = {
	'ipapi.co': async () => {
		const res = await fetch('https://ipapi.co/json');
		const info = await res.json();
		return {
			ip: info.ip,
			city: info.city,
			country: info.country_name,
			org: info.org,
			countryCode: info.country_code
		};
	},
	'ip-api.com': async () => {
		const res = await fetch('http://ip-api.com/json');
		const info = await res.json();
		return {
			ip: info.query,
			city: info.city,
			country: info.country,
			org: info.org,
			countryCode: info.countryCode
		};
	}
};

export default function IPInfo() {
	const dispatch = useDispatch();
	const source = useSelector(selectIPInfoSource);
	const [info, setInfo] = useState(undefined);

	useEffect(() => {
		const getInfo = async () => {
			const sourceFn = SOURCES[source];
			const info = await sourceFn();
			setInfo(info);
		};

		getInfo();
	}, [source]);

	if (!info) return null;

	return (
		<div className='IPInfo' onClick={() => dispatch(toggleIPInfoSource())}>
			<div className='ip'>
				{info.ip}
			</div>
			<div className='info'>
				<img src={`https://www.countryflags.io/${info.countryCode}/shiny/64.png`}></img>
				<span className='city'>{info.city}</span>
				<span className='text'>,&nbsp;</span>
				<span className='country'>{info.country}&nbsp;</span>
				<span className='org'>({info.org})</span>
			</div>
		</div>
	);
}
