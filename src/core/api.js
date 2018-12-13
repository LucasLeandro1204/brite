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
  const index = data.findIndex(entity => entity[key] === id);

  if (index == -1) {
    throw new Error('Entity not found');
  }

  /**
   * Hack to prevent updating ID.
   */
  attributes[key] = id;

  data[index] = Object.assign({}, data[index], attributes);

  return data[index];
};

export default {
  get,
  update,
};
