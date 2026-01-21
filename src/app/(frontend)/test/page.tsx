import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import VideoPlayer from "@/components/ui/VideoPlayer";
import AudioPlayer from "@/components/ui/AudioPlayer";
import Image from "next/image";

import Seyana from "@public/assets/mina/sticker_seyana.webp";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import GlowingSpinner from "@/components/loading/GlowingSpinner";

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
				<div className="flex p-6 gap-12 flex-wrap">
					<LoadingSpinner />
					<GlowingSpinner />
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
			<section id="colors" className="w-full border-x border-black/5 dark:border-white/5 flex pb-40">
				<div className="grid grid-rows-11 w-full">
					<div className="w-full h-12 bg-red-50" />
					<div className="w-full h-12 bg-red-100" />
					<div className="w-full h-12 bg-red-200" />
					<div className="w-full h-12 bg-red-300" />
					<div className="w-full h-12 bg-red-400" />
					<div className="w-full h-12 bg-red-500" />
					<div className="w-full h-12 bg-red-600" />
					<div className="w-full h-12 bg-red-700" />
					<div className="w-full h-12 bg-red-800" />
					<div className="w-full h-12 bg-red-900" />
					<div className="w-full h-12 bg-red-950" />
				</div>
				<div className="grid grid-rows-11 w-full">
					<div className="w-full h-12 bg-yellow-50" />
					<div className="w-full h-12 bg-yellow-100" />
					<div className="w-full h-12 bg-yellow-200" />
					<div className="w-full h-12 bg-yellow-300" />
					<div className="w-full h-12 bg-yellow-400" />
					<div className="w-full h-12 bg-yellow-500" />
					<div className="w-full h-12 bg-yellow-600" />
					<div className="w-full h-12 bg-yellow-700" />
					<div className="w-full h-12 bg-yellow-800" />
					<div className="w-full h-12 bg-yellow-900" />
					<div className="w-full h-12 bg-yellow-950" />
				</div>
				<div className="grid grid-rows-11 w-full">
					<div className="w-full h-12 bg-green-50" />
					<div className="w-full h-12 bg-green-100" />
					<div className="w-full h-12 bg-green-200" />
					<div className="w-full h-12 bg-green-300" />
					<div className="w-full h-12 bg-green-400" />
					<div className="w-full h-12 bg-green-500" />
					<div className="w-full h-12 bg-green-600" />
					<div className="w-full h-12 bg-green-700" />
					<div className="w-full h-12 bg-green-800" />
					<div className="w-full h-12 bg-green-900" />
					<div className="w-full h-12 bg-green-950" />
				</div>
				<div className="grid grid-rows-11 w-full">
					<div className="w-full h-12 bg-blue-50" />
					<div className="w-full h-12 bg-blue-100" />
					<div className="w-full h-12 bg-blue-200" />
					<div className="w-full h-12 bg-blue-300" />
					<div className="w-full h-12 bg-blue-400" />
					<div className="w-full h-12 bg-blue-500" />
					<div className="w-full h-12 bg-blue-600" />
					<div className="w-full h-12 bg-blue-700" />
					<div className="w-full h-12 bg-blue-800" />
					<div className="w-full h-12 bg-blue-900" />
					<div className="w-full h-12 bg-blue-950" />
				</div>
				<div className="grid grid-rows-11 w-full">
					<div className="w-full h-12 bg-violet-50" />
					<div className="w-full h-12 bg-violet-100" />
					<div className="w-full h-12 bg-violet-200" />
					<div className="w-full h-12 bg-violet-300" />
					<div className="w-full h-12 bg-violet-400" />
					<div className="w-full h-12 bg-violet-500" />
					<div className="w-full h-12 bg-violet-600" />
					<div className="w-full h-12 bg-violet-700" />
					<div className="w-full h-12 bg-violet-800" />
					<div className="w-full h-12 bg-violet-900" />
					<div className="w-full h-12 bg-violet-950" />
				</div>
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
					<Button color="yellow">Button</Button>
					<Button color="green">Button</Button>
					<Button color="blue">Button</Button>
					<Button color="violet">Button</Button>
				</div>
				<h3>Semi-transparent</h3>
				<div className="flex gap-3 flex-wrap">
					<Button design="semi-transparent">Button</Button>
					<Button design="semi-transparent" color="red">
						Button
					</Button>
					<Button design="semi-transparent" color="yellow">
						Button
					</Button>
					<Button design="semi-transparent" color="green">
						Button
					</Button>
					<Button design="semi-transparent" color="blue">
						Button
					</Button>
					<Button design="semi-transparent" color="violet">
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
					<Button design="filled" color="yellow">
						Button
					</Button>
					<Button design="filled" color="green">
						Button
					</Button>
					<Button design="filled" color="blue">
						Button
					</Button>
					<Button design="filled" color="violet">
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
					<Button design="outlined" color="yellow">
						Button
					</Button>
					<Button design="outlined" color="green">
						Button
					</Button>
					<Button design="outlined" color="blue">
						Button
					</Button>
					<Button design="outlined" color="violet">
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
					<Checkbox color="yellow" />
					<Checkbox color="green" />
					<Checkbox color="blue" />
					<Checkbox color="violet" />
					<Checkbox disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox checked />
					<Checkbox checked color="red" />
					<Checkbox checked color="yellow" />
					<Checkbox checked color="green" />
					<Checkbox checked color="blue" />
					<Checkbox checked color="violet" />
					<Checkbox checked disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox large />
					<Checkbox large color="red" />
					<Checkbox large color="yellow" />
					<Checkbox large color="green" />
					<Checkbox large color="blue" />
					<Checkbox large color="violet" />
					<Checkbox large disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox large checked />
					<Checkbox large checked color="red" />
					<Checkbox large checked color="yellow" />
					<Checkbox large checked color="green" />
					<Checkbox large checked color="blue" />
					<Checkbox large checked color="violet" />
					<Checkbox large checked disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border />
					<Checkbox border color="red" />
					<Checkbox border color="yellow" />
					<Checkbox border color="green" />
					<Checkbox border color="blue" />
					<Checkbox border color="violet" />
					<Checkbox border disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border checked />
					<Checkbox border checked color="red" />
					<Checkbox border checked color="yellow" />
					<Checkbox border checked color="green" />
					<Checkbox border checked color="blue" />
					<Checkbox border checked color="violet" />
					<Checkbox border checked disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border large />
					<Checkbox border large color="red" />
					<Checkbox border large color="yellow" />
					<Checkbox border large color="green" />
					<Checkbox border large color="blue" />
					<Checkbox border large color="violet" />
					<Checkbox border large disabled />
				</div>
				<div className="flex gap-3">
					<Checkbox border large checked />
					<Checkbox border large checked color="red" />
					<Checkbox border large checked color="yellow" />
					<Checkbox border large checked color="green" />
					<Checkbox border large checked color="blue" />
					<Checkbox border large checked color="violet" />
					<Checkbox border large checked disabled />
				</div>
			</section>
		</main>
	);
}
