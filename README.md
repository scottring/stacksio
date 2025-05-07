# Stacksio

Product Information Request (PIR) workflow system built with React, TypeScript, and Firebase Firestore

## Overview

Stacksio is a modern web application for managing the Product Information Request process in B2B environments. It allows customers to create requests for product information, vendors to answer questions, and supports a complete review workflow with document attachments and email notifications.

## Core Features

- **PIR Lifecycle Management**: Create, submit, review, and accept PIRs
- **Tag-Based Question Matching**: Questions are dynamically selected based on tags
- **Real-time Collaboration**: Powered by Firebase Firestore
- **Role-Based Access Control**: Different permissions for customers, vendors, reviewers, and admins
- **Answer History Tracking**: Full history of all answer revisions and comments
- **Document Attachments**: Upload and manage files at PIR and question/answer levels
- **Email Notifications**: Automated emails for key PIR workflow events (via SendGrid)

## Tech Stack

- **Frontend**: React, TypeScript, Zustand, React Router, Tailwind CSS
- **UI Components**: Shadcn UI
- **Forms**: React Hook Form with Zod validation
- **Backend**: Firebase Firestore, Firebase Auth, Firebase Functions, Firebase Storage
- **Email Service**: SendGrid
- **Deployment**: Firebase Hosting

## PIR Lifecycle States

1. **Requested**: Initial state when a PIR is created by a customer
2. **Submitted**: PIR is submitted for review, and questions are locked in
3. **Reviewed**: Vendor has provided answers and completed their assessment 
4. **Accepted**: Customer has accepted the PIR as complete
