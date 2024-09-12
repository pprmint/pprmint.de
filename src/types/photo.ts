export interface Photo {
	id: number;
	attributes: {
		dateTime: string;
		iso: number;
		focalLength: number;
		aperture: number;
		shutter: string;
		photo: {
			data: {
				id: number;
				attributes: {
					url: string;
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
				};
			};
		};
		camera: {
			data: {
				id: number;
				attributes: {
					name: string;
					logo: {
						data?: {
							id: number;
							attributes: {
								url: string;
								width: number;
								height: number;
							};
						};
					};
				};
			};
		};
		lens: {
			data: {
				id: 1;
				attributes: {
					name: string;
				};
			};
		};
	};
}

export interface PhotosMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface Photos {
	data: Photo[];
	meta: PhotosMeta;
}
