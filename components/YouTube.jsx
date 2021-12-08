import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Player from 'react-player';

const API_KEY = 'AIzaSyD8SOD0l5zzZGw0puDbJlYqB1r1gGEvi8k';

export default function Astro(props) {
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

	const togglePlayerState = () => {
		setIsPlaying(!isPlaying);
		
	};

	const skipToLive = () => {
		if (!isPlaying) setIsPlaying(true);
		const duration = playerRef.current.getDuration();
		playerRef.current.seekTo(duration);
	}

	return (
		<div className='YouTube' style={{ backgroundColor: `rgba(0, 0, 0, ${props.opacity ?? 0.5})` }}>
			<div className='player'>
				<Player
					ref={playerRef}
					url={`https://youtube.com/watch?v=${props.videoId}`}
					config={{
						youtube: {
							playerVars: {
								autoplay: 1,
								diablekb: 1,
								modestbranding: 1
							}
						}
					}}
					playing={isPlaying}
					controls={false}
					volume={props.volume}
					width={400}
					height={225}
					light={true}
				/>
			</div>
			{(props.showViewers && viewers && viewers !== 0) && (
				<div className='viewers'>
					<span className='pulsating-circle' onClick={skipToLive}></span>
					{new Intl.NumberFormat().format(viewers)} listening now
				</div>
			)}
		</div>
	);
}
