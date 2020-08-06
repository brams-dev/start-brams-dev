import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Options.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faCog } from '@fortawesome/pro-light-svg-icons';
import { toggleIsMinimized, selectIsMinimized } from './../../redux/settingsSlice';

export default function Options() {
	const dispatch = useDispatch();
	const isMinimized = useSelector(selectIsMinimized);

	return (
		<div className={`Options minimized-${isMinimized}`}>
			<button onClick={() => dispatch(toggleIsMinimized())}>
				<FontAwesomeIcon icon={faWindowMinimize} />
			</button>
			<button onClick={() => dispatch(toggleIsMinimized())}>
				<FontAwesomeIcon icon={faCog} />
			</button>
		</div>
	);
}
