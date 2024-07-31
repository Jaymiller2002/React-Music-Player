import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    {
      name: 'Track 1',
      url: '/src/assets/mp3/summer-rain-lofi-vibes-216043.mp3',
      image: '/src/assets/images/track1.jpg'
    },
    {
      name: 'Track 2',
      url: '/src/assets/mp3/good-night-160166.mp3',
      image: '/src/assets/images/track2.jpg'
    },
    {
      name: 'Track 3',
      url: 'src/assets/mp3/for-a-dream-lofi-vibes-216038.mp3',
      image: '/src/assets/images/track3.jpg'
    },
    {
      name: 'Track 4',
      url: 'src/assets/mp3/fat-chillin-196099.mp3',
      image: '/src/assets/images/track4.jpg'
    },
    {
      name: 'Track 5',
      url: 'src/assets/mp3/workout-trap-172029.mp3',
      image: '/src/assets/images/track5.jpg'
    },
    {
      name: 'Track 6',
      url: 'src/assets/mp3/good-morning-144685.mp3',
      image: '/src/assets/images/track6.jpg'
    },
    {
      name: 'Track 7',
      url: 'src/assets/mp3/playa-del-sol-latin-lofi-160149.mp3',
      image: '/src/assets/images/track7.jpg'
    },
    {
      name: 'Track 8',
      url: 'src/assets/mp3/virtual-insanity-208607.mp3',
      image: '/src/assets/images/track8.jpg'
    },
    {
      name: 'Track 9',
      url: '',
      image: ''
    },
    {
      name: 'Track 10',
      url: '',
      image: ''
    },
    // Add more tracks here
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
  }, [currentTrack]);

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
