import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, Zap } from 'lucide-react';

const SkillGapCard = ({ skillGap }) => {
  const { skill, severity } = skillGap;

  const getSeverityConfig = (sev) => {
    switch ((sev || '').toLowerCase()) {
      case 'high':
        return {
          label: 'Critical Gap',
          className: 'severity-high',
          icon: <AlertTriangle size={14} />,
          badgeColor: '#fb7185',
          advice: 'Likely to be tested in deep system rounds. Prioritize in Day 1-2 prep.',
        };
      case 'medium':
        return {
          label: 'Moderate Gap',
          className: 'severity-medium',
          icon: <AlertCircle size={14} />,
          badgeColor: '#fbbf24',
          advice: 'Expected competency. Practice core concepts, tradeoffs, and failure modes.',
        };
      case 'low':
      default:
        return {
          label: 'Minor / Familiarize',
          className: 'severity-low',
          icon: <CheckCircle size={14} />,
          badgeColor: '#34d399',
          advice: 'Secondary requirement. Review high-level principles and terminology.',
        };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <div
      style={{
        padding: '18px 20px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.35)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <h4 style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
          {skill}
        </h4>
        <span className={`severity-tag ${config.className}`} style={{ flexShrink: 0 }}>
          {config.icon}
          <span>{config.label}</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <Zap size={14} style={{ color: config.badgeColor, flexShrink: 0 }} />
        <span>{config.advice}</span>
      </div>
    </div>
  );
};

export default SkillGapCard;
