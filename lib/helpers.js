export const getGridHeight = (gridWidth) => {
	const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
	const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

	return gridWidth / width * height;
};
