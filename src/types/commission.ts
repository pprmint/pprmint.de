export default interface Commission {
	data: {
		id: number;
		attributes: {
			totalSlots2D: number;
			filledSlots2D: number;
			status: "closed" | "limited" | "open";
			totalSlots3D: number;
			filledSlots3D: number;
			totalSlotsAnim: number;
			filledSlotsAnim: number;
			totalSlotsWeb: number;
			filledSlotsWeb: number;
			createdAt: string;
			updatedAt: string;
			price2D: string;
			priceAnim: string;
			price3D: string;
			priceWeb: string;
		};
	};
	meta: {};
}
