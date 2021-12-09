export default function YesNo({ title, value, setValue }) {
	return (
		<div className='item yes-no'>
			<h2>{title}</h2>
			<div className='options' onClick={() => setValue(!value)}>
				<span
					className={value ? 'selected' : ''}
				>
					Yes
				</span>
				{' / '}
				<span
					className={!value ? 'selected' : ''}
				>
					No
				</span>
			</div>
		</div>
	);
}
