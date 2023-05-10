const getCustomRoom = (type) => {
  let rooms;
  if (type === "trainee") {
    rooms = {
      alya: "461451",
      anin: "461452",
      cathcy: "461454",
      chelsea: "461458",
      cynthia: "461463",
      elin: "461475",
      danella: "461466",
      daisy: "461465",
      gracie: "461478",
      greseel: "461479",
      gendis: "461476",
      jeane: "461480",
      michie: "461481",
    };
  } else {
    rooms = {
      amanda: "400710",
      lia: "400713",
      callie: "400714",
      ela: "400715",
      indira: "400716",
      lyn: "400717",
      raisha: "400718",
    };
  }

  return rooms;
};

module.exports = getCustomRoom;
