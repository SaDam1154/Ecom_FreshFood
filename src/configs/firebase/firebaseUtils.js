import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig'; // import đối tượng db từ file cấu hình firebase

// Hàm gửi tin nhắn
const sendMessage = async (newMessage) => {
    try {
        await addDoc(collection(db, 'messages'), {
            conversations: newMessage.conversations,
            text: newMessage.text,
            senderId: newMessage.senderId,
            timestamp: newMessage.timestamp,
        });
        console.log('Message sent successfully!');
    } catch (error) {
        console.error('Error sending message: ', error);
    }
};

// Hàm lấy danh sách tin nhắn
const getMessages = (conversationId, callback) => {
    try {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, where('conversations', '==', conversationId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error getting messages:', error);
        return () => {}; // Trả về một hàm rỗng để tránh lỗi nếu không có unsubscribe
    }
};

const checkAndCreateUser = async (customer) => {
    const userRef = doc(db, 'users', customer._id);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        await setDoc(userRef, {
            userId: customer._id,
            displayName: customer.name,
            role: 'customer',
        });
        console.log('New user created:', customer._id);
        return true;
    } else {
        console.log('User already exists:', customer._id);
        return false;
    }
};
const checkConversation = async (customer) => {
    try {
        const infoCustomer = await getUser(customer._id);
        const infoAdmin = await getUser('658957a7e30c9ef2e3045c99'); // id admin
        console.log('get infoCustomer', infoCustomer);
        console.log('get infoAdmin', infoAdmin);
        const q = query(
            collection(db, 'conversations'),
            where('participants', 'array-contains', infoCustomer),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log(`Conversation found for customer ID: ${customer._id}`);
            const conversationId = querySnapshot.docs[0].id;
            return conversationId;
        } else {
            console.log(`No conversation found for customer ID: ${customer._id}`);
            try {
                const newConversationRef = await addDoc(collection(db, 'conversations'), {
                    lastMessage: '',
                    participants: [infoCustomer, infoAdmin], // id admin
                });
                console.log('Add conversation successfully!');
                return newConversationRef.id;
            } catch (error) {
                console.error('Error sending message: ', error);
            }
            return null;
        }
    } catch (error) {
        console.error('Error checking conversation:', error);
        return false;
    }
};

const updateLastMessage = async (conversationId, lastMessage) => {
    try {
        const conversationRef = doc(db, 'conversations', conversationId);
        await updateDoc(conversationRef, { lastMessage: lastMessage });
        console.log('Last message updated successfully:', lastMessage);
        return true;
    } catch (error) {
        console.error('Error updating last message:', error);
        return false;
    }
};
const getUser = async (customerId) => {
    const userRef = doc(db, 'users', customerId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        return docSnap.data();
    } else {
        console.log('No such document!', customerId);
        return [];
    }
};
export {
    sendMessage,
    getMessages,
    getUser,
    checkAndCreateUser,
    checkConversation,
    updateLastMessage,
};
