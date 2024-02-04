export default interface MinaArtwork {
	id: number;
	attributes: {
		artist: string;
		creditUrl?: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		nsfw: boolean;
		heart: boolean;
		creationDate: string;
		focus: string;
		artwork: {
			data: {
				id: number;
				attributes: {
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
				};
			};
		};
	};
}

export interface MinaArtworks {
    data: MinaArtwork[];
}