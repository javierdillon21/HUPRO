import Prismic from "@prismicio/client";

export const apiEndpoint = "https://hupro.prismic.io/api/v2";
export const accessToken =
  "MC5ZVnpPMGhFQUFDMEFadjVj.aO-_ve-_vQMb77-977-977-9XDd-77-977-9eO-_vVwmOe-_ve-_ve-_ve-_ve-_ve-_ve-_vRnvv73vv718Ku-_ve-_vQ";

// Client method to query documents from the Prismic repo
const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export default Client;
