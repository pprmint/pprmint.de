export default interface Work {
	data: WorkData;
}

export interface WorkData {
	id: number;
	title: string;
	text: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	creationDate: string;
	coverFocus: string;
	dimension: string;
	type: string;
	documentId: string;
	cover: {
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
		documentId: string;
		locale: string;
		publishedAt: string;
	};
	gallery: [
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
			documentId: string;
			locale: string;
			publishedAt: string;
		}
	];
}

export interface WorksMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface Works {
	data: WorkData[];
	meta: WorksMeta;
}
