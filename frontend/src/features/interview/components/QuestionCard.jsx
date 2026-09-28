import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const QuestionCard = ({ item, index, type = 'technical' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMastered, setIsMastered] = useState(false);
  const [copied, setCopied] = useState(false);

  const { question, intention, answer } = item;

  const handleCopyAnswer = (e) => {
    e.stopPropagation();
    if (answer) {
      navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isTech = type === 'technical';

  return (
    <div
      className="accordion-item"
      style={{
        borderColor: isMastered ? 'rgba(16, 185, 129, 0.4)' : undefined,
      }}
    >
      <div
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isMastered ? 'rgba(16, 185, 129, 0.04)' : undefined,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: isTech ? 'rgba(99, 102, 241, 0.15)' : 'rgba(236, 72, 153, 0.15)',
              color: isTech ? 'var(--primary-light)' : '#f472b6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {isTech ? <Code2 size={16} /> : <MessageSquare size={16} />}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: isTech ? 'var(--primary-light)' : '#f472b6',
                  letterSpacing: '0.06em',
                }}
              >
                {isTech ? `Technical Question #${index + 1}` : `Behavioral Question #${index + 1}`}
              </span>
              {isMastered && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>Mastered</span>
                </span>
              )}
            </div>

            <h3 className="accordion-title">{question}</h3>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMastered(!isMastered);
            }}
            title={isMastered ? 'Mark as in-progress' : 'Mark as mastered'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isMastered ? '#34d399' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            <CheckCircle2 size={18} />
          </button>

          <div style={{ color: 'var(--text-muted)' }}>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-content">
          {/* Intention Section */}
          {intention && (
            <div
              style={{
                marginTop: '16px',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(99, 102, 241, 0.07)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                gap: '12px',
              }}
            >
              <Target
                size={18}
                style={{
                  color: 'var(--primary-light)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--primary-light)',
                    marginBottom: '4px',
                  }}
                >
                  Interviewer's Hidden Intention
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {intention}
                </div>
              </div>
            </div>
          )}

          {/* Model Answer Section */}
          {answer && (
            <div style={{ marginTop: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={14} style={{ color: 'var(--cyan)' }} />
                  <span>Model Answer & Strategy</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAnswer}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {copied ? (
                    <>
                      <Check size={13} style={{ color: '#34d399' }} />
                      <span style={{ color: '#34d399' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Answer</span>
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(5, 8, 15, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                  fontFamily: isTech ? 'var(--font-sans)' : 'var(--font-sans)',
                }}
              >
                {answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
