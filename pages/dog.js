import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const classificationEndpoint =
  "https://hf.space/embed/jph00/testing/+/api/predict/";

export default function Dog() {
  const [imageUrl, setImageUrl] = useState(null);
  const [predictionText, setPredictionText] = useState("");

  async function handleFileInputChange(e) {
    const files = e.target.files;
    if (files.length > 0) {
      setPredictionText('click "classify image" button to start classifying');
      const file = files[0];
      const dataUrl = await dataUrlFromFile(file);
      setImageUrl(dataUrl);
    }
  }

  async function handleImageClick(imageUrl) {
    const blob = await imageToBlob(imageUrl);
    const dataUrl = await dataUrlFromFile(blob);
    setPredictionText('click "classify image" button to start classifying');
    setImageUrl(dataUrl);
  }

  function imageToBlob(imageUrl) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Failed to convert image to Blob."));
      };
      xhr.open("GET", imageUrl);
      xhr.responseType = "blob";
      xhr.send();
    });
  }
  async function dataUrlFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async function classifyImage(dataUrl) {
    const jsonData = { data: [dataUrl] };
    const jsonDataString = JSON.stringify(jsonData);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const request = new Request(classificationEndpoint, {
      method: "POST",
      headers: headers,
      body: jsonDataString,
    });
    return fetch(request).then((response) => response.json());
  }

  async function classifyOnClick() {
    if (imageUrl != null) {
      setPredictionText("sending image to huggingface server to classify...");
      const prediction = await classifyImage(imageUrl);
      setPredictionText(formatPrediction(prediction));
    } else {
      setPredictionText(
        "please upload an image first before clicking the button"
      );
    }
  }

  function formatAsPercentage(number, digits) {
    return (number * 100).toFixed(digits) + "%";
  }

  function formatPrediction(prediction) {
    const predictionData = prediction.data[0];
    const confidence = predictionData.confidences[0]["confidence"];
    return `${predictionData.label}: ${formatAsPercentage(
      confidence,
      2
    )} confidence`;
  }

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="dog vs cat classifier nesnet model web showcase"
        />
        <title>Dog vs. Cat Classifyer</title>
      </Head>
      <div className="relative max-w-[48rem] mx-auto text-[22px] py-10">
        <div className="animate-fadeIn">
          <div className="flex flex-col item-center">
            <div className="mx-auto">
              <h1 className=" bg-[#F5F7F7] shadow rounded-lg text-center sm:text-[3.2rem] leading-[1.3] font-bold mb-4 px-4 py-2">
                🐕 Dog vs. 🐈 Cat Classifier Demo
              </h1>
              <div className="flex flex-col md:flex-row items-center bg-[#F5F7F7] shadow rounded-lg px-3 py-2">
                <input
                  className="hover:scale-105  duration-300 w-[250px] md:w-[70%] mb-[0.3rem] md:mb-0 text-sm md:text-base flex-1 md:mr-[0.8rem] h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
                  type="file"
                  id="fileInput"
                  onChange={handleFileInputChange}
                />
                <button
                  className="hover:scale-105  duration-300 w-[250px] md:w-[70%] text-sm md:text-base flex-1 h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
                  onClick={classifyOnClick}
                >
                  Classify Image
                </button>
              </div>
            </div>

            {imageUrl && (
              <Image
                src={imageUrl}
                alt="selected pic"
                height={288}
                width={288}
                className="mt-[2rem] mx-auto rounded-lg shadow"
              />
            )}
            {predictionText && (
              <h1 className="text-center">{predictionText}</h1>
            )}
            <div className="no-scrollbar flex mt-[2rem] overflow-x-scroll bg-[#F5F7F7] shadow rounded-lg py-2">
              <Image
                className="flex-none ml-2 mr-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/dog1.png")}
                src="/project/dog1.png"
                height={100}
                width={(300 / 168) * 100}
                alt="Dog 1"
              />
              <Image
                className="flex-none mx-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/dog2.png")}
                src="/project/dog2.png"
                height={100}
                width={(316 / 159) * 100}
                alt="Dog 2"
              />
              <Image
                className="flex-none mx-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/cat.jpeg")}
                src="/project/cat.jpeg"
                height={100}
                width={(225 / 225) * 100}
                alt="Cat 1"
              />
              <Image
                className="flex-none mx-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/funny.jpeg")}
                src="/project/funny.jpeg"
                height={100}
                width={(310 / 163) * 100}
                alt="Cat or Dog? 1"
              />
              <Image
                className="flex-none mx-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/funny1.jpeg")}
                src="/project/funny1.jpeg"
                height={100}
                width={(1200 / 1200) * 100}
                alt="Cat or Dog 2"
              />
              <Image
                className="flex-none mx-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/funny3.jpg")}
                src="/project/funny3.jpg"
                height={100}
                width={(390 / 291) * 100}
                alt="Cat or Dog 3"
              />
              <Image
                className="flex-none mr-2 ml-1 rounded-lg hover:scale-110 duration-300"
                onClick={() => handleImageClick("/project/fox.jpeg")}
                src="/project/fox.jpeg"
                height={100}
                width={(1200 / 862) * 100}
                alt="Fox"
              />
            </div>
          </div>
        </div>
        <Link
          className="inline-block mt-[2rem] mb-[8rem] text-sky-900 font-bold"
          href="/"
        >
          🔙 Back
        </Link>
      </div>
    </div>
  );
}
