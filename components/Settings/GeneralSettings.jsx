import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import Slider from './SettingItem/Slider';
import Text from './SettingItem/Text';

const changeOrder = (settings, setSetting, title, currentPos, direction) => {
	if (direction === 'up' && currentPos <= 0) return null;
	if (direction === 'down' && currentPos >= settings.order.length) return null;

	const desiredPos = direction === 'up' ? currentPos - 1 : currentPos + 1;

	const newOrder = settings.order.slice();
	newOrder[currentPos] = newOrder[desiredPos];
	newOrder[desiredPos] = title;

	setSetting('order')(newOrder);
};

const General = ({ settings, setSetting, reset }) => (
	<>
		<Text
			title='Background'
			value={settings.background}
			setValue={setSetting('background')}
		/>

		<Slider
			title='Opacity'
			value={settings.opacity}
			setValue={setSetting('opacity')}
			percent={true}
			step={5}
		/>

		<Slider
			title='Radius'
			value={settings.radius}
			setValue={setSetting('radius')}
			min={0}
			max={24}
			step={1}
		/>

		<div className='item component-order'>
			<h2>Order</h2>
			<div className='order-items'>
				{settings.order.map((title, key) => (
					<div className={`order-item ${!settings.visible?.[title] ? 'hidden' : ''}`} key={title}>
						{title}
						<span className='actions'>
							{key === 0 ? <span className='icon filler'></span> : <FiArrowUpCircle className='icon' onClick={() => changeOrder(settings, setSetting, title, key, 'up')} />}
							{key === settings.order.length - 1 ? <span className='icon filler'></span> : <FiArrowDownCircle className='icon' onClick={() => changeOrder(settings, setSetting, title, key, 'down')} />}
						</span>
					</div>
				))}
			</div>
		</div>

		<div className='item'>
			
			<button onClick={reset}>Reset all settings</button>
		</div>

	</>
);

export default General;
