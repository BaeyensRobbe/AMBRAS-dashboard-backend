import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // MUST call this first

const app = express();

app.use(cors());
app.use(express.json());

app.use("/passwords", require("./routes/passwordRoutes").default);
app.use("/tasks", require("./routes/taskRouter").default);
app.use("/events", require("./routes/eventsRouter").default);

app.get("/", (req, res) => {
  res.send("AMBRAS Backend is running!");
});


export default app;
