import React from 'react';
import './../styles/globals.scss';

export const GlobalsContext = React.createContext({
	positions: [
		'TOP_LEFT',
		'TOP_CENTER',
		'TOP_RIGHT',
		'MIDDLE_LEFT',
		'MIDDLE_CENTER',
		'MIDDLE_RIGHT',
		'BOTTOM_LEFT',
		'BOTTOM_CENTER',
		'BOTTOM_RIGHT'
	]
});

function MyApp({ Component, pageProps }) {
	return (
		<GlobalsContext.Provider>
			<Component {...pageProps} />
		</GlobalsContext.Provider>
	);
}

export default MyApp
