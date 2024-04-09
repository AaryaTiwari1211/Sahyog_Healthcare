import React, { useEffect, useState } from 'react';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { FaUpload, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { TiDelete } from "react-icons/ti";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../components/FirebaseSDK';
// import { Interaction } from '../components/contract/Interaction';

const DropBox = ({ onFilesDrop, onDeleteFile }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [hasFiles, setHasFiles] = useState(false);

    const handleDeleteFile = (index) => {
        const updatedFiles = [...previewImages];
        updatedFiles.splice(index, 1);
        setPreviewImages(updatedFiles);
        onDeleteFile(updatedFiles.map((file) => file.file));
        setHasFiles(updatedFiles.length > 0);
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        onDrop: (acceptedFiles) => {
            const previewImagesArray = acceptedFiles.map((file) => {
                return {
                    file,
                    preview: getFileIcon(file.type) || URL.createObjectURL(file),
                };
            });
            setPreviewImages([...previewImages, ...previewImagesArray]);
            setHasFiles(true);
            onFilesDrop([...previewImages, ...previewImagesArray].map((file) => file.file));
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
        <>
            <div
                {...getRootProps()}
                className="flex flex-col-reverse gap-5 justify-center items-center rounded-[15px] w-full shadow-xl h-[250px] cursor-pointer border-2 border-dashed border-gray-800 overflow-auto"
            >
                <input {...getInputProps()} />
                <Typography className="text-lg font-bold text-color1 font-inter">
                    Diagnostic Details
                </Typography>
                <div className="flex flex-row items-center gap-2 overflow-auto">
                    {previewImages.map((image, index) => (
                        <div key={index} className="relative cursor-pointer">
                            <button
                                onClick={() => handleDeleteFile(index)}
                                className="absolute top-[-10px] right-0 z-50 text-white"
                            >
                                <TiDelete color='red' fontSize={20} />
                            </button>
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
            </div>
        </>
    );
};


const Medical = () => {
    const [hasFiles, setHasFiles] = useState(false);
    const [loadingfb, setLoadingFB] = useState(false);
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();

    const handleDrop = (acceptedFiles) => {
        console.log('Files accepted: ', acceptedFiles);
        setFiles(acceptedFiles);
        setHasFiles(true);
    };

    const handleDeleteFile = (updatedFiles) => {
        setHasFiles(updatedFiles.length > 0);
    };

    const handleRecordsSubmit = async () => {
        setLoadingFB(true);
        const uploadPromises = files.map(async (file) => {
            const storageRef = ref(storage, `records/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            console.log('Uploaded a blob or file!');
            try {
                const url = await getDownloadURL(snapshot.ref);
                setUrls((prevUrls) => [...prevUrls, url]);
                console.log(url);
                await storeMedicalDetails(url);
            } catch (error) {
                console.error(`Failed to get download URL: ${error}`);
            }
        });

        Promise.all(uploadPromises)
            .then(() => {
                setLoadingFB(false);
            })
            .catch((error) => {
                console.error(`Failed to upload some files: ${error}`);
            });
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color="white" className="text-3xl font-bold font-inter">
                        Please upload your medical details
                    </Typography>
                    <Typography color="blue" className="font-inter">
                        Don't Give up now !!
                    </Typography>
                </div>
                <div className="flex flex-col gap-4">
                    <DropBox onFilesDrop={handleDrop} onDeleteFile={handleDeleteFile} />
                    <div className='flex justify-between'>
                        <Button
                            type="submit"
                            color="blue"
                            className="text-white"
                            onClick={() => handleRecordsSubmit()}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Medical;