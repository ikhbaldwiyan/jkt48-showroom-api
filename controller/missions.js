const { BASE_URL } = require("../utils/api");
const fetchService = require("../utils/fetchService");

const Missions = {
  getMissionList: async (req, res) => {
    try {
      const response = await fetchService(`${BASE_URL}/mission`, res, {
        headers: {
          Cookie: req.body.cookies,
        },
      });

      res.send(response.data.genre_list);
    } catch (error) {
      res.send(error);
    }
  },

};

module.exports = Missions;
