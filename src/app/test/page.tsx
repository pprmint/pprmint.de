import Button from "src/components/ui/Button";
import Checkbox from "src/components/ui/Checkbox";
import VideoPlayer from "src/components/ui/VideoPlayer";
import AudioPlayer from "src/components/ui/AudioPlayer";
import Image from "next/image";

import Seyana from "public/assets/mina/sticker_seyana.webp";
import Spinner from "src/components/loading/Glow";

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
				<h2>Loading things</h2>
				<div className="flex flex-wrap justify-between">
					<Spinner />
				</div>
			</section>
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
					<Button disabled color="pink">
						Button
					</Button>
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
				<div className="flex gap-3">
					<Checkbox large />
					<Checkbox large color="red" />
					<Checkbox large color="orange" />
					<Checkbox large color="yellow" />
					<Checkbox large color="lime" />
					<Checkbox large color="green" />
					<Checkbox large color="cyan" />
					<Checkbox large color="blue" />
					<Checkbox large color="violet" />
					<Checkbox large color="pink" />
					<Checkbox large disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox large checked />
					<Checkbox large checked color="red" />
					<Checkbox large checked color="orange" />
					<Checkbox large checked color="yellow" />
					<Checkbox large checked color="lime" />
					<Checkbox large checked color="green" />
					<Checkbox large checked color="cyan" />
					<Checkbox large checked color="blue" />
					<Checkbox large checked color="violet" />
					<Checkbox large checked color="pink" />
					<Checkbox large checked disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border />
					<Checkbox border color="red" />
					<Checkbox border color="orange" />
					<Checkbox border color="yellow" />
					<Checkbox border color="lime" />
					<Checkbox border color="green" />
					<Checkbox border color="cyan" />
					<Checkbox border color="blue" />
					<Checkbox border color="violet" />
					<Checkbox border color="pink" />
					<Checkbox border disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border checked />
					<Checkbox border checked color="red" />
					<Checkbox border checked color="orange" />
					<Checkbox border checked color="yellow" />
					<Checkbox border checked color="lime" />
					<Checkbox border checked color="green" />
					<Checkbox border checked color="cyan" />
					<Checkbox border checked color="blue" />
					<Checkbox border checked color="violet" />
					<Checkbox border checked color="pink" />
					<Checkbox border checked disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border large />
					<Checkbox border large color="red" />
					<Checkbox border large color="orange" />
					<Checkbox border large color="yellow" />
					<Checkbox border large color="lime" />
					<Checkbox border large color="green" />
					<Checkbox border large color="cyan" />
					<Checkbox border large color="blue" />
					<Checkbox border large color="violet" />
					<Checkbox border large color="pink" />
					<Checkbox border large disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border large checked />
					<Checkbox border large checked color="red" />
					<Checkbox border large checked color="orange" />
					<Checkbox border large checked color="yellow" />
					<Checkbox border large checked color="lime" />
					<Checkbox border large checked color="green" />
					<Checkbox border large checked color="cyan" />
					<Checkbox border large checked color="blue" />
					<Checkbox border large checked color="violet" />
					<Checkbox border large checked color="pink" />
					<Checkbox border large checked disabled />
				</div>
			</section>
		</main>
	);
}
