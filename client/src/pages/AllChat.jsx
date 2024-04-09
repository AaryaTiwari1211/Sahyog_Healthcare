// Chat.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@arcana/auth-react';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { getDocs, setDoc , doc } from 'firebase/firestore';
import { db } from '../components/FirebaseSDK';
import { FiMessageSquare, FiUser, FiCheck, FiSend } from 'react-icons/fi'
import { IconButton } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { Typography } from '@material-tailwind/react';
import { Drawer } from '@material-tailwind/react';
import { CiCirclePlus } from "react-icons/ci";


const DrawerDef = ({ users, chats }) => {
    const { user } = useAuth();
    const [openRight, setOpenRight] = useState(false);
    const navigate = useNavigate();

    const handleSelectedUser = async (selectedUser) => {
        const filteredChats = chats.filter(chat => chat.users.includes(selectedUser.id));
        if (filteredChats.length > 0) {
            console.log("Chat already exists with:", selectedUser);
            navigate(`/chat/${filteredChats[0].id}`);
        }
        else {
            try {
                console.log("Creating chat with:", user);
                console.log("Selected User:", selectedUser);
                const chatDocRef = collection(db, 'chats');
                const chatDoc = await addDoc(chatDocRef, {
                    users: [user.publicKey, selectedUser.id],
                });
                const chatId = chatDoc.id;
                console.log("Chat Created with:", selectedUser);
                console.log("Selected User:", selectedUser);
                navigate(`/chat/${chatId}`);
                setOpenRight(false);
            } catch (error) {
                console.error("Error creating chat:", error);
            }
        }
    }

    const closeDrawerRight = () => {
        setOpenRight(false);
    }

    return (
        <>
            <IconButton
                variant="text"
                className='text-gray-500'
                onClick={() => setOpenRight(true)}
            >
                <CiCirclePlus size={50} />
            </IconButton>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4"
                style={{ zIndex: 1000 }}
            >
                <div className='gap-10'>
                    <h1 className="text-3xl font-bold text-center text-black">Create Chat</h1>
                    <div className="flex flex-col gap-10 m-2">
                        {
                            users.map(user => (
                                <UserBlock
                                    key={user.publicKey}
                                    user={user}
                                    onClick={handleSelectedUser}
                                />
                            ))
                        }
                    </div>
                </div>
                <Button color="blue" onClick={closeDrawerRight}>Close</Button>
            </Drawer>
        </>
    )
}


const UserBlock = ({ user, onClick }) => {
    return (
        <div className="flex items-center justify-start gap-5 p-4 border-b border-gray-500 cursor-pointer">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div>
                <h3 className="text-lg font-semibold text-black whitespace-nowrap" onClick={() => onClick(user)}>
                    {user.name}
                </h3>
            </div>
        </div>
    );
}


const ChatBlock = ({ chat, user }) => {
    const [otherUser, setOtherUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const otherUserId = chat.users.find(userId => userId !== user.publicKey);

        const otherUserDocRef = doc(db, 'users', otherUserId);
        const unsubscribe = onSnapshot(otherUserDocRef, (otherUserDoc) => {
            if (otherUserDoc.exists()) {
                const otherUserData = otherUserDoc.data();
                setOtherUser(otherUserData);
            }
        });

        return () => unsubscribe();
    }, [chat, user]);

    const handleChatClick = () => {
        navigate(`/chat/${chat.id}`);
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-500">
            <div className="flex items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {otherUser ? otherUser.name : 'Loading...'}
                    </h3>
                    <p className="text-gray-500">Last message goes here</p>
                </div>
            </div>
            <div className="flex items-center">
                <button onClick={handleChatClick} className="px-2 py-1 text-white bg-blue-700 rounded whitespace-nowrap">
                    Open Chat
                </button>
            </div>
        </div>
    );
};


const Chat = () => {
    const navigate = useNavigate();
    const { user: loggedInUser } = useAuth(); // Use a different name for clarity
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [newChatError, setNewChatError] = useState('');

    useEffect(() => {
        console.log("Chats:", chats);
        if (loggedInUser) {
            const unsubscribe = onSnapshot(query(collection(db, 'chats'), where('users', 'array-contains', loggedInUser.publicKey)), (snapshot) => {
                const chatsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setChats(chatsData);
            });

            return () => unsubscribe();
        }
    }, [db, loggedInUser]);

    useEffect(() => {
        if (!loggedInUser) {
            console.log('User not logged in. Redirecting to login page...');
        }
        if (loggedInUser) {
            const unsubscribe = onSnapshot(query(collection(db, 'users')), (snapshot) => {
                const usersData = snapshot.docs
                    .filter(doc => doc.id !== loggedInUser.publicKey)
                    .map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersData);
                console.log("Users:", users);
            });
            return () => unsubscribe();
        }
    }, [db, loggedInUser]);

    return (
        <div className="flex flex-col justify-center p-4 text-white">
            <div>
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl font-bold text-center">Chats</h1>
                    <DrawerDef users={users} chats={chats} />
                </div>
                {
                    chats.map(chat => (
                        <ChatBlock key={chat.id} chat={chat} user={loggedInUser} />
                    ))
                }
            </div>
        </div>
    );
};

export default Chat;
