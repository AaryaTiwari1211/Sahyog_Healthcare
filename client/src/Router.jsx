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
// import Profile from './pages/Profile';
import SOS from './pages/SOS/SOS';
import Cal from './components/Calendar/Cal';
import Chat from './pages/AllChat';
// import DoctorChat from './pages/DoctorChat';
import Notes from './components/Calendar/Notes';
// import { Interaction } from './components/contract/Interaction';
import { useContext } from 'react';
import { MedMatch } from './pages/MedMatch';

export const Router = () => {
    // const { userDetails, userType, setUserType } = useContext(Interaction);q
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/details" element={<DetailsPage />} />
                <Route path="/intro" element={<Landing />} />
                <Route path="/spaces" element={<ChatPDF />} />
                <Route path='/basicinfo' element={<BasicInfo />} />
                <Route path='/medicaldetails' element={<Medical />} />
                <Route path='/healthinsurance' element={<HealthInsur />} />
                <Route path='/landing' element={<Landing />} />
                <Route path="/specialist/:id" element={<Specialist />} />
                {/* <Route path='/profile' element={<Profile />} /> */}
                <Route path="/chat-pdf" element={<ChatPDF />} />
                <Route path="/sos" element={<SOS />} />
                <Route path="/calendar" element={<Cal />} />
                <Route path="/allchat" element={<Chat />} />
                <Route path="/notes/:date/:title/:text" element={<Notes />} />
                {/* <Route path="/chat/:chatId" element={<DoctorChat />} /> */}
                <Route path="/medmatch-concierge" element={<MedMatch />} />
            </Routes>
        </>
    );
};