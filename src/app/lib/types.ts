// Photo object structure
export interface Photo {
id: string;
created_at: string;
updated_at: string;
width: number;
height: number;
color: string;
blur_hash: string;
description: string | null;
alt_description: string | null;
urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
};
links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
};
likes: number;
liked_by_user: boolean;
current_user_collections: Array<any>;
user: PhotoUser;
}

// User object within Photo structure
export interface PhotoUser {
id: string;
username: string;
name: string;
first_name: string;
last_name: string;
portfolio_url: string | null;
bio: string | null;
location: string | null;
links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
};
profile_image: {
    small: string;
    medium: string;
    large: string;
};
total_collections: number;
total_likes: number;
total_photos: number;
accepted_tos: boolean;
for_hire: boolean;
}

// Response for multiple photos (e.g., search results)
export interface PhotosResponse {
total: number;
results: Photo[];
page: number;
per_page: number;
}

// Response for a single photo
export interface PhotoResponse {
id: string;
created_at: string;
updated_at: string;
description: string | null;
alt_description: string | null;
urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
};
user: PhotoUser;
}