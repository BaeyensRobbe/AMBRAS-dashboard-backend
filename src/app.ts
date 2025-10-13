// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// your routes
app.use("/passwords", require("./routes/passwordRoutes").default);
app.use("/tasks", require("./routes/taskRouter").default);
app.use("/events", require("./routes/eventsRouter").default);
app.use("/vault", require("./routes/vaultRouter").default);


app.get("/", (req, res) => {
  res.send("AMBRAS Backend is running!");
});

// ✅ This is key — export the app (not app.listen)
export default app;
