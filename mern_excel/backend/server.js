const express = require("express");
const cors = require("cors");
const PORT = 6654;
const app = express();
const db = require("./models");
const testRoutes = require("./routes/rates_routes");

app.use(cors());
app.use(express.json());

app.use("/api/rates", testRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
});
