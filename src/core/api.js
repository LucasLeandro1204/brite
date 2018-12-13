const cache = new Map();

/**
 * Fetch json.
 */
const get = async path => {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const response = await fetch(`/json/${path}.json`);
  const json = await response.json();

  cache.set(path, json);

  return json;
};

/**
 * Update in memory cache data.
 */
const update = async (path, attributes, key) => {
  const data = cache.get(path);
  const index = data.findIndex(entity => entity[key] === attributes[key]);

  if (index == -1) {
    throw new Error('Entity not found');
  }

  data[index] = Object.assign({}, data[index], attributes);

  return data[index];
};

export default {
  get,
  update,
};
