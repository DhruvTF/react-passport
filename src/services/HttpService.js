export default class HttpService {
  url = "https://api-laravel.techformation.co.in/api";
  postData = async (item, added_url, token) => {
  
    const requestOptions = this.postRequestOptions(token, item);
    return await fetch(this.url + "/" + added_url, requestOptions).then(
      (response) => {
        return response.json();
      }
    );
  };

  getData = async (added_url,token) => {
    // const token = localStorage.getItem(tokenId);
    const requestOptions = this.getRequestOptions(token);
    return await fetch(this.url + "/" + added_url, requestOptions).then(
      (response) => {
        return response.json();
      }
    );
  };

  deleteData = async (added_url, token) => {
    const requestOptions = this.deleteRequestOptions(token);
    return await fetch(this.url + "/" + added_url, requestOptions).then(
      (response) => {
        return response.json();
      }
    );
  };

  getRequestOptions = (token) => {
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
        "Accept":"application/json"
      },
    };
    return requestOptions;
  };

  postRequestOptions = (token, item) => {
    let requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(item),
    };
    return requestOptions;
  };
  
  deleteRequestOptions = (token) => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    };
    return requestOptions;
  };
}
