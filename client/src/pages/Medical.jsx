import React, { useState } from 'react';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { FaUpload, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from '../components/FirebaseSDK';
import { doc, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

const DropBox = ({ onFileChange, onDeleteFile }) => {
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

    const handleDeleteFile = () => {
        setPreviewImage(null);
        setHasFile(false);
        onDeleteFile(null);
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
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                <div className="flex flex-row items-center gap-2 overflow-auto">
                    {previewImage ? (
                        <div className="relative cursor-pointer">
                            <button
                                onClick={handleDeleteFile}
                                className="absolute top-[-10px] right-0 z-50 text-white"
                            >
                                <TiDelete color='red' fontSize={20} />
                            </button>
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
                <Typography className="text-lg font-bold text-color1 font-inter">
                    Diagnostic Details
                </Typography>
            </label>
            {hasFile && (
                <Button color="red" onClick={handleDeleteFile}>
                    Remove File
                </Button>
            )}
        </div>
    );
};

const Medical = () => {
    const [hasFile, setHasFile] = useState(false);
    const [loadingfb, setLoadingFB] = useState(false);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const user = useUser();

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        setHasFile(Boolean(selectedFile));
    };

    const handleDeleteFile = () => {
        setFile(null);
        setHasFile(false);
    };

    const handleRecordsSubmit = async () => {
        if (!file) return;

        setLoadingFB(true);
        const storageRef = ref(storage, `${user.user.id}/medical-records/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setUrl(url);

        const userRef = doc(db, 'users', user.user.id);
        await setDoc(userRef, { medicalRecords: url }, { merge: true });

        setLoadingFB(false);
        navigate('/details');
    };

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
                </div>
                <div className="flex flex-col gap-4">
                    <DropBox onFileChange={handleFileChange} onDeleteFile={handleDeleteFile} />
                    <div className='flex justify-between'>
                        <Button
                            type="submit"
                            color="blue"
                            className="text-white"
                            onClick={handleRecordsSubmit}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Medical;
