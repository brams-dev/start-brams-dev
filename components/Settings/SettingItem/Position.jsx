import { getGridHeight } from '../../../lib/helpers';

export default function Position({ POSITIONS, value, setValue }) {
	return (
		<div className='item position'>
			<h2>Position</h2>
			<div
				className={'position-grid'}
				style={{
					width: '10rem',
					height: getGridHeight() + 'rem'
				}}
			>
				{POSITIONS.map(POS => (
					<div
						key={JSON.stringify(POS)}
						className={JSON.stringify(value) === JSON.stringify(POS) ? 'selected' : ''}
						onClick={() => setValue(POS)}
					></div>
				))}
			</div>
		</div>
	);
}