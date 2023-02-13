import {useEffect} from 'react';
import {useState} from 'react';
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Logo: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, fps} = useVideoConfig();

	const entrance = spring({
		fps,
		frame,
		config: {
			damping: 300,
		},
		durationInFrames: 30,
	});

	const entranceOffset = interpolate(entrance, [0, 0.85], [height, 0]);

	const wave2 = Math.cos(frame / 15) * 13 + entranceOffset;
	const wave1 = Math.cos((frame - 5) / 15) * 16 + entranceOffset;
	const [stargazersCount, setStargazersCount] = useState(0);
	const scale = spring({
		fps,
		frame,
	});
	useEffect(() => {
		fetch('https://api.github.com/repos/flexbox/react-native-bootcamp')
			.then((response) => response.json())
			.then((data) => {
				setStargazersCount(data.stargazers_count);
			});
	}, []);
	const opacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	console.log(stargazersCount);
	return (
		<div
			style={{transform: `scale(${scale})`}}
			className="flex flex-row justify-center align-middle text-center border-2 border-black rounded-xl  px-6 py-4 "
		>
			<p className="font-bold m-auto text-3xl">{stargazersCount}</p>
			<div className="p-4 m-auto ">
				<svg
					className="absolute -ml-4 -mt-5  pl-2"
					height={120}
					viewBox="0 0 51 51"
				>
					<path
						fillRule="evenodd"
						d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
					/>
				</svg>
			</div>
		</div>
	);
};
