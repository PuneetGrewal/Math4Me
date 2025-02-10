# Tutoring Website

This is a web application designed to streamline the enrollment process for a tutoring business. Built using **Next.js** and **Supabase**, the website will help manage student sign-ups, store submissions, and offer a more efficient method for both tutors and students.

## Features

- **Easy Enrollment System**: Students can easily sign up for tutoring sessions via an intuitive form.
- **Database Integration**: Submissions are stored securely in **Supabase** for easy management and access.
- **Dashboard (coming soon)**: A user-friendly dashboard will allow tutors and admins to manage and review student data.
- **Mobile Friendly**: The website is designed to be responsive and works seamlessly on both desktop and mobile devices.
- **Real-time Updates**: Changes are reflected in real-time, ensuring smooth user experience.

## Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Shadcn UI](https://github.com/shadcn/ui) (for UI components)
  
- **Backend**:
  - [Supabase](https://supabase.com/) (for database, authentication, and storage)
  
- **Other**:
  - [Vercel](https://vercel.com/) (for deployment)
  - [Tailwind CSS](https://tailwindcss.com/) (for styling)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PuneetGrewal/Math4Me.git
   cd Math4Me
   ```

2. **Install dependencies: Run the following command to install the required packages**:

```bash
Copy
Edit
npm install
```

3. **Set up environment variables: Create a .env.local file in the root of the project and add your Supabase API keys (and other necessary environment variables)**:


```bash
Edit
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server: Start the local development server**:

```bash
Copy
Edit
npm run dev
```
The site will be accessible at http://localhost:3000.

Closed source project.
