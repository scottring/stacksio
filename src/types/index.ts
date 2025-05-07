// PIR Status Types
export type PIRStatus = 'requested' | 'submitted' | 'reviewed' | 'accepted';

// Answer Status Types
export type AnswerStatus = 'unanswered' | 'draft' | 'submitted' | 'accepted' | 'revision_requested';

// User Roles
export type UserRole = 'customer' | 'vendor' | 'reviewer' | 'admin';

// Base entity with common fields
interface BaseEntity {
  id: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  createdBy: string; // userId
}

// PIR Entity
export interface PIR extends BaseEntity {
  title: string;
  description: string;
  status: PIRStatus;
  tagIds: string[]; // At least one tag required
  productId: string;
  companyId: string;
  questionIds?: string[]; // Set when PIR is submitted
  submittedAt?: string;
  reviewedAt?: string; // Added to match new lifecycle
  acceptedAt?: string; // Added to match new lifecycle
}

// Question Entity
export interface Question extends BaseEntity {
  text: string;
  tagIds: string[]; // Questions are associated with tags
  type: 'text' | 'select' | 'multiselect' | 'boolean';
  required: boolean;
  options?: string[]; // For select/multiselect questions
}

// Answer History Entry
export interface AnswerHistoryEntry {
  timestamp: string;
  userId: string;
  answerText: string;
  status: AnswerStatus;
  comment?: string; // Optional comment when requesting revision
}

// Answer Entity
export interface Answer extends BaseEntity {
  pirId: string;
  questionId: string;
  answerText: string;
  status: AnswerStatus;
  history: AnswerHistoryEntry[];
}

// Tag Entity
export interface Tag extends BaseEntity {
  label: string;
  description?: string;
  parentId?: string; // For hierarchical tags
}

// Product Entity
export interface Product extends BaseEntity {
  name: string;
  description?: string;
}

// Company Entity
export interface Company extends BaseEntity {
  name: string;
  description?: string;
}

// User Entity
export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
}

// Firestore Timestamp utilities
export interface FirestoreTimestamp {
  toDate: () => Date;
  toMillis: () => number;
}

// Firestore document with Timestamp fields
export interface FirestorePIR extends Omit<PIR, 'createdAt' | 'updatedAt' | 'submittedAt' | 'reviewedAt' | 'acceptedAt'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  submittedAt?: FirestoreTimestamp;
  reviewedAt?: FirestoreTimestamp;
  acceptedAt?: FirestoreTimestamp;
}

export interface FirestoreAnswer extends Omit<Answer, 'createdAt' | 'updatedAt' | 'history'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  history: (Omit<AnswerHistoryEntry, 'timestamp'> & { timestamp: FirestoreTimestamp })[];
}

// Similar for other entities with timestamps
export interface FirestoreQuestion extends Omit<Question, 'createdAt' | 'updatedAt'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface FirestoreTag extends Omit<Tag, 'createdAt' | 'updatedAt'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface FirestoreProduct extends Omit<Product, 'createdAt' | 'updatedAt'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface FirestoreCompany extends Omit<Company, 'createdAt' | 'updatedAt'> {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

// Attachment interfaces
export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadUrl: string;
  createdAt: string;
  createdBy: string;
  pirId: string;
  questionId?: string; // Optional, if attached to a specific question
  answerDocId?: string; // Optional, if attached to an answer
}

export interface FirestoreAttachment extends Omit<Attachment, 'createdAt'> {
  createdAt: FirestoreTimestamp;
}
