import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaUpload } from "react-icons/fa";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import Appbar from '../components/appbar/Appbar';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc } from "firebase/firestore";

const MODEL_NAME = "gemini-pro-vision";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const MedMatch = () => {
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const run = async (acceptedFiles) => {
        setLoading(true);
        const parts = await Promise.all([
            { text: "This is my report :" },
            ...acceptedFiles.map(async file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            inlineData: {
                                mimeType: file.type,
                                data: reader.result.split(',')[1]
                            }
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }),
            { text: ". Please give an overview and tell me that which specialisation of doctor should I approach according to the report, Give the Contact information of the best specialist in mumbai with his/her hospital name and contact number." },
        ]);

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        setResponse(response.text());
        setLoading(false);
        console.log(response.text());
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))]);
        }
    });

    const handleAutomate = () => {
        console.log(files);
        run(files);
    }

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
                    <Spinner color="blue" className='w-12 h-12' />
                    <Typography color="white" className="text-xl ">
                        Generating Summary
                    </Typography>
                </div>
            )}
            <div className="flex flex-col items-center justify-center gap-10 p-3 my-16 mt-10 text-white md:mx-60 font-inter">
                {response === "" ? (
                    <>
                        <div {...getRootProps({ className: 'dropzone flex flex-col items-center gap-5 justify-center w-full h-64 p-4 text-white border-2 border-gray-600 border-dashed rounded-xl' })}>
                            <input {...getInputProps()} />
                            <FaUpload size={30} />
                            <p className='text-center'>
                                {files.length > 0 ? `${files.length} iamge(s) added` : "Drag 'n' drop your report images here, or click to select files"}
                            </p>
                        </div>
                        <Button className='text-color1 bg-color3 font-inter' fullWidth onClick={handleAutomate}>lets get rollin</Button>
                    </>) : (
                    <>
                        <>
                            <Typography className='text-2xl font-bold font-inter'>
                                Summary
                            </Typography>
                            <div className='p-5 text-lg bg-color3 rounded-xl'>
                                <ReactMarkdown>{response}</ReactMarkdown>
                            </div>
                        </>
                    </>
                )}
            </div >
            <Appbar />
        </>
    );
};