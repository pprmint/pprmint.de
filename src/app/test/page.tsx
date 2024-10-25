import Button from "src/components/ui/Button";
import Checkbox from "src/components/ui/Checkbox";
import VideoPlayer from "src/components/ui/VideoPlayer";
import AudioPlayer from "src/components/ui/AudioPlayer";
import Image from "next/image";

import Seyana from "public/assets/mina/sticker_seyana.webp";

export async function generateMetadata() {
	return {
		title: "Test page",
		description: "Check out some random UI elements and unfinished stuff.",
	};
}

export default function Page() {
	return (
		<main className="min-h-screen max-w-7xl mx-auto pt-48 px-6 md:px-9">
			<section className="mb-48">
				<h2>Audio player</h2>
				<div className="flex flex-wrap justify-between">
					<AudioPlayer src="/sounds/intro.wav" title="New intro sound" artist="pomifuri">
						<Image src={Seyana} alt="" className="size-full object-cover" />
					</AudioPlayer>
					<AudioPlayer src="/sounds/Intro_old.wav" title="Old intro sound" artist="pprmint." />
				</div>
			</section>
			<section className="mb-48">
				<h2>Video player</h2>
				<VideoPlayer src="https://static.pprmint.de/videos/Takashi.mp4" />
			</section>
			<section id="texts" className="mb-48">
				<h1>The quick brown fox jumps over the lazy dog. 1234567890</h1>
				<h2>The quick brown fox jumps over the lazy dog. 1234567890</h2>
				<h3>The quick brown fox jumps over the lazy dog. 1234567890</h3>
				<h4>The quick brown fox jumps over the lazy dog. 1234567890</h4>
				<h5>The quick brown fox jumps over the lazy dog. 1234567890</h5>
				<h6>The quick brown fox jumps over the lazy dog. 1234567890</h6>
				<p>The quick brown fox jumps over the lazy dog. 1234567890</p>
				<p className="text-link">Internal link</p>
				<p className="text-link-external">External link</p>
			</section>
			<section id="buttons" className="flex flex-col gap-6 mb-48 flex-wrap">
				<h2>Buttons</h2>
				<div className="flex gap-3 flex-wrap">
					<Button>Button</Button>
					<Button color="red">Button</Button>
					<Button color="orange">Button</Button>
					<Button color="yellow">Button</Button>
					<Button color="lime">Button</Button>
					<Button color="green">Button</Button>
					<Button color="cyan">Button</Button>
					<Button color="blue">Button</Button>
					<Button color="violet">Button</Button>
					<Button color="pink">Button</Button>
					<Button disabled color="pink">Button</Button>
				</div>
				<div className="flex gap-3 flex-wrap">
					<Button outlined>Button</Button>
					<Button outlined color="red">
						Button
					</Button>
					<Button outlined color="orange">
						Button
					</Button>
					<Button outlined color="yellow">
						Button
					</Button>
					<Button outlined color="lime">
						Button
					</Button>
					<Button outlined color="green">
						Button
					</Button>
					<Button outlined color="cyan">
						Button
					</Button>
					<Button outlined color="blue">
						Button
					</Button>
					<Button outlined color="violet">
						Button
					</Button>
					<Button outlined color="pink">
						Button
					</Button>
					<Button disabled outlined color="pink">
						Button
					</Button>
				</div>
				<div className="flex gap-3 flex-wrap">
					<Button large>Button</Button>
					<Button large color="red">
						Button
					</Button>
					<Button large color="orange">
						Button
					</Button>
					<Button large color="yellow">
						Button
					</Button>
					<Button large color="lime">
						Button
					</Button>
					<Button large color="green">
						Button
					</Button>
					<Button large color="cyan">
						Button
					</Button>
					<Button large color="blue">
						Button
					</Button>
					<Button large color="violet">
						Button
					</Button>
					<Button large color="pink">
						Button
					</Button>
					<Button disabled large color="pink">
						Button
					</Button>
				</div>
				<div className="flex gap-3 flex-wrap">
					<Button large outlined>
						Button
					</Button>
					<Button large outlined color="red">
						Button
					</Button>
					<Button large outlined color="orange">
						Button
					</Button>
					<Button large outlined color="yellow">
						Button
					</Button>
					<Button large outlined color="lime">
						Button
					</Button>
					<Button large outlined color="green">
						Button
					</Button>
					<Button large outlined color="cyan">
						Button
					</Button>
					<Button large outlined color="blue">
						Button
					</Button>
					<Button large outlined color="violet">
						Button
					</Button>
					<Button large outlined color="pink">
						Button
					</Button>
					<Button disabled large outlined color="pink">
						Button
					</Button>
				</div>
			</section>
			<section className="flex flex-col gap-6 mb-48">
				<h2>Checkboxes</h2>
				<div className="flex gap-3">
					<Checkbox />
					<Checkbox color="red" />
					<Checkbox color="orange" />
					<Checkbox color="yellow" />
					<Checkbox color="lime" />
					<Checkbox color="green" />
					<Checkbox color="cyan" />
					<Checkbox color="blue" />
					<Checkbox color="violet" />
					<Checkbox color="pink" />
					<Checkbox disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox checked />
					<Checkbox checked color="red" />
					<Checkbox checked color="orange" />
					<Checkbox checked color="yellow" />
					<Checkbox checked color="lime" />
					<Checkbox checked color="green" />
					<Checkbox checked color="cyan" />
					<Checkbox checked color="blue" />
					<Checkbox checked color="violet" />
					<Checkbox checked color="pink" />
					<Checkbox checked disabled />
				</div>
			</section>
		</main>
	);
}
