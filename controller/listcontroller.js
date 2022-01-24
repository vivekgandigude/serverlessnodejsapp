const axiospkg = require("axios");
const pkg = require("qs");
const { stringify } = pkg;
const axios = require("axios");
const { defaults, post, get } = axiospkg;
const LISTTITLE = "SalesRecords";
const tenantID = "bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820";
const getItemUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/items?";
const createItemUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/items";
const baseListUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')/ItemCount";

const updateUrl =
  "https://winwireinc.sharepoint.com/sites/GileadKite/_api/web/lists/GetByTitle('" +
  LISTTITLE +
  "')";
const postData = {
  grant_type: "client_credentials",
  client_id:
    "5a20b510-505f-4c42-ae94-09bfb9bd521b@bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820",
  client_secret: "qDb09OoFas6fAUPYiitgth5kyvfJAnJkscJzOQl+gaM=",
  resource:
    "00000003-0000-0ff1-ce00-000000000000/winwireinc.sharepoint.com@bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820",
};
class ListController {
  getListAccesToken = (request, response, next) => {
    try {
      return post(
        "https://accounts.accesscontrol.windows.net/bdcfaa46-3f69-4dfd-b3f7-c582bdfbb820/tokens/OAuth/2",
        stringify(postData),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
        .then((res) => {
          return res.data.access_token;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (ex) {
      console.log("error in response token catch", ex);
    }
  };
  getAllItems = (req, requestCallback) => {
    
    this.getListAccesToken().then((response) => {
      get(getItemUrl + "$select=ID,Title,field_1,field_2,field_3&$top=1000", {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          requestCallback(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  getAllTestListItems = (req, res, next) => {
    
    this.getListAccesToken().then((response) => {
      get(getItemUrl + "$select=ID,Title,field_1,field_2,field_3&$top=1000", {
        headers: {
          Authorization: "Bearer " + response,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
      })
        .then((response1) => {
          return res.status(200).json(response1.data.d);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
}
const listController = new ListController();
module.exports = listController;
