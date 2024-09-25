# Hospital Management System

## Overview

The **Hospital Management System** (HMS) is a fully responsive web application designed to streamline hospital operations, improve patient care, and enhance the overall hospital experience for staff and patients. The system provides efficient management of patient records, appointments, billing, and staff schedules, enabling smooth communication between hospital staff and patients.

This project is developed using **React, React-Redux, and Redux Thunk** for the frontend, while the backend is powered by **Node.js** and **Express**, with **PostgreSQL** as the database.

### Key Features:
- Manage patient records, appointments, billing, and staff schedules.
- Provide role-based access control for administrators, healthcare providers, and patients.
- Facilitate secure payment processing for patients.
- Improve communication between hospital staff and patients.

## Table of Contents
- [Project Features](#project-features)
- [Types of Users](#types-of-users)
  - [Administrators](#administrators)
  - [Healthcare Providers (Doctors and Nurses)](#healthcare-providers)
  - [Patients](#patients)
- [Key Requirements](#key-requirements)
  - [User Registration and Authentication](#user-registration-and-authentication)
  - [Patient and Appointment Management](#patient-and-appointment-management)
  - [Billing and Payment Processing](#billing-and-payment-processing)
  - [Staff Scheduling and Task Management](#staff-scheduling-and-task-management)
- [Website Structure](#website-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)

## Project Features

- **User Roles and Permissions**: Role-based access control for administrators, healthcare providers (doctors and nurses), and patients. Each user type has specific roles and responsibilities within the system.
  
- **Appointment Management**: Patients can book appointments with healthcare providers, and doctors can manage and track upcoming and past appointments.

- **Patient Record Management**: Healthcare providers can create, update, and delete patient medical records, including treatment plans and diagnostic results.

- **Billing and Payments**: Patients can securely view and pay their bills using integrated payment systems.

- **Staff Scheduling**: Doctors and nurses can manage their schedules, update availability, and track tasks and appointments.

## Types of Users

### 1. Administrators
- **Roles and Responsibilities**:
  - Manage user roles, permissions, and content moderation.
  - Oversee patient records, staff schedules, and billing operations.
  - Handle patient feedback and user reports related to system issues.

### 2. Healthcare Providers (Doctors and Nurses)
- **Roles and Responsibilities**:
  - Manage patient medical records and treatment plans.
  - Schedule, manage, and track appointments.
  - Communicate with patients, respond to inquiries, and provide medical updates.

### 3. Patients
- **Roles and Responsibilities**:
  - Access personal health information, including medical records and appointments.
  - Book, reschedule, or cancel appointments with healthcare providers.
  - View bills, make payments, and leave feedback on hospital services.

## Key Requirements

### 1. User Registration and Authentication
- Implement a secure system for user registration and authentication.
- Role-based access control for different user types (patients, healthcare providers, administrators).
- Optional: Social login for patients (Google/Facebook).

### 2. Patient and Appointment Management
- **Patient Records**: Healthcare providers can create, edit, and delete patient records.
- **Appointment Scheduling**: Patients can book appointments based on provider availability. Doctors can approve, reschedule, or mark appointments as completed.
  
### 3. Billing and Payment Processing
- Patients can view their medical bills and securely make payments.
- Optional: Integration with Stripe or PayPal for payment processing.

### 4. Staff Scheduling and Task Management
- Doctors and nurses can view their schedules and update their availability for appointments.

## Website Structure

1. **Home Page**: Introduction to the hospital management system, highlighting key features.
2. **Login/Register Page**: Allows patients, healthcare providers, and administrators to log in or register.
3. **User Profile Page**: Displays user details, including personal or professional information, medical history, and appointments.
4. **Appointment Management Page**: Patients can view appointment history, and doctors can manage upcoming appointments.
5. **Patient Record Management Page**: Allows doctors to manage patient records and medical histories.
6. **Billing and Payments Page**: Displays billing information and provides payment options for patients.
7. **About Us Page**: Information about the hospital or platform.
8. **Contact Us Page**: A form or contact details for patients to reach out to hospital staff.
9. **Admin Dashboard**: Tools for administrators to manage patient records, staff schedules, billing, and analytics.

## Technologies Used
- **Frontend**: React, React-Redux, Redux Thunk, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Optional integration with Stripe or PayPal
- **Version Control**: Git
