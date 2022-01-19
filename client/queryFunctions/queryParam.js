export const getQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.get(key);
};

export const hasQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.has(key);
};

export const setQueryParam = (location, key, val) => {
  let rawQuery = typeof location === 'object' ? location.search : location;
  const query = new URLSearchParams(rawQuery);
  if (query.has(key)) {
    query.delete(key);
    query.append(key, val);
  } else {
    query.append(key, val);
  }
  query.sort();
  return query.toString();
};
