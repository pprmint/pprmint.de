"use server";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export async function incrementPats(increment: number) {
	const payload = await getPayload({ config: configPromise });

	const globalPatCount = await payload.findGlobal({
		slug: "minaPats",
	});
	const newPatCount = globalPatCount.pats + increment;

	try {
		await payload.db.updateGlobal({
			slug: "minaPats",
			data: {
				pats: newPatCount,
			},
		});
		return newPatCount;
	} catch (error) {
		console.log(`Error updating the global pat count. Was supposed to add: ${increment}`);
		console.log(error);
		throw new Error(
			"Failed to increment global pat count.\nNag me via email or your favorite social media site to make me fix this, preferably with a timestamp."
		);
	}
}
