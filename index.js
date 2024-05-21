import express from "express";
const app = express();
// to make app understand json
app.use(express.json());

//routes
app.get("/say/hello", (req, res) => {
  return res.status(200).send("hello");
});

let productList = [];
app.post("/product/add", (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;
  // add new product to product list
  productList.push(newProduct);

  return res.status(200).send({ message: "Product  added successfully" });
});
// get products
app.get("/product/list", (req, res) => {
  return res.status(200).send({ message: "success", product: productList });
  console.log(product);
});

// delete a product
app.delete("/product/delete", (req, res) => {
  //   extract product name from req.body
  const productNameToBeDeleted = req.body.name;

  //   find product with provided name on  product list
  const requiredProduct = productList.find((item) => {
    if (item.name === productNameToBeDeleted) {
      return item;
    }
  });

  //    if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  //   remove product from list
  const newProductList = productList.filter((item, index, array) => {
    if (item.name !== productNameToBeDeleted) {
      return item;
    }
  });

  //   replace product list with new product list
  productList = structuredClone(newProductList);

  //   send response
  return res.status(200).send({ message: "Product is deleted successfully," });
});

//networkport and server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
