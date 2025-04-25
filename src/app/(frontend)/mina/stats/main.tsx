import config from "@payload-config";
import { getPayload } from "payload";
import AnimatedCounter from "./counter";

export default async function Stats() {
	const payload = await getPayload({ config });
	const allDocs = await payload.find({
		collection: "mina",
		pagination: false,
		limit: undefined,
		select: {
			id: true,
			normalizedDate: true,
			artist: true,
			pixelart: true,
			wholesome: true,
			nsfw: true,
			outfit: true,
			commissionPrice: true,
		},
		sort: "normalizedDate",
	});

	return (
		<div className="grid grid-cols-3 w-full border-x border-black/5 dark:border-white/5 py-12 lg:py-20 xl:py-40">
			<div className="text-center">
				<h3>Total artworks</h3>
				<div className="font-mono text-7xl md:text-8xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
					<AnimatedCounter target={allDocs.docs.length} />
				</div>
			</div>
			<div className="text-center">
				<h3>Commissioned artworks</h3>
				<div className="font-mono text-7xl md:text-8xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
					<AnimatedCounter
						delay={300}
						target={allDocs.docs.filter((doc) => doc.commissionPrice).length}
					/>
				</div>
			</div>
			<div className="text-center">
				<h3>Average commission price</h3>
				<div className="font-mono text-7xl md:text-8xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
					<AnimatedCounter
						unit="€"
						delay={600}
						digits={3}
						target={
							allDocs.docs.reduce(
								(sum, doc) =>
									doc.commissionPrice ? sum + doc.commissionPrice : sum,
								0,
							) / allDocs.docs.filter((doc) => doc.commissionPrice).length
						}
					/>
				</div>
			</div>
		</div>
	);
}
