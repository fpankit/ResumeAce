import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure the plugin is initialized correctly. 
      // API key is typically handled via GOOGLE_GENAI_API_KEY environment variable.
    })
  ],
  // Updated to the latest Flash model as per requirement.
  model: 'googleai/gemini-flash-latest',
});
