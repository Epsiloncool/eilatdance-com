export interface User {
	id: number;
	uuid: string;
	email: string;
	password_hash: string;
	role: string;
	name: string;
	phone: string;
	created_at: string;
	bio: object;
	image_url: string;

	// Left-joined fields
	
};
