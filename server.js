const app = require("./src/app");
const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
