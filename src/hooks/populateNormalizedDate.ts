import type { CollectionBeforeChangeHook } from "payload";

export const populateNormalizedDate: CollectionBeforeChangeHook = ({
	data,
}) => {
	if (data?.date) {
		const date = new Date(data.date);
		// Get the local timezone offset in minutes, because us cavemen still have to fuck around with DST.
		const timezoneOffset = date.getTimezoneOffset();
		// Apply the timezone offset in milliseconds.
		const normalizedDate = new Date(date.getTime() - timezoneOffset * 60000);
		// Set the normalizedDate field before saving the document.
		data.normalizedDate = normalizedDate;
	}
	return data;
};
