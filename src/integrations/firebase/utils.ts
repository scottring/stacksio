import { Timestamp } from 'firebase/firestore';
import { 
  FirestoreTimestamp, 
  FirestorePIR, 
  PIR, 
  FirestoreAnswer, 
  Answer, 
  AnswerHistoryEntry 
} from '../../types';

// Convert Firestore Timestamp to ISO string for frontend use
export const timestampToISOString = (timestamp: FirestoreTimestamp | undefined): string | undefined => {
  if (!timestamp) return undefined;
  return timestamp.toDate().toISOString();
};

// Convert ISO string to Firestore Timestamp
export const isoStringToTimestamp = (isoString: string | undefined): Timestamp | undefined => {
  if (!isoString) return undefined;
  return Timestamp.fromDate(new Date(isoString));
};

// Convert Firestore PIR to frontend PIR
export const convertFirestorePIR = (firestorePIR: FirestorePIR): PIR => {
  return {
    ...firestorePIR,
    createdAt: timestampToISOString(firestorePIR.createdAt)!,
    updatedAt: timestampToISOString(firestorePIR.updatedAt)!,
    submittedAt: timestampToISOString(firestorePIR.submittedAt),
    reviewedAt: timestampToISOString(firestorePIR.reviewedAt),
    acceptedAt: timestampToISOString(firestorePIR.acceptedAt)
  };
};

// Convert frontend PIR to Firestore PIR
export const convertToPIRFirestore = (pir: PIR): Omit<FirestorePIR, 'id'> => {
  return {
    ...pir,
    createdAt: isoStringToTimestamp(pir.createdAt)!,
    updatedAt: isoStringToTimestamp(pir.updatedAt)!,
    submittedAt: isoStringToTimestamp(pir.submittedAt),
    reviewedAt: isoStringToTimestamp(pir.reviewedAt),
    acceptedAt: isoStringToTimestamp(pir.acceptedAt)
  };
};

// Convert Firestore Answer history to frontend Answer history
export const convertFirestoreAnswerHistory = (
  firestoreHistory: (Omit<AnswerHistoryEntry, 'timestamp'> & { timestamp: FirestoreTimestamp })[]
): AnswerHistoryEntry[] => {
  return firestoreHistory.map(entry => ({
    ...entry,
    timestamp: timestampToISOString(entry.timestamp)!
  }));
};

// Convert Firestore Answer to frontend Answer
export const convertFirestoreAnswer = (firestoreAnswer: FirestoreAnswer): Answer => {
  return {
    ...firestoreAnswer,
    createdAt: timestampToISOString(firestoreAnswer.createdAt)!,
    updatedAt: timestampToISOString(firestoreAnswer.updatedAt)!,
    history: convertFirestoreAnswerHistory(firestoreAnswer.history)
  };
};

// Generate a unique document ID for an answer based on pirId and questionId
export const generateAnswerDocId = (pirId: string, questionId: string): string => {
  return `${pirId}_${questionId}`;
};
