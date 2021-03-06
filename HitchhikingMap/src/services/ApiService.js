const BASE_URL = 'http://beta.hitchwiki.org/en/api.php';

export default function request(endpoint, method = 'GET', body) {
  // console.log(`Fetching ${BASE_URL}?${endpoint}&utf8=1`);
  return fetch(`${BASE_URL}?${endpoint}&utf8=1`, { // eslint-disable-line no-undef
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then((response) => {
    if (response.error) {
      throw response.error;
    }
    if (response.query) {
      return response.query;
    }
    return response;
  })
  .catch((error) => { throw error; });
}
