import React, { useRef, useState, useEffect } from 'react';
import './InteractiveVideoPlayer.css';

const InteractiveVideoPlayer = ({ videoUrl, onClose }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * duration;
    };

    const changeSpeed = (speed) => {
        videoRef.current.playbackRate = speed;
        setPlaybackSpeed(speed);
    };

    const skipTime = (seconds) => {
        videoRef.current.currentTime += seconds;
    };

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="interactive-video-player">
            <div className="video-container">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="video-element"
                    onClick={togglePlay}
                />

                <div className="video-overlay">
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
            </div>

            <div className="video-controls">
                <div className="timeline" onClick={handleSeek}>
                    <div
                        className="timeline-progress"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                <div className="controls-row">
                    <div className="controls-left">
                        <button className="control-btn" onClick={() => skipTime(-5)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 5V2L6 6l4 4V7c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4H4c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6z" />
                            </svg>
                            -5s
                        </button>

                        <button className="control-btn play-btn" onClick={togglePlay}>
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button className="control-btn" onClick={() => skipTime(5)}>
                            +5s
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 5V2l4 4-4 4V7c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4h2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6z" />
                            </svg>
                        </button>

                        <span className="time-display">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="controls-right">
                        <div className="speed-controls">
                            {[0.5, 1, 1.5, 2].map(speed => (
                                <button
                                    key={speed}
                                    className={`speed-btn ${playbackSpeed === speed ? 'active' : ''}`}
                                    onClick={() => changeSpeed(speed)}
                                >
                                    {speed}x
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveVideoPlayer;
