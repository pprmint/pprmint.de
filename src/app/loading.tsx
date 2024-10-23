import FadingImage from "src/components/ui/FadingImage";
import MinaWaiting from "public/assets/mina64.gif";

export default function Loading() {
	return (
		<div className="w-full h-screen relative">
			<FadingImage
				src={MinaWaiting}
				unoptimized
				alt="Pixel art of Mina, with a swaying ahoge."
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32"
				style={{ imageRendering: "pixelated" }}
			/>
		</div>
	);
}
