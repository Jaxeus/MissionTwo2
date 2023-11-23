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
    const apiKey = process.env.REACT_APP_AZURE_API_KEY;
    const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
    // const params = {
    //   visualFeatures: "Categories,Description,Color",
    //   details: "",
    //   language: "en",
    // };
    // /vision/v3.1/analyze (cut)
    try {
      console.log(imageUrl);
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
      // Andrew helped with the below
      const tagResults = response.data.tagsResult;
      const carFilter = tagResults
        ? tagResults.values.filter((item) => item.name === "car")
        : [];

      console.log(response.data.tagResults);
      if (carFilter.length > 0) {
        //Andrew helped with the above
        console.log("This is a car");
        setResult(
          `This is indeed a ${
            response.data.tagsResult.values.filter(
              (item) => item.name === "car"
            )[0].name
          }`
        );
        setCarImage(
          <img width="300px" height="auto" alt="car" src={imageUrl} />
        );
      } else {
        console.log(
          "The Azure API hasn't recognised that this image contains a car ⛔🚗"
        );
        setResult(
          `This image doesn't appear to contain a Either the Azure Computer Vision has failed, or you should have gone to Specsavers`
        );
        setCarImage(
          <img width="300px" height="auto" alt="car" src={imageUrl} />
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
      <div className={styles.formContainer}>
        <h2>Analyse your car!</h2>
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={analyzeImage}>Analyse Image</button>
      </div>

      {result && (
        <div>
          <h3 className={styles.resultHeading}>Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <div>{carImage}</div>
    </div>
  );
};

export default AzureComputerVisionApp;
