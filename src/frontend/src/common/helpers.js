const DOUGHS = {
  Тонкое: {
    name: "light",
    checked: true,
  },
  Толстое: {
    name: "large",
    checked: false,
  },
};

export const normalizeDough = (array) => {
  const doughArray = array.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      value: DOUGHS[item.name].name,
      checked: DOUGHS[item.name].checked,
    };
  });

  return doughArray;
};

export const SIZES = {
  1: {
    name: "small",
    checked: true,
  },
  2: {
    name: "normal",
    checked: false,
  },
  3: {
    name: "big",
    checked: false,
  },
};

export const normalizeSize = (array) => {
  const sizeArray = array.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      multiplier: item.multiplier,
      value: SIZES[item.multiplier].name,
      checked: SIZES[item.multiplier].checked,
    };
  });

  return sizeArray;
};

export const SAUCE = {
  Томатный: {
    name: "tomato",
    checked: true,
  },
  Сливочный: {
    name: "creamy",
    checked: false,
  },
};

export const normalizeSauce = (array) => {
  const sauceArray = array.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      value: SAUCE[item.name].name,
      checked: SAUCE[item.name].checked,
    };
  });

  return sauceArray;
};

export const INGREDIENTS = {
  Грибы: {
    name: "mushrooms",
  },
  Чеддер: {
    name: "cheddar",
  },
  Салями: {
    name: "salami",
  },
  Ветчина: {
    name: "ham",
  },
  Ананас: {
    name: "ananas",
  },
  Бекон: {
    name: "bacon",
  },
  Лук: {
    name: "onion",
  },
  Чили: {
    name: "chile",
  },
  Халапеньо: {
    name: "jalapeno",
  },
  Маслины: {
    name: "olives",
  },
  Томаты: {
    name: "tomatoes",
  },
  Лосось: {
    name: "salmon",
  },
  Моцарелла: {
    name: "mozzarella",
  },
  Пармезан: {
    name: "parmesan",
  },
  "Блю чиз": {
    name: "blue_cheese",
  },
};

export const normalizeIngredients = (array) => {
  const ingredientsArray = array.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      value: INGREDIENTS[item.name].name,
      count: 0,
    };
  });

  return ingredientsArray;
};

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";
