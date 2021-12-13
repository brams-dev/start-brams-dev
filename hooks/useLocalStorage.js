import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
	// const [isInitialized, setIsInitialized] = useState(false);

	// useEffect(() => {
	// 	setIsInitialized(true);
	// }, []);

	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window !== 'undefined') {
			try {
				const item = localStorage?.getItem(key);
				return item ? JSON.parse(item) : initialValue;

			} catch (error) {
				console.error(error);
				return initialValue;
			}
		}
	});
	
	const setValue = value => {
		if (typeof window !== 'undefined') {
			try {
				const valueToStore = value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				localStorage?.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				console.error(error);
			}	
		}
	};

	// if (!isInitialized) return [initialValue, () => console.log('!isInitialized')];

	return [storedValue, setValue];
}
