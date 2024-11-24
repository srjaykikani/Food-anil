require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Database connection error:", err));

const uploadDir = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static(uploadDir));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `${BASE_URL}/images/${req.file.filename}`,
  });
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email id is already registered", alert: false });
    }

    const newUser = new User({ firstName, lastName, email, password, image });
    await newUser.save();
    res.status(201).send({ message: "Successful sign up", alert: true });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.findOne({ email: email });

    if (result && result.password === password) {
      const token = jwt.sign({ _id: result._id }, JWT_SECRET);

      res.json({
        message: "Login is successful",
        alert: true,
        data: {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        },
        token,
      });
    } else {
      res.status(400).send({ message: "Invalid credentials", alert: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
});

const schemaProduct = mongoose.Schema({
  name: String,
  image: String,
  price: String,
  description: String,
  category: String,
});

const productModel = mongoose.model("product", schemaProduct);

app.post("/uploadProduct", async (req, res) => {
  try {
    const newProduct = new productModel({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    });

    await newProduct.save();
    res.send({ message: "Upload successful" });
  } catch (error) {
    console.error("Product upload error:", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
};
app.post("/getuser", fetchUser, async (req, res) => {
  const { _id: userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (user) {
    return res.json(user);
  } else {
    return res.json({});
  }
});

app.post("/addtocart", fetchUser, async (req, res) => {
  const { productId } = req.body;
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    cart = await cart.save();
    res.status(200).send({ message: "Cart updated", cart, alert: true });
  } else {
    const newCart = new Cart({
      userId,
      items: [{ productId, quantity: 1 }],
    });

    await newCart.save();
    res
      .status(201)
      .send({ message: "Cart created", cart: newCart, alert: true });
  }
});

app.post("/fetchCart", fetchUser, async (req, res) => {
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    return res.json(cart.items);
  } else {
    return res.json([]);
  }
});

app.post("/removetocart", fetchUser, async (req, res) => {
  const { productId } = req.body;
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ userId: userId });

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
    await cart.save();
    res.status(200).send({ message: "Cart updated", cart, alert: true });
  } else {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res
      .status(200)
      .send({ message: "item Removed From Cart", cart, alert: true });
  }
});

app.post("/fetchCart", fetchUser, async (req, res) => {
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    return res.json(cart.items);
  } else {
    return res.json([]);
  }
});

app.post("/deletecart", fetchUser, async (req, res) => {
  const { productId } = req.body;
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ userId: userId });

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res
      .status(200)
      .send({ message: "Item removed from cart", cart, alert: true });
  } else {
    res.status(404).send({ message: "Item not found in cart", alert: false });
  }
});

app.listen(PORT, () => console.log("Server is running at " + PORT));
