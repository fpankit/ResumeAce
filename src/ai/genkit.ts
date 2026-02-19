import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Ensure the plugin is initialized correctly. 
      // API key is typically handled via GOOGLE_GENAI_API_KEY environment variable.
    })
  ],
  // Updated to Gemini 2.0 Flash for high-speed, high-fidelity analysis and content generation.
  model: 'googleai/gemini-2.0-flash',
});
