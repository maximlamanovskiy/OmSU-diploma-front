function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
}

export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then(response => checkStatus(response))
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function post(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  })
    .then(response => checkStatus(response))
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

export function remove(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then(response => checkStatus(response))
    .catch(error => {
      throw error;
    });
}

export function update(url, body) {
  return fetch(url, {
    method: 'PUT',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  })
    .then(response => checkStatus(response))
    .catch(error => {
      throw error;
    });
}
