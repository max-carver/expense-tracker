import { addDoc, collection, serverTimestamp } from 'firebase/firestore' 
import { db } from '../config/firebase';
import { useGetUserInfo } from '../hooks/useGetUserInfo'

export const useAddtransaction = () => {
  const transactionCollectionRef = collection(db, 'transactions');
  const { userID } = useGetUserInfo();

  const addTransaction = async ({description, transactionAmount, transactionType}) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  }
  return{ addTransaction }
}