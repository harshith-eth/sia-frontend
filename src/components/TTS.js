import { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    setIsSpeaking(true);
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_SPEECH_KEY, process.env.REACT_APP_AZURE_SPEECH_REGION);
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("TTS: Synthesis finished.");
        } else {
          console.error("TTS: Speech synthesis canceled, " + result.errorDetails);
        }
        synthesizer.close();
        setIsSpeaking(false);
      },
      error => {
        console.error("TTS: Error synthesizing speech: " + error);
        synthesizer.close();
        setIsSpeaking(false);
      });
  };

  return { textToSpeech, isSpeaking };
};