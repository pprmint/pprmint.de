export interface Announcement {
	id: number;
	title: string;
	link?: string;
	linkText?: string;
	buttonColor?: "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "violet" | "pink" | undefined;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	documentId: string;
	media: {
		id: number;
		name: string;
		alternativeText: string | "";
		caption: string;
		width: number;
		height: number;
		formats: {
			thumbnail: {
				name: string;
				hash: string;
				ext: string;
				mime: string;
				path: string;
				width: number;
				height: number;
				size: number;
				sizeInBytes: number;
				url: string;
			};
			large: {
				name: string;
				hash: string;
				ext: string;
				mime: string;
				path: string;
				width: number;
				height: number;
				size: number;
				sizeInBytes: number;
				url: string;
			};
			medium: {
				name: string;
				hash: string;
				ext: string;
				mime: string;
				path: string;
				width: number;
				height: number;
				size: number;
				sizeInBytes: number;
				url: string;
			};
			small: {
				name: string;
				hash: string;
				ext: string;
				mime: string;
				path: string;
				width: number;
				height: number;
				size: number;
				sizeInBytes: number;
				url: string;
			};
		};
		hash: string;
		ext: string;
		mime: string;
		size: number;
		url: string;
		previewUrl: string;
		provider: string;
		provider_metadata: string;
		createdAt: string;
		updatedAt: string;
		locale: string;
		documentId: string;
		publishedAt: string;
	};
}

export interface Announcements {
	data: Announcement[];
}
