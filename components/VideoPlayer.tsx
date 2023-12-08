import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import saveAs from "file-saver";
import { a, useTransition, easings } from "@react-spring/web";
import useTranslation from "next-translate/useTranslation";

import * as Slider from "@radix-ui/react-slider";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Progress from "@radix-ui/react-progress";

function VideoPlayer(props: {
	src: string;
	title?: string;
	poster?: string;
	noSound?: boolean;
	noDownload?: boolean;
	loopDefault?: boolean;
}) {
	const { t } = useTranslation();

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const videoPlayerRef = useRef<HTMLDivElement | null>(null);

	// Pause/Play logic
	const [playing, setPlaying] = useState(false);
	const [firstPlayPress, setFirstPlayPress] = useState(false);

	function handlePlay() {
		setFirstPlayPress(true);
		if (videoRef.current) {
			if (videoRef.current.paused || videoRef.current.ended) {
				// If the video is paused or has ended, play it and set playing to true
				videoRef.current.play();
				setPlaying(true);
			} else {
				// If the video is playing, pause it and set playing to false
				videoRef.current.pause();
				setPlaying(false);
				setShowControls(true);
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

	// Fullscreen logic
	const [fullscreen, setFullscreen] = useState(document.fullscreenElement ? true : false);

	function handleFullscreen() {
		if (videoPlayerRef.current) {
			const container = videoPlayerRef.current;

			if (!document.fullscreenElement) {
				// If not in fullscreen, enter fullscreen mode for the container
				if (container.requestFullscreen) {
					setFullscreen(true);
					container.requestFullscreen();
				}
			} else {
				// If in fullscreen, exit fullscreen mode
				if (document.exitFullscreen) {
					setFullscreen(false);
					document.exitFullscreen();
				}
			}
		}
	}

	// Display of current time and video duration + seeking logic
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	function handleTimeUpdate() {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	}

	function handleLoadedMetadata() {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	}

	function handleSeek(newTime: number[]) {
		if (videoRef.current) {
			const time = newTime[0]; // The first value in the array is the new time
			videoRef.current.currentTime = time;
			setCurrentTime(time);
		}
	}

	function handleEnded() {
		setPlaying(false);
		setShowControls(true);
	}

	// Shows video time remaining when clicking on the duration time
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
		if (videoRef.current) {
			const volume = newVolume[0];
			videoRef.current.volume = volume;
			setVolume(volume);
		}
	}

	// Mute logic, toggles between muted and (kinda) between the last non-zero volume, or at least 10%.
	const [muted, setMuted] = useState(false);
	const [previousVolume, setPreviousVolume] = useState(1);

	function handleMute() {
		if (videoRef.current) {
			if (muted) {
				videoRef.current.volume = previousVolume || 0.1;
				setVolume(previousVolume || 0.1);
			} else {
				setPreviousVolume(volume);
				videoRef.current.volume = 0;
				setVolume(0);
			}
			setMuted(!muted);
		}
	}

	useEffect(() => {
		// Detect when video metadata has been loaded for duration and update current video time.
		if (videoRef.current) {
			videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
			videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
			return () => {
				videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
				videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
			};
		}
		// Add an event listener to exit fullscreen if the user presses Esc.
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) {
				setFullscreen(false);
			}
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	// Logic for controls appearing and disappearing after 2 seconds of no mouse movement.
	const [showControls, setShowControls] = useState(true);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		const handleMouseMove = () => {
			setShowControls(true);
			clearTimeout(timer);

			if (videoRef.current && !videoRef.current.paused) {
				timer = setTimeout(() => {
					setShowControls(false);
				}, 2000);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			clearTimeout(timer);
		};
	}, []);

	// Transitions
	const topTransition = useTransition(showControls, {
		from: { y: -80 },
		enter: { y: 0, config: { duration: 200, easing: easings.easeOutExpo } },
		leave: {
			y: -80,
			config: {
				duration: 300,
				easing: easings.easeInCubic,
			},
		},
	});
	const bottomTransition = useTransition(showControls, {
		from: { y: 112 },
		enter: { y: 0, config: { duration: 200, easing: easings.easeOutExpo } },
		leave: {
			y: 112,
			config: {
				duration: 300,
				easing: easings.easeInCubic,
			},
		},
	});

	// Context menu options
	function copyVideoUrl() {
		navigator.clipboard.writeText(props.src);
	}
	const [playbackSpeed, setPlaybackSpeed] = useState("1.0");
	const PlaybackSpeeds = ["0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "2.0"];
	const handlePlaybackSpeedChange = (speed: string) => {
		if (videoRef.current) {
			const numericSpeed = parseFloat(speed);
			videoRef.current.playbackRate = numericSpeed;
			setPlaybackSpeed(speed);
		}
	};
	const [downloading, setDownloading] = useState(false);
	const [progress, setProgress] = useState(0);
	async function downloadVideo() {
		setDownloading(true);

		try {
			const videoUrl = props.src;
			const response = await fetch(videoUrl);

			if (!response.ok) {
				throw new Error(`Failed to download video: ${response.statusText}`);
			}

			const contentLength = Number(response.headers.get("content-length")); // Parse to a number
			const reader = response.body && response.body.getReader(); // Check if response.body is null
			const chunks = [];
			let received = 0;

			while (reader) {
				const { done, value } = await reader.read();
				if (done) break;

				chunks.push(value);
				received += value.length;
				setProgress(Math.floor((received / contentLength) * 100));
			}

			const videoBlob = new Blob(chunks);
			saveAs(videoBlob, `${props.title ? props.title : "video"}.mp4`);
		} catch (error) {
			console.error("Error downloading video:", error);
		}
		setDownloading(false);
		setTimeout(() => {
			setProgress(0);
		}, 300);
	}
	const downloadingTransition = useTransition(downloading, {
		from: { y: -24 },
		enter: { y: 0, config: { duration: 300, easing: easings.easeOutExpo } },
		leave: {
			y: -24,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
	});
	const [loopEnabled, setLoopEnabled] = useState(props.loopDefault ? true : false);

	return (
		<div
			className={`relative overflow-hidden ${fullscreen ? "bg-black" : "bg-neutral-900"} ${
				showControls ? "cursor-auto" : "cursor-none"
			}`}
			ref={videoPlayerRef}
		>
			{playButtonTransition(
				(style, item) =>
					item && (
						<a.div
							onClick={handlePlay}
							style={style}
							className="absolute flex items-center justify-center w-full h-full z-10"
						>
							<button className="flex items-center justify-center z-10 w-24 md:w-32 h-24 md:h-32 bg-neutral-950/30 hover:bg-neutral-950/40 text-neutral-50 text-6xl md:text-8xl rounded-full cursor-pointer duration-100">
								<i className="ri-play-fill ml-2" />
							</button>
						</a.div>
					)
			)}
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<video
						ref={videoRef}
						src={props.src}
						className={`w-full h-full object-contain duration-500 ease-out-expo ${
							currentTime === duration && "opacity-50"
						}`}
						poster={props.poster}
						onClick={handlePlay}
						onEnded={handleEnded}
						playsInline
						controls={false}
						loop={loopEnabled}
					/>
				</ContextMenu.Trigger>
				{downloadingTransition(
					(style, item) =>
						item && (
							<a.div style={style} className="absolute top-0 left-0 right-0 z-30">
								<Progress.Root
									className="relative overflow-hidden bg-neutral-50/30 w-full h-1"
									style={{ transform: "translateZ(0)" }}
									value={progress}
								>
									<Progress.Indicator
										className="bg-white w-full h-full transition-transform duration-300 ease-out-expo"
										style={{ transform: `translateX(-${100 - progress}%)` }}
									/>
								</Progress.Root>
								<p className="text-neutral-50 text-xs text-right my-1 mr-2 drop-shadow-md">
									{t("COMMON:downloading")}: {progress}%
								</p>
							</a.div>
						)
				)}
				{props.title && topTransition(
					(style, item) =>
						item && (
							<a.div
								style={style}
								className="absolute top-0 left-0 right-0 p-6 z-20 h-20 bg-gradient-to-b from-[#111c] duration-500 ease-out-expo"
							>
								<h1 className="font-display font-medium text-2xl text-neutral-50">{props.title}</h1>
							</a.div>
						)
				)}
				{bottomTransition(
					(style, item) =>
						item && (
							<a.div
								style={style}
								className="absolute flex flex-col justify-end bottom-0 left-0 right-0 p-3 h-28 z-20 bg-gradient-to-t from-[#111c] duration-500 ease-out-expo"
							>
								<div className="absolute flex top-6 left-6 right-6 justify-between font-mono font-medium text-neutral-50 text-xs">
									<p>{formattedTime(currentTime)}</p>
									<p onClick={toggleRemaining} className="text-right cursor-pointer">
										{showRemaining ? `-${formattedTime(duration - currentTime)}` : formattedTime(duration)}
									</p>
								</div>
								<div className="px-3">
									<Slider.Root
										value={[currentTime]}
										onValueChange={(newTime) => handleSeek(newTime)}
										min={0}
										max={duration}
										step={0.001}
										className="group/videoslider relative flex items-center select-none touch-none w-full h-4 cursor-pointer"
									>
										<Slider.Track className="bg-neutral-50/30 relative grow h-0.5 duration-100">
											<Slider.Range className="absolute bg-neutral-50 h-full" />
										</Slider.Track>
										<Slider.Thumb
											className="block w-0 h-0 group-hover/videoslider:w-3 group-hover/videoslider:h-3 focus:w-3 focus:h-3 bg-neutral-50 focus:shadow-md rounded-full duration-100 focus:outline-none"
											aria-label="Progress"
										/>
									</Slider.Root>
								</div>
								<div className="flex pt-1 justify-between">
									<button
										className="w-10 h-10 bg-neutral-50/0 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-2xl duration-100"
										onClick={handlePlay}
										aria-label="pause/play"
									>
										{currentTime === duration ? (
											<i className="ri-skip-back-fill" />
										) : playing ? (
											<i className="ri-pause-fill" />
										) : (
											<i className="ri-play-fill" />
										)}
									</button>
									<div className="flex gap-3">
										{!props.noSound && (
											<div className="flex gap-3 flex-nowrap items-center justify-end w-10 hover:w-40 h-10 bg-neutral-50/0 hover:bg-neutral-50/10 duration-300 ease-out-expo overflow-hidden rounded-full">
												<div>
													<Slider.Root
														value={[volume]}
														onValueChange={(newVolume) => handleVolumeChange(newVolume)}
														min={0}
														max={1}
														step={0.1}
														className="group/volumeslider relative flex items-center select-none touch-none w-24 h-4 cursor-pointer"
													>
														<Slider.Track className="bg-neutral-50/30 relative grow h-0.5 duration-100">
															<Slider.Range className="absolute bg-neutral-50 rounded-full h-full" />
														</Slider.Track>
														<Slider.Thumb
															className="block w-0 h-0 group-hover/volumeslider:w-3 group-hover/volumeslider:h-3 focus:w-3 focus:h-3 bg-neutral-50 focus:shadow-md rounded-full duration-100 focus:outline-none"
															aria-label="Progress"
														/>
													</Slider.Root>
												</div>
												<div>
													<button
														className={`ml-auto w-10 h-10 bg-neutral-50/0 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-xl duration-100`}
														onClick={handleMute}
														aria-label="mute/unmute"
													>
														{volume > 0.5 ? (
															<i className="ri-volume-up-line" />
														) : volume > 0 ? (
															<i className="ri-volume-down-line" />
														) : (
															<i className="ri-volume-mute-line" />
														)}
													</button>
												</div>
											</div>
										)}
										<button
											className="w-10 h-10 bg-neutral-50/0 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-xl duration-100"
											onClick={handleFullscreen}
											aria-label="enter/exit fullscreen"
										>
											{fullscreen ? <i className="ri-fullscreen-exit-line" /> : <i className="ri-fullscreen-line" />}
										</button>
									</div>
								</div>
							</a.div>
						)
				)}
				<ContextMenu.Portal>
					<ContextMenu.Content className="z-50 text-neutral text-sm w-60 p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-50/10 ring-1 ring-neutral-950/75 shadow-lg rounded-lg overflow-hidden origin-[var(--radix-context-menu-content-transform-origin)] data-[state='open']:animate-scale-up data-[state='closed']:animate-scale-down">
						<ContextMenu.CheckboxItem
							className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
							checked={loopEnabled}
							onCheckedChange={setLoopEnabled}
						>
							<i className="ri-loop-right-line" />
							{t("COMMON:VideoPlayer.loop")}
							<ContextMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
								<i className="ri-check-line" />
							</ContextMenu.ItemIndicator>
						</ContextMenu.CheckboxItem>
						<ContextMenu.Item
							className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
							onClick={copyVideoUrl}
						>
							<i className="ri-link" />
							{t("COMMON:VideoPlayer.copyVideoUrl")}
						</ContextMenu.Item>

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 data-[state='open']:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state='open']:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 data-[state='open']:bg-neutral-50/10 duration-100 cursor-pointer focus-visible:outline-none">
								<i className="ri-speed-up-line" />
								{t("COMMON:VideoPlayer.playbackSpeed")}
								<div className="flex items-center ml-auto">
									<span className="text-xs">{playbackSpeed}x</span>
									<i className="ri-arrow-right-s-line" />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent
									className="z-50 text-neutral text-sm w-28 p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-50/10 ring-1 ring-neutral-950/75 shadow-lg rounded-lg overflow-hidden origin-left data-[state='open']:animate-scale-up data-[state='closed']:animate-scale-down"
									sideOffset={6}
									alignOffset={-89}
								>
									<ContextMenu.RadioGroup value={playbackSpeed} onValueChange={handlePlaybackSpeedChange}>
										{PlaybackSpeeds.map((speed) => (
											<ContextMenu.RadioItem
												key={speed}
												className="group relative flex items-center gap-3 pl-[34px] hover:pl-[38px] h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
												value={speed}
											>
												<ContextMenu.ItemIndicator className="absolute left-2 group-data-[highlighted]:left-3 duration-100">
													<i className="ri-check-line" />
												</ContextMenu.ItemIndicator>
												<span className="absolute left-8 group-data-[highlighted]:left-9 duration-100">{`${speed}x`}</span>
											</ContextMenu.RadioItem>
										))}
									</ContextMenu.RadioGroup>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>

						{!props.noDownload && (
							<ContextMenu.Item
								className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
								onClick={downloadVideo}
								disabled={downloading}
							>
								<i className="ri-download-line" />
								{downloading ? `${t("COMMON:downloading")}...` : t("COMMON:download")}
							</ContextMenu.Item>
						)}
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu.Root>
		</div>
	);
}

export default dynamic(() => Promise.resolve(VideoPlayer), {
	ssr: false,
});
