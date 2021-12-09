import { useContext } from 'react';
import { GlobalsContext } from '../../pages/_app';
import { getGridHeight } from './../../lib/helpers';

export default function Position({ value, setValue }) {
	const { positions } = useContext(GlobalsContext);

	return (
		<div className='item position'>
			<h2>Position</h2>
			<div
				className={'position-grid'}
				style={{
					width: '10rem',
					height: getGridHeight(10) + 'rem'
				}}
			>
				{positions.map(pos => (
					<div
						key={JSON.stringify(pos)}
						className={JSON.stringify(value) === JSON.stringify(pos) ? 'selected' : ''}
						onClick={() => setValue(pos)}
					></div>
				))}
			</div>
		</div>
	);
}
