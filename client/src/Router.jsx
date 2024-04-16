import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import DetailsPage from './pages/DetailsPage';
import Intro from './pages/Intro';
import ChatPDF from './pages/ChatPDF';
import ChatUI from './pages/ChatUI';
import ChatReport from './pages/ChatReport';
import BasicInfo from './pages/BasicInfo';
import Medical from './pages/Medical';
import HealthInsur from './pages/HealthInsur';
import Landing from './pages/landing/Landing';
import Specialist from './pages/landing/specialist/Specialist';
import Profile from './pages/Profile';
import SOS from './pages/SOS/SOS';
import Cal from './components/Calendar/Cal';
import Chat from './pages/AllChat';
// import DoctorChat from './pages/DoctorChat';
import Notes from './components/Calendar/Notes';
import { MedMatch } from './pages/MedMatch';
import { useUser } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import DoctorChat from './pages/DoctorChat';
// import UserType from './pages/UserType';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
                <Route path="/spaces" element={<ChatPDF />} />
                <Route path='/basicinfo' element={<ProtectedRoute><BasicInfo /></ProtectedRoute>} />
                <Route path='/medicaldetails' element={<ProtectedRoute><Medical /></ProtectedRoute>} />
                <Route path='/healthinsurance' element={<ProtectedRoute><HealthInsur /></ProtectedRoute>} />
                <Route path='/landing' element={<Landing />} />
                <Route path="/specialist/:id" element={<ProtectedRoute><Specialist /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/chat-pdf" element={<ChatPDF />} />
                <Route path="/sos" element={<SOS />} />
                <Route path="/calendar" element={<ProtectedRoute><Cal /></ProtectedRoute>} />
                <Route path="/allchat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/notes/:date/:title/:text" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                <Route path="/medmatch-concierge" element={<ProtectedRoute><MedMatch /></ProtectedRoute>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat/:chatId" element={<DoctorChat />} />
                {/* <Route path="/usertype" element={<ProtectedRoute><UserType /></ProtectedRoute>} /> */}
            </Routes>
        </>
    );
};