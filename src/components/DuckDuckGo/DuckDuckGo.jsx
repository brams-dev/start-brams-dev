import React, { useState, useRef } from 'react';
import './DuckDuckGo.scss';
import DuckDuckGoIcon from './../../assets/duckduckgo.svg';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';

export default function DuckDuckGo() {
	const [query, setQuery] = useState('');
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);
	
	const getSearchLink = () => `https://duckduckgo.com/?q=${query}`;
	const executeSearch = () => window.location = getSearchLink();

	return (
		<div className='DuckDuckGo'>
			<img className='logo' src={DuckDuckGoIcon} alt='DuckDuckGo logo' />
			<input
				type='text'
				placeholder='Search&hellip;'
				onKeyPress={({ key }) => key === 'Enter' ? executeSearch() : null}
				onChange={e => setQuery(e.target.value)}
				value={query}
				ref={inputRef}
			/>
			<a
				className='arrow-right'
				href={getSearchLink()}
			>
				<BsArrowRight />
			</a>
		</div>
	);
}
