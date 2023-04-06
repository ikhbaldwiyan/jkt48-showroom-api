const axios = require("axios");

const fetchService = async (url, res, config) => {
  try {
    let response;
    if (config) {
      response = await axios.get(url, config);
    } else {
      response = await axios.get(url);
    }

    return await response;
  } catch (error) {
    res.send({
      status: false,
      code: 404,
      message: error.message,
    });

    console.log(error);

    throw error;
  }
};

module.exports = fetchService;
