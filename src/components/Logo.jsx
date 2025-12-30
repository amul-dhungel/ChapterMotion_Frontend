import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
    return (
        <svg
            className={`logo logo-${size}`}
            viewBox="0 0 600 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="motionGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#003366" />
                    <stop offset="50%" stopColor="#4A00E0" />
                    <stop offset="100%" stopColor="#00D2FF" />
                </linearGradient>
            </defs>

            <g transform="translate(50, 50) scale(1.2)">
                <path
                    d="M10,80 L10,10 C10,4.5 14.5,0 20,0 L50,0 C45,5 45,15 50,20 L50,90 C45,85 45,75 50,70 L20,70 C14.5,70 10,74.5 10,80 Z"
                    fill="#003366"
                />
                <path
                    d="M10,80 C10,85.5 14.5,90 20,90 L50,90 C45,85 45,75 50,70 L20,70 C14.5,70 10,74.5 10,80 Z"
                    fill="#002244"
                />
                <path
                    d="M50,20 C60,20 75,10 90,0 L110,15 C95,25 75,40 50,35 L50,20 Z"
                    fill="url(#motionGradient)"
                />
                <path
                    d="M50,35 C70,40 85,30 100,20 L115,30 C100,45 75,55 50,50 L50,35 Z"
                    fill="url(#motionGradient)"
                    opacity="0.7"
                />
                <g fill="#FFFFFF">
                    <rect x="92" y="4" width="4" height="3" rx="1" transform="rotate(-15 94 5.5)" />
                    <rect x="102" y="10" width="4" height="3" rx="1" transform="rotate(-20 104 11.5)" />
                    <rect x="112" y="17" width="4" height="3" rx="1" transform="rotate(-25 114 18.5)" />
                </g>
            </g>

            <g transform="translate(220, 125)">
                <text
                    fontSize="48"
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fill="#003366"
                >
                    Chapter
                </text>
                <text
                    x="215"
                    fontSize="48"
                    fontFamily="Montserrat"
                    fontWeight="400"
                    fill="#4A00E0"
                >
                    Motion
                </text>
            </g>
        </svg>
    );
};

export default Logo;
