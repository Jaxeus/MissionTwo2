import express from "express";
import tasks from "./routes/tasks";

const app = express();
app.use(express.json());

app.get("/", ({}, res) => {
  res.json({ message: "Hello World" });
});

app.post(
  "https://jason-vision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags&language=en&gender-neutral-caption=False",
  (req, res) => {
    const result = { message: "Task is created" };
    // Logic to create a new task
    // Access data from req.body
    // Save to database
    console.log(result);
    console.log(req.body);
    console.log(req.body.name);
    res.send(req.body.modelVersion);
    // res.status(201).json(result);
  }
);

app.use("/api/v1/tasks/", tasks);

export default app;
