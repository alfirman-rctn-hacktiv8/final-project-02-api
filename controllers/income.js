const Income = require("../models/income");

exports.checkout = async (req, res) => {
  const { products } = req.body;

  if (!products.length) return res.status(400).json({ message: "bad request" });

  products.forEach((product) => {
    let { productId, name, price, category, sold, total } = product;

    if (!productId || !name || !price || !category || !sold || !total)
      return res.status(400).json({ message: "bad request" });
  });

  try {
    const income = await Income.findById(process.env.INCOME_ID);

    if (income.products.length) {
      const result = [];

      result.push(...newProducts(income.products, products));

      for (let i = 0; i < income.products.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (income.products[i].productId == products[j].productId) {
            income.products[i].name = products[j].name;
            income.products[i].price = products[j].price;
            income.products[i].category = products[j].category;
            income.products[i].sold += products[j].sold;
            income.products[i].total += products[j].total;
            result.push(income.products[i]);
          }
        }
      }
      income.products = result;
    } else income.products.push(...products);

    income.total = 0;
    income.products.forEach((el) => (income.total += el.total));

    const data = await income.save();

    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.getIncomeData = async (req, res) => {
  try {
    const income = await Income.findById(process.env.INCOME_ID);

    res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.deleteIncomeData = async (req, res) => {
  try {
    const income = await Income.findById(process.env.INCOME_ID);
    income.total = 0;
    income.products = [];

    const data = await income.save();

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

const newProducts = (arr1, arr2) => {
  let temp = 0;
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].productId == arr2[j].productId) {
        temp = null;
        break;
      }
      temp = arr1[i];
    }
    if (temp) result.push(temp);
  }

  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[i].productId == arr1[j].productId) {
        temp = null;
        break;
      }
      temp = arr2[i];
    }
    if (temp) result.push(temp);
  }

  return result;
};
