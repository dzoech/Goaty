export class SimpleAuthProvider {
  accessToken = "";

  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken = async () => {
    return this.accessToken;
  };
}