import Head from 'next/head';
import Layout from '../components/layout';
import { useState } from 'react';
import Image from 'next/image';

const classificationEndpoint = "https://hf.space/embed/jph00/testing/+/api/predict/"

export default function Demo() {
    const [imageUrl, setImageUrl] = useState(null);
    const [predictionText, setPredictionText] = useState("");

    async function handleFileInputChange(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const dataUrl = await dataUrlFromFile(file);
            setImageUrl(dataUrl);
        }
    }

    async function processImage() {
        // replace this with your own image processing logic
        // console.log('Processing image:', image);
        const prediction = await classifyImage(imageUrl);
        console.log(prediction);
        setPredictionText(formatPrediction(prediction));
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
        const jsonData = {"data": [dataUrl]}
        const jsonDataString = JSON.stringify(jsonData);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const request = new Request(classificationEndpoint, {
            method: 'POST',
            headers: headers,
            body: jsonDataString
        });
        return fetch(request).then(response => response.json());
    }

    function formatAsPercentage(number, digits) {
        return (number * 100).toFixed(digits) + "%";
    }

    function formatPrediction(prediction) {
        const predictionData = prediction.data[0];
        const confidence = predictionData.confidences[0]['confidence']
        return `${predictionData.label}: ${formatAsPercentage(confidence, 2)} confidence`; 
    }

    return (
        <Layout>

            <Head>
                <title>Dog vs. Cat Classifyer</title>
            </Head>
            <div className="">
            <h1 className="text-[3rem] leading-[1.3] font-bold mb-4 mx-auto">Dog vs. Cat Classifier</h1>
                <input className="h-12 mr-[1rem] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="file" onChange={handleFileInputChange}/>
                <button className="h-12 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={processImage} >Classify Image</button>
                <div className="my-[1rem]">
                    {imageUrl && <Image src={imageUrl} height={288} width={288} alt="" className="mx-auto rounded shadow"/>}
                </div>
                <div>
                {predictionText && <h1 className="text-center">{predictionText}</h1>}
                </div>
            </div>
        </Layout>
    );
}

