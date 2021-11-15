module.exports = {
  'GET /restaurants/(.+)/dishes?(.+)': ['restaurant', 'customer'],
  'POST /restaurants/(.+)/dishes': ['restaurant'],
  'PUT /restaurants/(.+)/dishes?(.+)': ['restaurant'],
  'DELETE /restaurants/(.+)/dishes?(.+)': ['restaurant'],
  'GET /restaurants?(.+)': ['restaurant', 'customer', 'admin'],
  'POST /restaurants': ['restaurant'],
  'PUT /restaurants/(.+)': ['restaurant'],
  'DELETE /restaurants/(.+)': ['admin'],
  'GET /media?(.+)': ['restaurant', 'customer'],
  'POST /media': ['restaurant'],
  'PUT /media?(.+)': ['restaurant'],
  'DELETE /media?(.+)': ['restaurant'],
};
