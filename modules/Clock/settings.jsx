import Position from '../../components/SettingItem/Position';
import YesNo from '../../components/SettingItem/YesNo';

export default function ClockSettings({ POSITIONS, settings, setSetting }) {
	return (
		<>
			<Position
				POSITIONS={POSITIONS}
				value={settings.position}
				setValue={setSetting('position')}
			/>

			<YesNo
				title='Show seconds'
				value={settings.shouldShowSeconds}
				setValue={setSetting('shouldShowSeconds')}
			/>
		</>
	);
}
