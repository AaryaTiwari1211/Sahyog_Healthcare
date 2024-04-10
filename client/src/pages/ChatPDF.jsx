import React, { useState, useCallback } from 'react';
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFilePdf, FaUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import ChatUI from './ChatUI';
import axios from 'axios';
import FormData from 'form-data';
import Appbar from '../components/appbar/Appbar';

// export function DrawerDefault() {
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);

//     const openDrawer = () => setOpen(true);
//     const closeDrawer = () => setOpen(false);

//     return (
//         <React.Fragment>
//             <GiHamburgerMenu className='m-2 text-color1' onClick={openDrawer} size={30} />
//             <Drawer open={open} onClose={closeDrawer} className="p-4">
//                 <div>
//                     <h2 className='text-center'>Existing Chats</h2>
//                     <div className='flex flex-col justify-center gap-10 p-4 m-2'>
//                         <PdfChat name="Report 1" lastMessage="This is the first report" />
//                         <PdfChat name="Report 2" lastMessage="This is the second report" />
//                         <PdfChat name="Report 3" lastMessage="This is the third report" />
//                     </div>
//                 </div>
//             </Drawer>
//         </React.Fragment>
//     );
// }

// const PdfChat = ({ name, lastMessage, link }) => {
//     const navigate = useNavigate();
//     return (
//         <div className='flex items-center gap-10' onClick={() => navigate('/')}>
//             <FaFilePdf size={30} />
//             <div className='flex flex-col justify-start'>
//                 <h6>{name}</h6>
//                 <p className='text-sm text-gray-500'>{lastMessage}</p>
//             </div>
//         </div>
//     );
// };

const ChatPDF = () => {
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [sourceId, setSourceId] = useState('');
    const [chatter, setChatter] = useState(false);
    const [fileName, setFileName] = useState("");
    const [aiType, setAiType] = useState('');

    const handleReset = () => {
        setChatter(false);
        setUploadedFile(null);
        setSubmit(false);
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            console.log('Dropped files:', acceptedFiles);
            setFileName(acceptedFiles[0].name);
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('file', file);

            const responseFile = await axios.post('https://api.chatpdf.com/v1/sources/add-file', formData, {
                headers: {
                    'x-api-key': import.meta.env.VITE_CHATPDF_API_KEY,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Source ID:", responseFile.data.sourceId);
            setUploadedFile(file);
            setSourceId(responseFile.data.sourceId);
            setSubmit(true);
        } catch (error) {
            console.error('Error:', error.message);
            console.error('Response:', error.response?.data);
        }
    }, []);

    const handleSummarize = () => {
        navigate('/medmatch-concierge');
    }

    const handleChat = () => {
        setChatter(true);
        // navigate('/chat-ui');
    }


    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>{
            aiType === '' ? (<>
                <div className='flex flex-col gap-10 md:gap-16 m-10 font-inter items-center justify-center h-[80vh] md:mx-64'>
                    <Button className='text-color1 bg-color3 font-inter' fullWidth onClick={() => setAiType("chat")}>Chat Using Report PDF</Button>
                    <Button className='text-color1 bg-color3 font-inter' fullWidth onClick={handleSummarize}>MedMatch Concierge</Button>
                </div>
            </>) : aiType === 'chat' && (<>
                {(chatter ? (<ChatUI sourceId={{ sourceId }} fileName={{ fileName }} />) : (
                    <>
                        <div className='flex flex-col gap-10 m-10 font-inter'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl text-color1'>Upload a report</h1>
                                <p className='text-sm text-gray-600'>Upload a report to get a summary or chat with the bot</p>
                            </div>
                            <div {...getRootProps()} className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 p-4 text-white border-2 border-gray-600 border-dashed rounded-xl"
                                >
                                    {uploadedFile ? (
                                        <div className="flex flex-col items-center justify-center gap-3 pt-5 pb-6">
                                            <FaFilePdf size={40} />
                                            <p className="mb-2 text-sm ">
                                                <span className="font-semibold">{uploadedFile.name}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-6 pt-5 pb-6">
                                            <FaUpload size={60} />
                                            <div className='flex flex-col gap-2 text-center'>
                                                <input type='file' id='file' className='hidden' />
                                                <p className="text-sm">DRAG AND DROP PDF FILE HERE</p>
                                                <p className="text-sm">PDF FILE OF REPORT (MAX - 32MB)</p>
                                            </div>
                                        </div>
                                    )}
                                    <input id="dropzone-file" {...getInputProps()} className="hidden" />
                                </label>
                            </div>
                            <div className='flex justify-between w-full'>
                                <Button className='text-color1 bg-color3 font-inter' disabled={!submit} onClick={handleReset}>Reset</Button>
                                <Button className='text-color1 bg-color3 font-inter' disabled={!submit} onClick={handleChat}>Chat</Button>
                            </div>
                        </div>
                    </>
                ))}
            </>)
        }

            <Appbar />
        </>
    );
};

export default ChatPDF;
