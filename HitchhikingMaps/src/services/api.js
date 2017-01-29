const BASE_URL = 'http://beta.hitchwiki.org/en/api.php';

export default function request(endpoint, method = 'GET', body) {
  console.log('Fetching...');
  return fetch(`${BASE_URL}?${endpoint}&utf8=1`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then((response) => {
    if (!response.query) {
      throw new Error('Error retrieving from API.');
    }
    return response.query;
  })
  .catch((error) => { throw error; });
}
