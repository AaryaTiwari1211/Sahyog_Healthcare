import React, { useState } from 'react';
import { Button, Typography, Spinner } from '@material-tailwind/react';
import { FaUpload, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from '../components/FirebaseSDK';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

const DropBox = ({ onFileChange }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [hasFile, setHasFile] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = getFileIcon(file.type) || URL.createObjectURL(file);
            setPreviewImage({ file, preview });
            setHasFile(true);
            onFileChange(file);
        }
    };

    const handleRemoveFile = () => {
        setPreviewImage(null);
        setHasFile(false);
        onFileChange(null);
    };

    const getFileIcon = (fileType) => {
        if (fileType.includes('pdf')) {
            return 'pdf';
        } else if (fileType.includes('msword') || fileType.includes('wordprocessingml.document')) {
            return 'word';
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center gap-5 justify-center rounded-[15px] w-full shadow-xl h-[250px] cursor-pointer border-2 border-dashed border-gray-800 overflow-auto">
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden"
                id="fileUpload"
                accept="image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                <div className="flex flex-row items-center gap-2 overflow-auto">
                    {previewImage ? (
                        <div className="cursor-pointer">
                            {previewImage.preview === 'pdf' ? (
                                <FaFilePdf className="text-4xl text-white" />
                            ) : previewImage.preview === 'word' ? (
                                <FaFileWord className="text-4xl text-white" />
                            ) : (
                                <img
                                    src={previewImage.preview}
                                    alt="Uploaded"
                                    style={{ width: '80px', height: '80px', borderRadius: '10px' }}
                                />
                            )}
                        </div>
                    ) : (
                        <FaUpload className="text-4xl text-white" />
                    )}
                </div>
                <Typography className="text-lg font-bold text-color2 font-inter">
                    Health Insurance Details
                </Typography>
                <Typography className="text-sm font-bold text-gray-300 font-inter">
                    PDF / Word / Images (Max 32MB)
                </Typography>
            </label>
            {hasFile && (
                <Button color="red" onClick={handleRemoveFile}>
                    Remove File
                </Button>
            )}
        </div>
    );
};

const HealthInsur = () => {
    const [hasFile, setHasFile] = useState(false);
    const [loadingfb, setLoadingFB] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const user = useUser();

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        setHasFile(Boolean(selectedFile));
    };

    const handleInsuranceSubmit = async () => {
        if (!file) return;
        const userDoc = doc(db, 'users', user.user.id);
        setLoadingFB(true);
        const storageRef = ref(storage, `${user.user.id}/health-insurance/${file.name}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
        });
        const url = await getDownloadURL(storageRef);
        setUrl(url);
        console.log("Url is: ", url);

        await setDoc(userDoc, {
            healthInsurance: url
        }, { merge: true });

        setLoadingFB(false);
        navigate('/details');
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
                <div className="flex flex-col gap-2">
                    <Typography className="text-3xl font-bold text-color1 font-inter">
                        Please upload your Health Insurance Details
                    </Typography>
                </div>
                <div className="flex flex-col gap-10">
                    <DropBox onFileChange={handleFileChange} />
                    <div className='flex justify-between'>
                        <Button
                            type="submit"
                            color="blue"
                            className="text-white"
                            onClick={handleInsuranceSubmit}
                            disabled={!hasFile}
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
