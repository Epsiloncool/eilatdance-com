
export interface Post {
	id: number;
	slug: string;
	image_url: string;
	author_id: number;
	is_published: number;
	published_at: string;
	title: object;
	excerpt: object;
	content: object;
	created_at: string;
	category_id: number;
	quote: object;
	is_featured: number;
	seo_title: object;
	seo_description: object;
	seo_keywords: object;
	seo_canonical: object;
	related_ids: object;

	// Left-joined fields
	category_name: object;
	category_color: string;
	category_gradient: string;
	author_name: string;
	author_bio: object;
	relatedPosts: Post[];
};
