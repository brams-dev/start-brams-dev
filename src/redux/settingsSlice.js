import { createSlice } from '@reduxjs/toolkit';

const width = typeof window !== 'undefined' ? window.screen.width : 1920;
const height = typeof window !== 'undefined' ? window.screen.height : 1080;

const initialState = {
	wallpaper: `https://source.unsplash.com/collection/11626505/${width}x${height}`,
	bookmarks: [
		{
			name: 'Hacker News',
			href: 'https://news.ycombinator.com/',
			show: true
		},
		{
			name: 'Messenger',
			href: 'https://messenger.com',
			show: true
		},
		{
			name: 'ProtonMail',
			href: 'https://beta.protonmail.com',
			show: true
		},
		{
			name: 'VRT NWS',
			href: 'https://www.vrt.be/vrtnws/nl/',
			show: true
		},
		{
			name: 'YouTube',
			href: 'https://www.youtube.com/feed/subscriptions',
			show: true
		},
		{
			name: 'Hey',
			href: 'https://app.hey.com/',
			show: true
		},
		{
			name: 'Notion',
			href: 'https://www.notion.so/',
			show: true
		},
		{
			name: 'GitHub',
			href: 'https://github.com/',
			show: true
		},
		{
			name: 'Pocket Casts',
			href: 'https://play.pocketcasts.com',
			show: true
		}
	],
	ipInfoSource: 'ipapi.co',
	showSeconds: false,
	showDate: false,
	isMinimized: false
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setWallpaper: (state, action) => {
			state.wallpaper = action.payload;
		},
		toggleIsMinimized: state => { state.isMinimized = !state.isMinimized },
		toggleShowSeconds: state => { state.showSeconds = !state.showSeconds },
		toggleIPInfoSource: state => {
			state.ipInfoSource = state.ipInfoSource === 'ipapi.co' ? 'ip-api.com' : 'ipapi.co';
		}
	}
});

export const {
	setWallpaper,
	toggleIsMinimized,
	toggleShowSeconds,
	toggleIPInfoSource
} = settingsSlice.actions;

export const selectWallpaper = state => state.settings.wallpaper;
export const selectBookmarks = state => state.settings.bookmarks;
export const selectIPInfoSource = state => state.settings.ipInfoSource;
export const selectShowSeconds = state => state.settings.showSeconds;
export const selectShowDate = state => state.settings.showDate;
export const selectIsMinimized = state => state.settings.isMinimized;

export default settingsSlice.reducer;
