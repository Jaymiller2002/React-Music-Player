import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './MusicPlayer.css';

import track1Image from './assets/images/beach-5526592_1280.jpg';
import track2Image from './assets/images/milky-way-2695569_1280.jpg';
import track3Image from './assets/images/milky-way-5673357_1280.jpg';
import track4Image from './assets/images/night-4695490_1280.jpg';
import track5Image from './assets/images/night-sky-6039591_1280.jpg';
import track6Image from './assets/images/plouzane-1758197_1280.jpg';
import track7Image from './assets/images/road-4055838_1280.jpg';
import track8Image from './assets/images/seascape-4636264_1280.jpg';
import track9Image from './assets/images/sunset-5136129_1280.jpg';
import track10Image from './assets/images/thunderstorm-3625405_1280.jpg';

import track1Mp3 from './assets/mp3/summer-rain-lofi-vibes-216043.mp3';
import track2Mp3 from './assets/mp3/good-night-160166.mp3';
import track3Mp3 from './assets/mp3/for-a-dream-lofi-vibes-216038.mp3';
import track4Mp3 from './assets/mp3/fat-chillin-196099.mp3';
import track5Mp3 from './assets/mp3/workout-trap-172029.mp3';
import track6Mp3 from './assets/mp3/good-morning-144685.mp3';
import track7Mp3 from './assets/mp3/playa-del-sol-latin-lofi-160149.mp3';
import track8Mp3 from './assets/mp3/virtual-insanity-208607.mp3';
import track9Mp3 from './assets/mp3/Too Close To Touch & Bad Omens - _Novocaine_.mp3';
import track10Mp3 from './assets/mp3/Cleffy -  Meet you at the Graveyard (Official Lyric Video).mp3';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    {
      name: 'Track 1',
      url: track1Mp3,
      image: track1Image
    },
    {
      name: 'Track 2',
      url: track2Mp3,
      image: track2Image
    },
    {
      name: 'Track 3',
      url: track3Mp3,
      image: track3Image
    },
    {
      name: 'Track 4',
      url: track4Mp3,
      image: track4Image
    },
    {
      name: 'Track 5',
      url: track5Mp3,
      image: track5Image
    },
    {
      name: 'Track 6',
      url: track6Mp3,
      image: track6Image
    },
    {
      name: 'Track 7',
      url: track7Mp3,
      image: track7Image
    },
    {
      name: 'Track 8',
      url: track8Mp3,
      image: track8Image
    },
    {
      name: 'Track 9',
      url: track9Mp3,
      image: track9Image
    },
    {
      name: 'Track 10',
      url: track10Mp3,
      image: track10Image
    },
  ];

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.audioEl.current.pause();
    } else {
      audioRef.current.audioEl.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
  };

  // Automatically play the next track when the current one ends
  useEffect(() => {
    const handleEnded = () => {
      nextTrack();
      setIsPlaying(true);
    };
    const audioElement = audioRef.current.audioEl.current;
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isPlaying]);

  return (
    <div className='music-player'>
      <h1>Music Player</h1>
      <img src={tracks[currentTrack].image} alt={tracks[currentTrack].name} className='track-image' />
      <ReactAudioPlayer
        src={tracks[currentTrack].url}
        ref={audioRef}
        autoPlay={isPlaying}
        controls
      />
      <div className='controls'>
        <button className='control-button' onClick={prevTrack}>Previous</button>
        <button className='control-button' onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button className='control-button' onClick={nextTrack}>Next</button>
      </div>
      <div className='track-info'>Now playing: {tracks[currentTrack].name}</div>
    </div>
  );
};

export default MusicPlayer;
