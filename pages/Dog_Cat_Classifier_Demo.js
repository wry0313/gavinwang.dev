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
            setPredictionText("click \"classify image\" button to start classifying")
            const file = files[0];
            const dataUrl = await dataUrlFromFile(file);
            setImageUrl(dataUrl);
        }
    }

    async function processImage() {
        // replace this with your own image processing logic
        // console.log('Processing image:', image);
        if (imageUrl != null) {
            setPredictionText("trying very hard to classify...")
            const prediction = await classifyImage(imageUrl);
            // console.log(prediction);
            setPredictionText(formatPrediction(prediction));
        } else {
            setPredictionText("please upload an image first before clicking the button")
        }
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
        const jsonData = { "data": [dataUrl] }
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
            <div className="flex flex-col item-center">

                <div className="mx-auto">
                    <h1 className="text-[3rem] leading-[1.3] font-bold mb-4">Dog vs. Cat Classifier</h1>
                
                    <div className="flex flex-col md:flex-row items-center">
                        <input className="w-[70%] mb-[0.3rem] md:mb-0 text-sm md:text-base flex-1 md:mr-[0.4rem] h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow" type="file" onChange={handleFileInputChange} />
                        <button className="w-[70%] text-sm md:text-base flex-1 h-12 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow" onClick={processImage} >Classify Image</button> 
                    </div>
                </div>
                <div >
                {imageUrl && <Image src={imageUrl} height={288} width={288} alt="" className="my-[1rem] mx-auto rounded-lg shadow" />}
                </div>
                <div >
                    {predictionText && <h1 className="my-[1rem] text-center">{predictionText}</h1>}
                </div>
        
            </div>
        </Layout>
    );
}

