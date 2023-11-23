import React, { useState } from "react";
import axios from "axios";
import styles from "./Azure.module.css";
// import dotenv from "dotenv";

// // Accessing the .env file
// dotenv.config();

const AzureComputerVisionApp = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [carImage, setCarImage] = useState(null);

  const analyzeImage = async () => {
    const apiKey = "cfe2cdcec7af4679a6545fcb4868849a";
    const endpoint =
      "https://jason-vision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags&language=en&gender-neutral-caption=False";

    // const params = {
    //   visualFeatures: "Categories,Description,Color",
    //   details: "",
    //   language: "en",
    // };
    // /vision/v3.1/analyze (cut)
    try {
      const response = await axios.post(
        `${endpoint}`,
        { url: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey,
          },
          // params,
        }
      );

      //-----------------FUNCTIONAL CODE-----------------//
      if (
        response.data.tagsResult.values.filter((item) => item.name === "car")
      ) {
        console.log("This is a car");
        setResult(
          `This is indeed a ${
            response.data.tagsResult.values.filter(
              (item) => item.name === "car"
            )[0].name
          }`
        );
        setCarImage(
          <img width="200px" height="auto" alt="car" src={imageUrl} />
        );
      } else {
        console.log(
          "The Azure API hasn't recognised that this image contains a car ⛔🚗"
        );
        setResult(
          `This image doesn't appear to contain a Either the Azure Computer Vision has failed, or you should have gone to Specsavers`
        );
        setCarImage(
          <img width="200px" height="auto" alt="car" src={imageUrl} />
        );
      }

      //-------------SET RESULT ONLY---------------//
      // setResult(
      //   response.data.tagsResult.values.filter((item) => item.name === "car")[0]
      //     .name
      // );

      //--------------TRYING STUFF-------------//
      // console.log(
      //   response.data.tagsResult.values.filter((item) => item.name === "car")[0].name
      // );
      // if (response.data.tagsResult.values[3].name === "car") {
      // console.log("This is a car");
      // setResult(
      //   `This is indeed a ${response.data.tagsResult.values[3].name}`
      // );
      // setCarImage(
      //   <img width="200px" height="auto" alt="car" src={imageUrl} />
      // );}
      // else {
      //   console.log("Not today, my friend");
      // }
      // console.log(response.data.tagsResult.values["name"]);
      // setResult(
      //   response.data.tagsResult.values.filter((item) => item.name === "car")[0]
      //     .name
      // );
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <div className={styles.azureContainer}>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={analyzeImage}>Analyze Image</button>

      {result && (
        <div>
          <h2>Analysis Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <div>{carImage}</div>
    </div>
  );
};

export default AzureComputerVisionApp;