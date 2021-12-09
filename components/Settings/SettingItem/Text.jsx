export default function Text({ title, value, setValue }) {
	return (
		<div className='item text'>
			<h2>{title}</h2>
			<input type='text' value={value} onChange={e => setValue(e.target.value)} />
		</div>
	);
}
