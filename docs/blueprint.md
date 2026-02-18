# **App Name**: ResumeAce

## Core Features:

- User Authentication: Secure user authentication with Firebase Auth, supporting email/password login and distinct roles (student/admin). User roles are stored in Firestore.
- Resume Analysis: Submit resume text and job description, and get an ATS score, matched keywords, missing keywords, improvement suggestions, and an improved resume using the OpenAI API in a Cloud Function. The improved resume generation incorporates a tool to decide what feedback or information should be included in the response.
- ATS Result Saving: Save the results of each resume analysis, including ATS score, keywords, and suggestions in Firestore with timestamping for each analysis.
- Admin Dashboard: View summarized data, like total user count, total resume analyses, average ATS score to review the usage of the system and act accordingly
- Student Dashboard: Upload resume, paste job description and view results to get an optimized resume

## Style Guidelines:

- Primary color: Soft blue (#94B2EB) to evoke trust and professionalism, while avoiding cliches of the resume/job industry, and echoing the original image provided by the user. Dark scheme.
- Background color: Light gray (#282A2E), desaturated to 20% for a muted, dark backdrop that will strongly contrast with other colors in the palette.
- Accent color: Violet (#BE94EB) to provide an alternative hue without deviating too far from the main visual experience.
- Body and headline font: 'Inter' (sans-serif) for a modern, neutral look.
- Note: currently only Google Fonts are supported.
- Use clean and professional icons for various sections and functions to improve the user interface
- Employ a modern, responsive design similar to resume.io for a clean, user-friendly interface as suggested by the provided image
- Incorporate loading states with subtle animations during AI processing to maintain user engagement.