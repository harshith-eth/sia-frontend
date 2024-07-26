// services/languageService.js
const languageService = {
  async processText(text) {
    const response = await fetch(process.env.REACT_APP_AZURE_LANGUAGE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_LANGUAGE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('Failed to process text');
    }

    const data = await response.json();
    return data;
  }
};

export default languageService;
