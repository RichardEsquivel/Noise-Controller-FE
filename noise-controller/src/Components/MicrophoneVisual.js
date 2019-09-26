import React, { useState, useEffect } from "react";
import VolumeAnalyser from "./VolumeAnalyser";

const MicrophoneVisual = ({ setIsPlaying, setIsLoud, startGame }) => {
  const [audio, setAudio] = useState(null);
  const [updateVolA, setUpdateVolA] = useState(false);

  useEffect(() => {
    if (startGame) {
      getMicrophone();
    }

    if (!startGame && audio) {
      stopMicrophone();
      if (setIsPlaying) setIsPlaying(false);
    }
  }, [startGame]);

  const getMicrophone = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    if (setIsPlaying) setIsPlaying(true);
    setUpdateVolA(true);
    setAudio(media);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach(track => track.stop());
    setUpdateVolA(false);
    setAudio(null);
  };

  return (
    <div>
      <VolumeAnalyser
        audio={audio}
        setIsLoud={setIsLoud}
        updateVolA={updateVolA}
        setUpdateVolA={setUpdateVolA}
      />
    </div>
  );
};

export default MicrophoneVisual;
