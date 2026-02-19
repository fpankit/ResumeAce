import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure the plugin is initialized correctly. 
      // API key is typically handled via GOOGLE_GENAI_API_KEY environment variable.
    })
  ],
  // Switched to 2.0 Flash to bypass 1.5 Flash quota limits and improve speed.
  model: 'googleai/gemini-2.0-flash',
});
