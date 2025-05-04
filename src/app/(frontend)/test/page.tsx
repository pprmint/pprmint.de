import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import VideoPlayer from "@/components/ui/VideoPlayer";
import AudioPlayer from "@/components/ui/AudioPlayer";
import Image from "next/image";

import Seyana from "/public/assets/mina/sticker_seyana.webp";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export async function generateMetadata() {
	return {
		title: "Test page",
		description: "Check out some random UI elements and unfinished stuff.",
	};
}

export default function Page() {
	return (
		<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
			<section className="py-40 w-full border-x border-black/5 dark:border-white/5">
				<h2>Loading things</h2>
				<div className="flex flex-wrap justify-between">
					<LoadingSpinner />
				</div>
			</section>
			<section className="pb-40 w-full border-x border-black/5 dark:border-white/5">
				<h2>Audio player</h2>
				<div className="flex flex-wrap justify-between">
					<AudioPlayer src="/sounds/intro.wav" title="New intro sound" artist="pomifuri">
						<Image src={Seyana} alt="" className="size-full object-cover" />
					</AudioPlayer>
					<AudioPlayer src="/sounds/Intro_old.wav" title="Old intro sound" artist="pprmint." />
				</div>
			</section>
			<section className="pb-40 w-full border-x border-black/5 dark:border-white/5">
				<h2>Video player</h2>
				<VideoPlayer src="/api/download/file/Takashi.mp4" />
			</section>
			<section id="texts" className="pb-40 w-full border-x border-black/5 dark:border-white/5">
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
			<section
				id="buttons"
				className="w-full border-x border-black/5 dark:border-white/5 flex flex-col gap-6 pb-40 flex-wrap"
			>
				<h2>Buttons</h2>
				<h3>Regular (transparent)</h3>
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
				<h3>Semi-transparent</h3>
				<div className="flex gap-3 flex-wrap">
					<Button design="semi-transparent">Button</Button>
					<Button design="semi-transparent" color="red">
						Button
					</Button>
					<Button design="semi-transparent" color="orange">
						Button
					</Button>
					<Button design="semi-transparent" color="yellow">
						Button
					</Button>
					<Button design="semi-transparent" color="lime">
						Button
					</Button>
					<Button design="semi-transparent" color="green">
						Button
					</Button>
					<Button design="semi-transparent" color="cyan">
						Button
					</Button>
					<Button design="semi-transparent" color="blue">
						Button
					</Button>
					<Button design="semi-transparent" color="violet">
						Button
					</Button>
					<Button design="semi-transparent" color="pink">
						Button
					</Button>
					<Button design="semi-transparent" disabled>
						Button
					</Button>
				</div>
				<h3>Filled</h3>
				<div className="flex gap-3 flex-wrap">
					<Button design="filled">Button</Button>
					<Button design="filled" color="red">
						Button
					</Button>
					<Button design="filled" color="orange">
						Button
					</Button>
					<Button design="filled" color="yellow">
						Button
					</Button>
					<Button design="filled" color="lime">
						Button
					</Button>
					<Button design="filled" color="green">
						Button
					</Button>
					<Button design="filled" color="cyan">
						Button
					</Button>
					<Button design="filled" color="blue">
						Button
					</Button>
					<Button design="filled" color="violet">
						Button
					</Button>
					<Button design="filled" color="pink">
						Button
					</Button>
					<Button design="filled" disabled>
						Button
					</Button>
				</div>
				<h3>Outlined</h3>
				<div className="flex gap-3 flex-wrap">
					<Button design="outlined">Button</Button>
					<Button design="outlined" color="red">
						Button
					</Button>
					<Button design="outlined" color="orange">
						Button
					</Button>
					<Button design="outlined" color="yellow">
						Button
					</Button>
					<Button design="outlined" color="lime">
						Button
					</Button>
					<Button design="outlined" color="green">
						Button
					</Button>
					<Button design="outlined" color="cyan">
						Button
					</Button>
					<Button design="outlined" color="blue">
						Button
					</Button>
					<Button design="outlined" color="violet">
						Button
					</Button>
					<Button design="outlined" color="pink">
						Button
					</Button>
					<Button design="outlined" disabled>
						Button
					</Button>
				</div>
			</section>
			<section className="w-full border-x border-black/5 dark:border-white/5 flex flex-col gap-6 pb-40">
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
