import useSWR from 'swr';
import Position from '../../components/SettingItem/Position';
import Slider from '../../components/SettingItem/Slider';
import Text from '../../components/SettingItem/Text';
import YesNo from '../../components/SettingItem/YesNo';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function VideoSettings({ settings, setSetting }) {
	const { data: suggestions } = useSWR('/api/videos', fetcher);

	return (
		<>
			<Position
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<div className='item youtube-videoId'>
				<h2>Video id</h2>
				{suggestions && (
					<div className='suggestions'>
						{suggestions.map(suggestion => (
							<img
								className={suggestion.id === settings.videoId ? 'selected' : ''}
								key={suggestion.id}
								src={suggestion.image}
								alt=""
								onClick={() => setSetting('videoId')(suggestion.id)}
							/>
						))}
					</div>
				)}
				<input type='text' value={settings.videoId} onChange={e => setSetting('videoId')(e.target.value)} />
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