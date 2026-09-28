import React, { useEffect, useState } from 'react';

const MatchScoreGauge = ({ score = 85, size = 200, strokeWidth = 14 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let gradientId = 'gaugeGradientHigh';
  let primaryColor = '#10b981';
  let secondaryColor = '#06b6d4';
  let statusText = 'Exceptional Match';
  let statusDesc = 'Your profile matches the core technical qualifications with high confidence.';

  if (score < 60) {
    gradientId = 'gaugeGradientLow';
    primaryColor = '#f43f5e';
    secondaryColor = '#fb923c';
    statusText = 'Foundational Match';
    statusDesc = 'Significant targeted preparation recommended to bridge critical skill gaps.';
  } else if (score < 80) {
    gradientId = 'gaugeGradientMed';
    primaryColor = '#f59e0b';
    secondaryColor = '#eab308';
    statusText = 'Strong Potential Match';
    statusDesc = 'Solid baseline alignment. Closing moderate gaps will dramatically increase offer rate.';
  }

  return (
    <div className="radial-container" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="radial-svg"
      >
        <defs>
          <linearGradient id="gaugeGradientHigh" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="gaugeGradientMed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="gaugeGradientLow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="radial-bg"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="radial-progress"
          filter="url(#gaugeGlow)"
        />
      </svg>

      {/* Centered Score Label */}
      <div className="radial-center-text">
        <div className="radial-score-val" style={{ color: primaryColor }}>
          {animatedScore}%
        </div>
        <div className="radial-score-sub">Match Score</div>
      </div>
    </div>
  );
};

export default MatchScoreGauge;
