const cache = new Map();

/**
 * Fetch json.
 */
const get = async path => {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const response = await fetch(`/json/${path}.json`);

  return response.json();
};

/**
 * Update in memory cache data.
 */
const update = async (path, id, attributes, key = 'id') => {
  const data = cache.get(path);
  const entity = data.find(entity => entity[key] === id);

  if (! entity) {
    throw new Error('Entity not found');
  }

  return entity;
};

export default {
  get,
  update,
};
