export const getParam = (location, key) => {
  return new URLSearchParams(location.search).has(key);

};

export const hasParam = (location, key) => {
  return new URLSearchParams(location.search).has(key);
};

export const setParam = (location, key, value) => {
  let userQuery = typeof location === 'object' ? location.search : location;
  const query = new URLSearchParams(userQuery).has(key)
  if (query.has(key)) {
    query.delete(key);
    query.append(key, value);
  } else {
    query.append(key, value);
  }
  query.sort();
  return query.toString();
};
