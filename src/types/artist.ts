export default interface Artist {
	id: number;
	attributes: {
		name: string;
		creditUrl?: string;
		createdAt: string;
		updatedAt: string;
	};
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
