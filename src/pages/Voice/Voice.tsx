import React, { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
`;

const Button = styled.button<{ recording: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.recording ? "#f44336" : "#4CAF50")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: ${(props) => (props.recording ? "#d32f2f" : "#45a049")};
  }
`;

const LanguageSelector = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 8px;
    font-size: 16px;
    color: white;
  }

  select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
`;

const AudioPlayer = styled.audio`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

const Transcription = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  width: 100%;
  max-width: 600px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #333;
  }
`;

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRecording = async () => {
    if (!recording) {
      console.log("start recording");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event: any) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          setAudioURL(URL.createObjectURL(audioBlob));
          audioChunks.current = [];
        };

        mediaRecorder.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      console.log("stop recording");
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
      setRecording(false);
    }
  };

  const handleTranscription = async () => {
    if (!audioBlob) {
      console.warn("No audio recorded!");
      return;
    }
  
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("lang", selectedLanguage);
  
    try {
      const response = await fetch("https://voice.infinitai.ir/transcribe/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Transcription failed with status ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      if (data && data.audio_url && data.transcription) {
        setAudioURL(data.audio_url);
        setTranscription(data.transcription);
      } else {
        console.error("Transcription response missing expected data", data);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <Container>
      <h1 style={{ color: "#CCDFE5", margin: "40px" }}>Voice Transcription</h1>
      <LanguageSelector>
        <label htmlFor="language">Select Language</label>
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="fa">Farsi (Persian)</option>
          <option value="en">English (US)</option>
        </select>
      </LanguageSelector>
      <Button recording={recording} onClick={handleRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioBlob && !recording && (
        <Button recording={recording} onClick={handleTranscription}>
          Transcribe Audio
        </Button>
      )}
      {audioURL && (
        <AudioPlayer controls src={audioURL}>
          Your browser does not support the audio element.
        </AudioPlayer>
      )}
      {transcription && (
        <Transcription>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </Transcription>
      )}
    </Container>
  );
};

export default VoiceRecorder;