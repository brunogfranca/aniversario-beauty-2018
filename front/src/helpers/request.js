export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    return response.json().then(json => {
      return Promise.reject({
        status: response.status,
        ok: false,
        statusText: response.statusText,
        body: json
      });
    });
  };

export const parseJSON = response => {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
  };

export const handleError = error => {
    error.response = {
      status: 0,
      statusText:
        "Cannot connect. Please make sure you are connected to internet."
    };
    throw error;
  };