import { WiSunrise, WiSunset } from 'react-icons/wi';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Sun(props) {
	const { data } = useSWR(props.lat && props.long ? `https://api.sunrise-sunset.org/json?lat=${props.lat}&lng=${props.long}&date=today&formatted=0` : null, fetcher);

	const renderSunriseSunset = () => {
		const sunrise = new Date(data.results.sunrise);
		const sunset = new Date(data.results.sunset);
		return (
			<div className='sunrise-sunset'>
				<span className='sunrise'><WiSunrise />{sunrise.getHours()}:{`0${sunrise.getMinutes()}`.slice(-2)}</span>
				<span className='sunset'><WiSunset />{sunset.getHours()}:{`0${sunset.getMinutes()}`.slice(-2)}</span>
			</div>
		);
	};

	if (!data) return null;

	return (
		<div className='Sun module'>
			{data?.results?.sunrise && data?.results?.sunset && renderSunriseSunset()}
		</div>
	);
}
