import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Player from 'react-player';

const API_KEY = 'AIzaSyD8SOD0l5zzZGw0puDbJlYqB1r1gGEvi8k';

export default function Video(props) {
	const [viewers, setViewers] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef();

	const {
		viewersUpdateInterval,
		videoId
	} = props;

	useEffect(() => {
		const getViewers = async () => {
			if (!props.showViewers) return;

			let result;
			try {
				result = await axios.get(
					`https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${API_KEY}`
				);
			} catch (error) {
				console.log(error);
			}

			setViewers(result?.data?.items?.[0]?.liveStreamingDetails?.concurrentViewers);
		};

		
		const interval = setInterval(getViewers, viewersUpdateInterval ?? 30000);
		getViewers();

		return () => clearInterval(interval);
	}, [viewersUpdateInterval, videoId]);

	const skipToLive = () => {
		const duration = playerRef.current.getDuration();
		playerRef.current.seekTo(duration);
		if (!isPlaying) setIsPlaying(true);
	};

	return (
		<div className='Video module'>
			<div className='player'>
				<Player
					ref={playerRef}
					url={`https://youtube.com/watch?v=${props.videoId}`}
					config={{
						youtube: {
							playerVars: {
								autoplay: 1,
								disablekb: 1,
								modestbranding: 1
							}
						}
					}}
					playing={isPlaying}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					controls={false}
					volume={props.volume}
					width={400}
					height={225}
					light={true}
				/>
			</div>
			{(props.showViewers && viewers !== '0' && viewers !== 0) && (
				<div className='viewers'>
					<span
						className='pulsating-circle'
						onClick={skipToLive}
						style={{ '--color': isPlaying ? 'red' : 'grey' }}
					></span>
					{new Intl.NumberFormat().format(viewers)} listening now
				</div>
			)}
		</div>
	);
}
