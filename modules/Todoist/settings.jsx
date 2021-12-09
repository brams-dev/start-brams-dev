import Position from '../../components/SettingItem/Position';
import Text from '../../components/SettingItem/Text';

export default function TodoistSettings({ POSITIONS, settings, setSetting }) {
	return (
		<>
			<Position
				POSITIONS={POSITIONS}
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<Text value={settings.token} setValue={setSetting('token')} />
		</>
	);
}