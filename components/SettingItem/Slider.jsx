export default function Slider({ title, setValue, min, max, step, percent, ...props }) {
	const value = percent ? `${Math.round(props.value * 100)}%` : props.value;

	return (
		<div className='item slider'>
			<h2>{title}</h2>
			<span>{value}</span>
			<input
				type='range'
				min={min ?? 0}
				max={max ?? 100}
				step={step ?? 1}
				value={percent ? props.value * 100 : props.value}
				onChange={e => setValue(percent ? e.target.value / 100 : e.target.value)}
			/>
		</div>
	);
}
