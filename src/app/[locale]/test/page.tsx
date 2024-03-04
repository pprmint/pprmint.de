import Button from "src/components/ui/Button";
import Checkbox from "src/components/ui/Checkbox";

export default function Page() {
	return (
		<main className="min-h-screen max-w-7xl mx-auto pt-48">
			<section id="buttons" className="flex flex-col gap-6 mb-48">
				<h2>Buttons</h2>
				<div className="flex gap-3">
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
				</div>
				<div className="flex gap-3">
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
				</div>
				<div className="flex gap-3">
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
				</div>
				<div className="flex gap-3">
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
