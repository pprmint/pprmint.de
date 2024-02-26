import VideoPlayer from "src/components/VideoPlayer";
import Chatbox from "src/components/Chatbox";
import Head from "src/components/Head";

export default function Test() {
	return (
		<>
			<Head title="Takashi" description="Helvetica Standard." />
			<main className="flex min-h-screen items-center justify-center max-w-6xl mx-auto">
				<VideoPlayer src="https://static.pprmint.art/videos/Takashi.mp4" title="Takashi" />
			</main>
		</>
	);
}
