export default interface Work {
	data: WorkData;
}

export interface WorkData {
	id: number;
	attributes: {
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
		cover: {
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
		gallery: {
			data: [
				{
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
				}
			];
		};
	};
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
