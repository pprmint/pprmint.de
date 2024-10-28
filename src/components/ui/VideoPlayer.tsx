"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import saveAs from "file-saver";
import { a, useTransition, easings } from "@react-spring/web";

import * as Slider from "@radix-ui/react-slider";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Progress from "@radix-ui/react-progress";
import { useTranslations } from "next-intl";
import Play from "src/icons/Play";
import SkipPrevious from "src/icons/SkipPrevious";
import Pause from "src/icons/Pause";
import VolumeMute from "src/icons/VolumeMute";
import VolumeLow from "src/icons/VolumeLow";
import VolumeMedium from "src/icons/VolumeMedium";
import VolumeHigh from "src/icons/VolumeHigh";
import FullscreenExit from "src/icons/FullscreenExit";
import Fullscreen from "src/icons/Fullscreen";
import Reload from "src/icons/Reload";
import Check from "src/icons/Check";
import LinkDiagonal from "src/icons/LinkDiagonal";
import Speed75 from "src/icons/Speed75";
import ChevronRight from "src/icons/ChevronRight";
import Download from "src/icons/Download";

function VideoPlayer(props: {
	src: string;
	title?: string;
	poster?: string;
	noSound?: boolean;
	noDownload?: boolean;
	loopDefault?: boolean;
	key?: string;
}) {
	const t = useTranslations("COMMON");

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
		const currentVideoRef = videoRef.current;

		if (currentVideoRef) {
			currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
			currentVideoRef.addEventListener("loadedmetadata", handleLoadedMetadata);
			return () => {
				currentVideoRef?.removeEventListener("timeupdate", handleTimeUpdate);
				currentVideoRef?.removeEventListener("loadedmetadata", handleLoadedMetadata);
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
			key={props.key}
			className={`relative overflow-hidden ${fullscreen ? "bg-black" : "bg-neutral-900"} ${
				showControls ? "cursor-auto" : "cursor-none"
			}`}
			ref={videoPlayerRef}
		>
			{playButtonTransition(
				(style, item) =>
					item && (
						// @ts-expect-error
						<a.div
							onClick={handlePlay}
							style={style}
							className="absolute flex items-center justify-center w-full h-full z-10"
						>
							<button className="flex items-center justify-center z-10 size-24 md:size-32 bg-neutral-950/30 hover:bg-neutral-950/40 text-neutral-50 rounded-full cursor-pointer duration-100">
								<Play className="size-16 ml-2" />
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
							// @ts-expect-error
							<a.div
								style={style}
								className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-neutral-950/90"
							>
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
								<p className="text-neutral-50 text-xs text-right mt-1 mb-2 mr-2 drop-shadow-md">
									{t("downloading")}: <span className="font-semibold">{progress}%</span>
								</p>
							</a.div>
						)
				)}
				{props.title &&
					topTransition(
						(style, item) =>
							item && (
								// @ts-expect-error
								<a.div
									style={style}
									className="absolute top-0 left-0 right-0 p-6 z-20 h-20 bg-gradient-to-b from-neutral-950/90 duration-500 ease-out-expo"
								>
									<p className="font-display text-2xl text-neutral-50">{props.title}</p>
								</a.div>
							)
					)}
				{bottomTransition(
					(style, item) =>
						item && (
							// @ts-expect-error
							<a.div
								style={style}
								className="absolute flex flex-col justify-end bottom-0 left-0 right-0 p-3 h-28 z-20 bg-gradient-to-t from-neutral-950/90 duration-500 ease-out-expo"
							>
								<div className="absolute flex items-center gap-5 top-10 inset-x-5 font-mono font-medium text-neutral-50 text-xs">
									<span>{formattedTime(currentTime)}</span>
									<Slider.Root
										value={[currentTime]}
										onValueChange={(newTime) => handleSeek(newTime)}
										min={0}
										max={duration}
										step={0.001}
										className="group/videoslider relative flex items-center select-none touch-none w-full h-6 cursor-pointer"
									>
										<Slider.Track className="bg-neutral-50/30 relative grow h-px group-hover/videoslider:h-[3px] rounded-full duration-100">
											<Slider.Range className="absolute bg-neutral-50 h-[3px] -top-px group-hover/videoslider:top-0 rounded-full duration-100" />
										</Slider.Track>
									</Slider.Root>
									<span onClick={toggleRemaining} className="mb-0 text-right cursor-pointer">
										{showRemaining
											? `-${formattedTime(duration - currentTime)}`
											: formattedTime(duration)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<button
										className="p-2 bg-neutral-50/0 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-2xl duration-100"
										onClick={handlePlay}
										aria-label="pause/play"
									>
										{currentTime === duration ? <SkipPrevious /> : playing ? <Pause /> : <Play />}
									</button>
									<div className="flex gap-2">
										{!props.noSound && (
											<div className="flex gap-3 flex-nowrap items-center justify-end w-[31px] hover:w-40 h-[31px] bg-neutral-50/0 hover:bg-neutral-50/10 duration-300 ease-out-expo overflow-hidden rounded-full">
												<div>
													<Slider.Root
														value={[volume]}
														onValueChange={(newVolume) => handleVolumeChange(newVolume)}
														min={0}
														max={1}
														step={0.1}
														className="group/videoslider relative flex items-center select-none touch-none w-24 h-4 cursor-pointer"
													>
														<Slider.Track className="bg-neutral-50/30 relative grow h-px group-hover/videoslider:h-[3px] rounded-full duration-100">
															<Slider.Range className="absolute bg-neutral-50 h-[3px] -top-px group-hover/videoslider:top-0 rounded-full duration-100" />
														</Slider.Track>
													</Slider.Root>
												</div>
												<div>
													<button
														className={`ml-auto p-2 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-xl duration-100`}
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
										)}
										<button
											className="p-2 hover:bg-neutral-50/20 active:bg-neutral-50/10 rounded-full text-neutral-50 text-xl duration-100"
											onClick={handleFullscreen}
											aria-label="enter/exit fullscreen"
										>
											{fullscreen ? <FullscreenExit /> : <Fullscreen />}
										</button>
									</div>
								</div>
							</a.div>
						)
				)}
				<ContextMenu.Portal>
					<ContextMenu.Content className="z-50 text-neutral text-sm w-60 p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-lg rounded-lg overflow-hidden origin-[var(--radix-context-menu-content-transform-origin)] data-[state='open']:animate-scale-up data-[state='closed']:animate-scale-down">
						<ContextMenu.CheckboxItem
							className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
							checked={loopEnabled}
							onCheckedChange={setLoopEnabled}
						>
							<Reload />
							{t("VideoPlayer.loop")}
							<ContextMenu.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
								<Check />
							</ContextMenu.ItemIndicator>
						</ContextMenu.CheckboxItem>
						<ContextMenu.Item
							className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
							onClick={copyVideoUrl}
						>
							<LinkDiagonal />
							{t("VideoPlayer.copyVideoUrl")}
						</ContextMenu.Item>

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 data-[state='open']:pl-3 h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state='open']:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 data-[state='open']:bg-neutral-50/10 duration-100 cursor-pointer focus-visible:outline-none">
								<Speed75 />
								{t("VideoPlayer.playbackSpeed")}
								<div className="flex items-center ml-auto">
									<span className="text-xs">{playbackSpeed}x</span>
									<ChevronRight />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent
									className="z-50 text-neutral text-sm w-28 p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-lg rounded-lg overflow-hidden origin-left data-[state='open']:animate-scale-up data-[state='closed']:animate-scale-down"
									sideOffset={4}
									alignOffset={-89}
								>
									<ContextMenu.RadioGroup
										value={playbackSpeed}
										onValueChange={handlePlaybackSpeedChange}
									>
										{PlaybackSpeeds.map((speed) => (
											<ContextMenu.RadioItem
												key={speed}
												className="group relative flex items-center gap-3 pl-[34px] hover:pl-[38px] h-7 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
												value={speed}
											>
												<ContextMenu.ItemIndicator className="absolute left-2 group-data-[highlighted]:left-3 duration-100">
													<Check />
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
								<Download />
								{downloading ? `${t("downloading")}...` : t("download")}
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
