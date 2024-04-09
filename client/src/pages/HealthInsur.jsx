import React, { useEffect, useState } from 'react';
import { Button, Typography, Spinner } from '@material-tailwind/react';
import { FaUpload, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../components/FirebaseSDK';
import { useContext } from 'react';

const DropBox = ({ onFilesDrop }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [hasFiles, setHasFiles] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        onDrop: (acceptedFiles) => {
            const previewImagesArray = acceptedFiles.map((file) => {
                return {
                    file,
                    preview: getFileIcon(file.type) || URL.createObjectURL(file),
                };
            });
            setPreviewImages([...previewImages, ...previewImagesArray]);
            setHasFiles(true);
            onFilesDrop(acceptedFiles);
        },
        multiple: true,
    });

    const getFileIcon = (fileType) => {
        if (fileType.includes('pdf')) {
            return 'pdf';
        } else if (fileType.includes('msword') || fileType.includes('wordprocessingml.document')) {
            return 'word';
        }
        return null;
    };

    return (
        <div
            {...getRootProps()}
            className="flex flex-col items-center gap-5 justify-center rounded-[15px] w-full shadow-xl h-[250px] cursor-pointer border-2 border-dashed border-gray-800 overflow-auto"
        >
            <input {...getInputProps()} />
            <div className="flex flex-row items-center gap-2 overflow-auto">
                {previewImages.map((image, index) => (
                    <div key={index} className="cursor-pointer">
                        {image.preview === 'pdf' ? (
                            <FaFilePdf className="text-4xl text-white" />
                        ) : image.preview === 'word' ? (
                            <FaFileWord className="text-4xl text-white" />
                        ) : (
                            <img
                                src={image.preview}
                                alt={`Uploaded ${index + 1}`}
                                style={{ width: '80px', height: '80px', borderRadius: '10px' }}
                            />
                        )}
                    </div>
                ))}
                <div className="cursor-pointer">
                    {previewImages.length === 0 && <FaUpload className="text-4xl text-white" />}
                </div>
            </div>
            <Typography className="text-lg font-bold text-color2 font-inter">
                Health Insurance Details
            </Typography>
            <Typography className="text-sm font-bold text-gray-300 font-inter">
                PDF / Word / Images (Max 32MB)
            </Typography>
        </div>
    );
};

const HealthInsur = () => {
    const [hasFiles, setHasFiles] = useState(false);
    const navigate = useNavigate();
    const [loadingfb, setLoadingFB] = useState(false);
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);

    const handleDrop = (acceptedFiles) => {
        console.log('Files accepted: ', acceptedFiles);
        setFiles(acceptedFiles);
        setHasFiles(true);
    };

    const handleInsuranceSubmit = async () => {
        console.log('ok');
        setLoadingFB(true);
    }

    return (
        <>
            {loadingfb && (
                <div className="fixed top-0 left-0 z-[99999] w-screen h-screen flex flex-col justify-center items-center backdrop-blur-md bg-black bg-opacity-50">
                    <Spinner color="blue" className='w-12 h-12' />
                    <Typography color="white" className="text-xl ">
                        Uploading...
                    </Typography>
                </div>
            )}
            <div className="flex flex-col gap-24 my-10 mx-7 md:mx-60">
                <div
                    className="flex flex-col gap-2"
                >
                    <Typography className="text-3xl font-bold text-color1 font-inter">
                        Please upload your Health Insurance Details
                    </Typography>
                    <Typography className="font-inter text-color2">
                        Almost Done
                    </Typography>
                </div>
                <div className="flex flex-col gap-10">
                    <DropBox onFilesDrop={handleDrop} />
                    <div className='flex justify-between'>
                        <Button
                            type="submit"
                            color="blue"
                            className="text-white"
                            onClick={() => handleInsuranceSubmit()}
                            disabled={!hasFiles}
                        >
                            Submit
                        </Button>
                        <Button
                            color="blue"
                            className="text-white"
                            onClick={() => navigate('/details')}
                        >
                            Back
                        </Button>
                        <Button
                            color="blue"
                            className="text-white"
                            onClick={() => navigate('/landing')}
                        >
                            Skip
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthInsur;
