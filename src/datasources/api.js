const { RESTDataSource } = require("apollo-datasource-rest");

class API extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod";
  }
}

module.exports = API;
