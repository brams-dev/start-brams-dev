import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscChromeMinimize } from 'react-icons/vsc';
import './Options.scss';
import { toggleIsMinimized, selectIsMinimized } from './../../redux/settingsSlice';

export default function Options() {
	const dispatch = useDispatch();
	const isMinimized = useSelector(selectIsMinimized);

	return (
		<div className={`Options minimized-${isMinimized}`}>
			<button onClick={() => dispatch(toggleIsMinimized())}>
				<VscChromeMinimize />
			</button>
			<button onClick={() => dispatch(toggleIsMinimized())}>
				<IoSettingsOutline />
			</button>
		</div>
	);
}
