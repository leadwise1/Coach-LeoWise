import React, { useState } from 'react';

// This component is designed to be reusable.
// It takes two "props" (inputs):
// 1. `prompt`: The specific instruction for the AI.
// 2. `buttonText`: The text to display on the button.

const AiFeatureButton = ({ prompt, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  // This is the main function that gets called when the button is clicked
  const handleAiClick = async () => {
    setIsLoading(true);
    setError('');
    setAiResponse('');

    try {
      // --- THIS IS WHERE THE GEMINI API CALL WILL GO ---
      // For now, we will simulate a successful API call to test the button's functionality.
      // We'll add the real 'fetch' request in our next step.
      
      console.log("Simulating Gemini API call with prompt:", prompt);

      // This creates a 2-second delay to mimic the AI thinking.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const simulatedResponse = `This is a simulated AI response for the prompt: "${prompt}". The real, dynamic response from the Gemini API would appear here once we connect it.`;
      setAiResponse(simulatedResponse);

    } catch (err) {
      console.error("API call simulation failed:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg text-center shadow-lg">
      {/* This is the button itself. The key part is `onClick={handleAiClick}`.
        This tells React to run our `handleAiClick` function whenever the button is pressed.
      */}
      <button
        onClick={handleAiClick}
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 font-semibold py-2 px-4 rounded-lg transition-colors w-full"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          buttonText
        )}
      </button>

      {/* This part of the component displays the AI's response or any errors */}
      {aiResponse && (
        <div className="mt-4 p-3 bg-gray-700 rounded-md text-left text-gray-200 animate-pulse">
          <p className="font-mono text-sm">{aiResponse}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-900 rounded-md text-left text-red-200">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AiFeatureButton;