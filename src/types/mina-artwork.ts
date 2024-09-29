import Artist from "./artist";

export default interface MinaArtwork {
	id: number;
	artist: Artist;
	pixelart: boolean;
	nsfw: boolean;
	heart: boolean;
	creationDate: string;
	focus: string;
	createdAt: string;
	updatedAt: string;
	documentId: string;
	locale: string;
	publishedAt: string;
	artwork: [
		{
			id: number;
			name: string;
			alternativeText: string;
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
		}
	];
}

export interface MinaArtworksMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface MinaArtworks {
	data: MinaArtwork[];
	meta: MinaArtworksMeta;
}
