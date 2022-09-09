import HttpService from "./HttpService";

export const LoadProfile = async(token) => {
  const http = new HttpService();
  let profileUrl = "users/view-profile";
  // const tokenId = "user-token";
  return await http
    .getData(profileUrl, token)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
