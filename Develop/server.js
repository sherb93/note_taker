// Brings in required modules from exports
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// If 3002 isn't available it finds an open port to use
const PORT = process.env.PORT || 3002;

// App variable for running express
const app = express();

// Before adding these middlewares, the req.body from the post fetch was undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Binds the connections on the specified host and port AKA starts app.
app.listen(PORT, () => {
  console.log(`Express server listening on port http://localhost:${PORT}`);
});