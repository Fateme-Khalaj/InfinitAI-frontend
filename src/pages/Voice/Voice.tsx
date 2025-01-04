import React, { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding-top: 8%;
  padding-left: 10%;
  width: 80%;
  height: 550px;
  background-color: #1a3848;
  border-radius: 20px;
`;

const LanguageSelector = styled.div`
  margin-bottom: 20px;
  margin-top: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    margin-right: 10px;
    font-size: 16px;
    color: white;
  }

  select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    background-color: #2a5069; /* Custom background color */
    color: white; /* Custom text color */
    cursor: pointer;

    /* Custom border color on focus */
    &:focus {
      border-color: #4caf50;
    }
  }

  select option {
    background-color: #2a5069; /* Custom background for options */
    color: white; /* Custom text color for options */
    padding: 10px;
  }

  select option:hover {
    background-color: #1a3848; /* Hover effect */
  }
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
  margin-top: 20px;

  &:hover {
    background-color: ${(props) => (props.recording ? "#d32f2f" : "#45a049")};
  }
`;

const AudioPlayer = styled.audio`
  margin-top: 20px;
  margin-bottom: 20px;
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
  const [selectedLanguage, setSelectedLanguage] = useState("fa");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRecording = async () => {
    if (!recording) {
      console.log("Start recording...");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.current.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          const audioFileURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioFileURL);

          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.wav");
          formData.append("lang", selectedLanguage);

          try {
            const response = await fetch(
              "https://voice.infinitai.ir/transcribe/",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Transcription failed: ${errorText}`);
            }

            const data = await response.json();
            setTranscription(
              data.transcription || "No transcription received."
            );
          } catch (error) {
            console.error("Error transcribing audio:", error);
            setTranscription("Error occurred during transcription.");
          }

          audioChunks.current = [];
        };

        mediaRecorder.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      console.log("Stop recording...");
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
      setRecording(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <h1 style={{ color: "#CCDFE5", margin: "50px 30px 30px 0px" }}>
          Voice Transcription
        </h1>
        <LanguageSelector>
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="fa">Farsi (Persian)</option>
            <option value="en">English (US)</option>
          </select>
        </LanguageSelector>
        <Button recording={recording} onClick={handleRecording}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Button>
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
    </Wrapper>
  );
};

export default VoiceRecorder;
