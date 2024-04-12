import FadingImage from "src/components/ui/FadingImage";
import MinaWaiting from "public/assets/mina64.gif";

export default function Loading() {
	return (
		<div className="w-full h-[calc(100vh_-_176px_-_6rem)] relative">
			<FadingImage
				src={MinaWaiting}
				alt="Pixel art of Mina, with a swaying ahoge."
				className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%_+_176px_-_3rem)] size-32"
				style={{ imageRendering: "pixelated" }}
			/>
		</div>
	);
}
