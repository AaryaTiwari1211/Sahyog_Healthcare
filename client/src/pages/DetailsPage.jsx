import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { Typography } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react';
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const DetailButton = ({ text, onClick }) => {
    return (
        <Button variant="outlined" color='white' className="flex flex-row justify-between p-6 text-sm font-normal bg-blue-500 font-inter whitespace-nowrap" onClick={onClick}>
            {text}
            <FaChevronRight />
        </Button>
    )
}

const DetailsPage = () => {
    // const { form1, form2, form3, updateFormData } = useFormContext();
    // useEffect(() => {
    //     console.log(form1);
    //     console.log(form2);
    //     console.log(form3);
    // })
    const navigate = useNavigate();
    return (
        <>
            <div className='flex flex-col gap-24 my-10 mx-7 items md:mx-60'>
                <motion.div className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography color='white' className='text-3xl font-bold font-inter'>Hey There!!</Typography>
                    <Typography color='blue' className='font-inter'>So tell us about yourself !!</Typography>
                </motion.div>
                <div className='flex flex-col gap-8'>
                    <DetailButton text='Basic Medical Details' onClick={() => navigate('/basicinfo')} />
                    <DetailButton text='Previous Diagnostic records' onClick={() => navigate('/medicaldetails')} />
                    <DetailButton text='Health Insurance Details' onClick={() => navigate('/healthinsurance')} />
                    <Button variant="outlined" color='white' className="bg-blue-500 font-inter text-md" onClick={() => navigate('/landing')}>Skip</Button>
                </div>
            </div>
        </>
    )
}

export default DetailsPage