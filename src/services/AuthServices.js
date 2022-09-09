import HttpService from "./HttpService";

export const RegisterUserService = (credentials) => {
  const http = new HttpService();
  let signupUrl = "users/register";
  return http
    .postData(credentials, signupUrl)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const LoginUserService = (credentials) => {
  const http = new HttpService();
  let loginUrl = "users/login";
  return http
    .postData(credentials, loginUrl)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const LogOutUserService = (token) => {
  const http = new HttpService();
  let loginUrl = "users/logout";
  // const tokenId = "user-token";
  return http
    .getData(loginUrl, token)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
