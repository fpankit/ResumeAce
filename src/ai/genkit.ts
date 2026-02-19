import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure the plugin is initialized correctly. 
      // API key is typically handled via GOOGLE_GENAI_API_KEY environment variable.
    })
  ],
  // Switched to Gemini 1.5 Flash to ensure stable quota and high performance.
  model: 'googleai/gemini-1.5-flash',
});
