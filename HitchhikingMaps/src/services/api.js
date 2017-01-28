const BASE_URL = 'http://beta.hitchwiki.org/en/api.php?';

export default function request(endpoint, method = 'GET', body) {
  return fetch(BASE_URL + endpoint)
  .then(response => response.json())
  .then(response => {
    if (!response.query) {
      throw new Error('Error retrieving from API.');
    }
    return response.query;
  })
  .catch(error => {throw error;});
}
