export default interface Artist {
	id: number;
	name: string;
	creditUrl?: string;
	createdAt: string;
	updatedAt: string;
	documentId: string;
	locale: string;
	publishedAt: string;
}

export interface ArtistsMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface Artists {
	data: Artist[];
	meta: ArtistsMeta;
}
