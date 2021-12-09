import Position from '../../components/SettingItem/Position';
import Text from '../../components/SettingItem/Text';

export default function SunriseSettings({ POSITIONS, settings, setSetting }) {
	return (
		<>
			<Position
				POSITIONS={POSITIONS}
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<Text
				title='Latitude'
				value={settings.lat}
				setValue={setSetting('lat')}
			/>

			<Text
				title='Longitude'
				value={settings.long}
				setValue={setSetting('long')}
			/>
		</>
	)
}