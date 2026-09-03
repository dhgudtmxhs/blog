const base = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`;

export function sitePath(path = '') {
	return `${base}${path.replace(/^\/+/, '')}`;
}

export function postPath(id: string) {
	const encodedId = id.split('/').map(encodeURIComponent).join('/');
	return sitePath(`posts/${encodedId}/`);
}

export function tagSlug(tag: string) {
	return tag
		.trim()
		.normalize('NFKC')
		.toLocaleLowerCase('ko-KR')
		.replace(/[^\p{Letter}\p{Number}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
}

export function tagPath(tag: string) {
	return sitePath(`tags/${tagSlug(tag)}/`);
}
