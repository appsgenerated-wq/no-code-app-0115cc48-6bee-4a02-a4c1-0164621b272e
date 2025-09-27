# Onion Encyclopedia

Welcome to the Onion Encyclopedia, a collaborative web application for cataloging and exploring different varieties of onions. This project is built entirely with React for the frontend and Manifest for the backend.

## Features

- **User Authentication**: Sign up, log in, and manage your account.
- **CRUD Operations**: Create, read, update, and delete onion variety entries.
- **Image Uploads**: Add a photo for each onion variety.
- **Ownership**: Users can only edit or delete the entries they have created.
- **Admin Panel**: A built-in admin interface to manage all data and users.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Backend Setup:**
    The backend is powered by Manifest and is automatically provisioned. No local setup is required. The frontend will connect to the deployed Manifest instance.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## How to Use

1.  **Sign Up**: Create a new account using your name, email, and password.
2.  **Log In**: Access your account with your email and password.
3.  **Browse Varieties**: View all onion varieties submitted by the community.
4.  **Add a Variety**: Click the 'Add New Onion Variety' button to open the form. Fill in the details and upload an optional photo.
5.  **Manage Your Entries**: You will see a delete button on the varieties you have created.
6.  **Admin Access**: Navigate to the Admin Panel using the link on the dashboard to manage all users and data. Default admin credentials are `admin@manifest.build` / `admin`.
