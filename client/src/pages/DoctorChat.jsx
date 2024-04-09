// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import { useAuth } from '@arcana/auth-react';
// import { db } from '../components/FirebaseSDK';
// import { onSnapshot, collection, where, query } from 'firebase/firestore';
// import { useRef } from 'react';
// import { addDoc, orderBy, doc, getDocs, getDoc } from 'firebase/firestore';

// const OutgoingMessage = ({ message }) => (
//     <div className="flex w-32 p-2 my-2 ml-auto text-xl bg-blue-500 rounded-md outgoing-message font-inter max-w-content">
//         {message.text}
//     </div>
// );

// const IncomingMessage = ({ message }) => (
//     <div className="flex w-32 p-2 my-2 text-xl text-gray-300 bg-gray-600 rounded-md incoming-message font-inter">
//         {message.text}
//     </div>
// );

// const DoctorChat = () => {
//     // const { user } = useAuth();
//     const { chatId } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [sender, setSender] = useState('');
//     const [receiver, setReceiver] = useState('');
//     const messagesEndRef = useRef(null);
//     const [chats, setChats] = useState([]);
//     const [messageSent, setMessageSent] = useState(false);

//     useEffect(() => {
//         const fetchChatData = async () => {
//             const chatDocRef = doc(db, 'chats', chatId);
//             const chatDocSnapshot = await getDoc(chatDocRef);
//             if (chatDocSnapshot.exists()) {
//                 const chatData = chatDocSnapshot.data();
//                 const members = chatData.users;
//                 if (members && members.length > 0) {
//                     const receiverId = members.find(memberId => memberId !== user?.publicKey);
//                     const senderId = members.find(memberId => memberId === user?.publicKey);
//                     setSender(senderId);
//                     setReceiver(receiverId);

//                     // Fetch receiver data
//                     const receiverDocRef = doc(db, 'users', receiverId);
//                     const receiverDocSnapshot = await getDoc(receiverDocRef);
//                     const receiverData = receiverDocSnapshot.data();
//                     setReceiver(receiverData);

//                     const messagesQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
//                     const messagesSnapshot = await getDocs(messagesQuery);
//                     const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
//                     setMessages(messagesData);
//                 }
//             }
//         };
//         fetchChatData();
//     }, [messageSent]);

//     useEffect(() => {
//         const chatQuery = query(collection(db, 'chats'), where('id', '==', chatId));
//         const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
//             const chatData = snapshot.docs[0]?.data();
//             const messagesCollection = chatData?.messages;

//             if (messagesCollection) {
//                 const messagesQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
//                 const messagesUnsubscribe = onSnapshot(messagesQuery, (messagesSnapshot) => {
//                     const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
//                     setMessages(messagesData);
//                 });

//                 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

//                 return () => messagesUnsubscribe();
//             }
//         });

//         return () => unsubscribe();
//     }, [messageSent]);

//     const handleSendMessage = async () => {
//         if (newMessage.trim() !== '') {
//             try {
//                 await addDoc(collection(db, 'chats', chatId, 'messages'), {
//                     sender: sender,
//                     text: newMessage,
//                     timestamp: new Date(),
//                 });
//                 setNewMessage('');
//                 setMessageSent(!messageSent); // Toggle messageSent state
//             } catch (error) {
//                 console.error('Error sending message:', error.message);
//             }
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             const unsubscribe = onSnapshot(query(collection(db, 'chats'), where('users', 'array-contains', user.publicKey)), (snapshot) => {
//                 const chatsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setChats(chatsData);
//             });
//             return () => unsubscribe();
//         }
//     }, [db, user]);

//     const selectedChat = chats.find((chat) => chat.id === chatId);

//     return (
//         <div className="flex flex-col h-screen text-white">
//             <div className="flex-grow px-4 py-2 overflow-y-auto">
//                 <div className="p-4 mb-4 rounded-md shadow-md">
//                     <h2 className="mb-2 text-2xl font-semibold text-center">Chatting with: {receiver?.name}</h2>
//                     {messages.map((message, index) => (
//                         message.sender === sender ? (
//                             <OutgoingMessage key={index} message={message} />
//                         ) : (
//                             <IncomingMessage key={index} message={message} />
//                         )
//                     ))}
//                     <div ref={messagesEndRef}></div>
//                 </div>
//             </div>
//             <div className="flex items-center justify-between p-4 bg-gray-700 border-t border-gray-600">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-grow p-2 mr-2 text-black border border-gray-600 rounded-md"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DoctorChat;
