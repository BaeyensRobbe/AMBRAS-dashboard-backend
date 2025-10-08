import app from "./app";
import dotenv from "dotenv";

dotenv.config(); // MUST call this first

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
