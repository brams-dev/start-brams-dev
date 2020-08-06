import React from 'react';
import './index.scss';
import { Provider } from 'react-redux';
import store from './../redux/store';

import Start from './../components/Start/Start';
import { useEffect } from 'react';

export default function App() {
	useEffect(() => {
		document.title = '⭐';
	});
	return (
		<Provider store={store}>
			<Start />
		</Provider>
	);
}
