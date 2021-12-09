import Position from '../../components/SettingItem/Position';
import Slider from '../../components/SettingItem/Slider';
import Text from '../../components/SettingItem/Text';
import YesNo from '../../components/SettingItem/YesNo';

const YOUTUBE_SUGGESTIONS = [
	{
		id: '5qap5aO4i9A',
		image: 'https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg'
	},
	{
		id: 'DWcJFNfaw9c',
		image: 'https://i.ytimg.com/vi/DWcJFNfaw9c/hq720_live.jpg'
	},
	{
		id: 'L9Q1HUdUMp0',
		image: '/L9Q1HUdUMp0.png'
	},
	{
		id: '45rdiXqN620',
		image: 'https://i.ytimg.com/vi/45rdiXqN620/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCO4XAsbGBPKny1IIifRRI1Fsd7pw'
	},
	{
		id: 'LbhKlPNx3Mg',
		image: 'https://i.ytimg.com/vi/LbhKlPNx3Mg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDzAYC8h6mzNXQk3Vly1GdoIbcA9w'
	},
	{
		id: 'zVqJv_dKUEs',
		image: 'https://i.ytimg.com/vi/zVqJv_dKUEs/hq720.jpg'
	},
	{
		id: 'Dx5qFachd3A',
		image: 'https://i.ytimg.com/vi/Dx5qFachd3A/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAcrdR4Ftmjc-5yMqGmfAUOLwhFLA'
	},
	{
		id: 'DSGyEsJ17cI',
		image: 'https://i.ytimg.com/vi/DSGyEsJ17cI/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCWDI21MEk676eyaS7OetCwDbns-Q'
	},

	{
		id: 'oKfYJYd0r5w',
		image: 'https://i.ytimg.com/vi/oKfYJYd0r5w/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCfiGXhpq3PxmLubi1FM14SFbIIrw'
	},
	{
		id: '-8etvVhgc6Q',
		image: 'https://i.ytimg.com/vi/-8etvVhgc6Q/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCgrEpTd1i0EGxZH5JuihtH7gAo0Q'
	},
	{
		id: '5X18D-EbjUc',
		image: 'https://i.ytimg.com/vi/5X18D-EbjUc/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5qf_Br31osySWg9XfiQJ9bOMZKw'
	},
	{
		id: 'JEuAYnjtJP0',
		image: 'https://i.ytimg.com/vi/JEuAYnjtJP0/hqdefault_live.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiuaMI7x-kPrFn4LMmtr-wuTa0gg'
	},
];

export default function VideoSettings({ settings, setSetting }) {
	return (
		<>
			<Position
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<div className='item youtube-videoId'>
				<h2>Video id</h2>
				<div className='suggestions'>
					{YOUTUBE_SUGGESTIONS.map(suggestion => (
						<img key={suggestion.id} src={suggestion.image} alt="" onClick={() => setSetting('videoId')(suggestion.id)} />
					))}
				</div>
				<input type='text' value={settings.videoId} onChange={e => setSetting('videoId', e.target.value)} />
			</div>

			{/* <Text
				title='Video ID'
				value={settings.videoId}
				setValue={setSetting('videoId')}
			/> */}

			<Slider
				title='Volume'
				value={settings.volume}
				setValue={setSetting('volume')}
				percent={true}
			/>

			<YesNo
				title='Show viewers'
				value={settings.showViewers}
				setValue={setSetting('showViewers')}
			/>

			<Text
				title='Viewers update interval'
				value={settings.viewersUpdateInterval}
				setValue={setSetting('viewersUpdateInterval')}
			/>
		</>
	);
}