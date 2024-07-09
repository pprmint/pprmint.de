"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect, PropsWithChildren } from "react";
import { a, useTransition, easings } from "@react-spring/web";

import * as Slider from "@radix-ui/react-slider";
import { useTranslations } from "next-intl";
import Play from "src/icons/Play";
import Pause from "src/icons/Pause";
import VolumeMute from "src/icons/VolumeMute";
import VolumeLow from "src/icons/VolumeLow";
import VolumeMedium from "src/icons/VolumeMedium";
import VolumeHigh from "src/icons/VolumeHigh";
import SkipPrevious from "src/icons/SkipPrevious";
import SkipNext from "src/icons/SkipNext";
import Disc from "src/icons/Disc";
import Image from "next/image";

function AudioPlayer(props: PropsWithChildren<{ src: string; title?: string; artist?: string }>) {
	const t = useTranslations("COMMON");

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const audioPlayerRef = useRef<HTMLDivElement | null>(null);

	// Pause/Play logic
	const [playing, setPlaying] = useState(false);
	const [firstPlayPress, setFirstPlayPress] = useState(false);

	function handlePlay() {
		setFirstPlayPress(true);
		if (audioRef.current) {
			if (audioRef.current.paused || audioRef.current.ended) {
				// If the audio is paused or has ended, play it and set playing to true
				audioRef.current.play();
				setPlaying(true);
			} else {
				// If the audio is playing, pause it and set playing to false
				audioRef.current.pause();
				setPlaying(false);
			}
		}
	}

	const playButtonTransition = useTransition(!firstPlayPress, {
		from: { opacity: 1, scale: 1 },
		enter: { opacity: 1, scale: 1 },
		leave: {
			opacity: 0,
			scale: 2,
			config: {
				duration: 300,
				easing: easings.easeInCubic,
			},
		},
	});

	// Display of current time and audio duration + seeking logic
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	function handleTimeUpdate() {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	}

	function handleLoadedMetadata() {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	}

	function handleSeek(newTime: number[]) {
		if (audioRef.current) {
			const time = newTime[0]; // The first value in the array is the new time
			audioRef.current.currentTime = time;
			setCurrentTime(time);
		}
	}

	function handleEnded() {
		setPlaying(false);
	}

	// Shows audio time remaining when clicking on the duration time
	const [showRemaining, setShowRemaining] = useState(false);

	function toggleRemaining() {
		setShowRemaining(!showRemaining);
	}

	const formattedTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	// Volume control logic
	const [volume, setVolume] = useState(1);

	function handleVolumeChange(newVolume: number[]) {
		if (audioRef.current) {
			const volume = newVolume[0];
			audioRef.current.volume = volume;
			setVolume(volume);
		}
	}

	// Mute logic, toggles between muted and (kinda) between the last non-zero volume, or at least 10%.
	const [muted, setMuted] = useState(false);
	const [previousVolume, setPreviousVolume] = useState(1);

	function handleMute() {
		if (audioRef.current) {
			if (muted) {
				audioRef.current.volume = previousVolume || 0.1;
				setVolume(previousVolume || 0.1);
			} else {
				setPreviousVolume(volume);
				audioRef.current.volume = 0;
				setVolume(0);
			}
			setMuted(!muted);
		}
	}

	useEffect(() => {
		// Detect when audio metadata has been loaded for duration and update current audio time.
		const currentAudioRef = audioRef.current;

		if (currentAudioRef) {
			currentAudioRef.addEventListener("timeupdate", handleTimeUpdate);
			currentAudioRef.addEventListener("loadedmetadata", handleLoadedMetadata);
			return () => {
				currentAudioRef?.removeEventListener("timeupdate", handleTimeUpdate);
				currentAudioRef?.removeEventListener("loadedmetadata", handleLoadedMetadata);
			};
		}
	}, []);

	const [playbackSpeed, setPlaybackSpeed] = useState("1.0");
	const PlaybackSpeeds = ["0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "2.0"];
	const handlePlaybackSpeedChange = (speed: string) => {
		if (audioRef.current) {
			const numericSpeed = parseFloat(speed);
			audioRef.current.playbackRate = numericSpeed;
			setPlaybackSpeed(speed);
		}
	};
	const [progress, setProgress] = useState(0);

	return (
		<div
			className="relative bg-gradient-to-t p-4 pb-5 w-full max-w-lg from-neutral-900 border border-neutral-900 rounded-xl overflow-clip"
			ref={audioPlayerRef}
		>
			<div className="blur-xl opacity-25 absolute inset-0 -z-10">
				{props.children}
			</div>
			<audio ref={audioRef}>
				<source src={props.src} />
			</audio>
			<div className="flex items-center gap-6 p-2">
				<div className="relative bg-gradient-to-t from-neutral-800 to-neutral-900 border border-neutral-50/10 size-20 rounded-md overflow-clip">
					{props.children ? (
						props.children
					) : (
						<Disc className="size-[45px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
					)}
				</div>
				<div>
					<h1 className="text-neutral-50 text-2xl pb-0">{props.title}</h1>
					<p>{props.artist}</p>
				</div>
			</div>
			<div className="flex text-xs gap-3 items-center my-3 px-2">
				<span>{formattedTime(currentTime)}</span>
				<Slider.Root
					value={[currentTime]}
					onValueChange={(newTime) => handleSeek(newTime)}
					min={0}
					max={duration}
					step={0.001}
					className="group/slider relative flex items-center select-none touch-none w-full h-6 cursor-pointer"
				>
					<Slider.Track className="bg-neutral-50/30 relative grow h-px group-hover/slider:h-[3px] rounded-full duration-100">
						<Slider.Range className="absolute bg-neutral-50 h-[3px] -top-px group-hover/slider:top-0 rounded-full duration-100" />
					</Slider.Track>
				</Slider.Root>
				<span onClick={toggleRemaining} className="mb-0 text-right cursor-pointer">
					{showRemaining ? `-${formattedTime(duration - currentTime)}` : formattedTime(duration)}
				</span>
			</div>
			<div className="grid grid-cols-3 pl-2 items-center">
				<div className="text-xs">placeholder lol</div>
				<div className="flex gap-2 items-center justify-center w-full">
					<button className="p-2 hover:bg-neutral-50/10 rounded-full">
						<SkipPrevious />
					</button>
					<button
						onClick={handlePlay}
						className="p-3 m-0.5 hover:p-3.5 hover:m-0 bg-gradient-to-b from-neutral-50 to-neutral-100 border border-neutral-50 border-b-neutral-200 rounded-full text-neutral-950 active:scale-95 active:duration-75 active:shadow-inner duration-200 ease-out-quint"
					>
						{playing ? <Pause className="size-6" /> : <Play className="pl-0.5 size-6" />}
					</button>
					<button className="p-2 hover:bg-neutral-50/10 rounded-full">
						<SkipNext />
					</button>
				</div>
				<div className="flex gap-1 flex-nowrap items-center justify-end">
					<Slider.Root
						value={[volume]}
						onValueChange={(newVolume) => handleVolumeChange(newVolume)}
						min={0}
						max={1}
						step={0.1}
						className="group/slider relative flex items-center select-none touch-none w-20 h-4 cursor-pointer"
					>
						<Slider.Track className="bg-neutral-50/30 relative grow h-px group-hover/slider:h-[3px] rounded-full duration-100">
							<Slider.Range className="absolute bg-neutral-50 h-[3px] -top-px group-hover/slider:top-0 rounded-full duration-100" />
						</Slider.Track>
					</Slider.Root>
					<button
						className={`p-2 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-xl duration-100`}
						onClick={handleMute}
						aria-label="mute/unmute"
					>
						{volume > 0.66 ? (
							<VolumeHigh />
						) : volume > 0.33 ? (
							<VolumeMedium />
						) : volume > 0 ? (
							<VolumeLow />
						) : (
							<VolumeMute />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default dynamic(() => Promise.resolve(AudioPlayer), {
	ssr: false,
});
