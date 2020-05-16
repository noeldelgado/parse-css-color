const pattern = /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/;
export default new RegExp(pattern, 'i');
