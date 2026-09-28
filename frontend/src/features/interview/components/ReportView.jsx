import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import MatchScoreGauge from './MatchScoreGauge';
import SkillGapCard from './SkillGapCard';
import QuestionCard from './QuestionCard';
import RoadmapDayCard from './RoadmapDayCard';
import {
  ArrowLeft,
  Sparkles,
  Printer,
  Copy,
  Check,
  Code2,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';

const ReportView = ({ report }) => {
  const navigate = useNavigate();
  const { clearCurrentReport } = useInterview();

  const [activeTab, setActiveTab] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showFullJobDesc, setShowFullJobDesc] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  if (!report) return null;

  const {
    jobDescription = '',
    resume = '',
    selfDescription = '',
    matchScore = 0,
    skillGaps = [],
    technicalQuestions = [],
    behavioralQuestions = [],
    preparationPlan = [],
  } = report;

  // Calculate total tasks for the roadmap progress
  const totalTasks = preparationPlan.reduce(
    (acc, dayItem) => acc + (dayItem.tasks ? dayItem.tasks.length : 0),
    0
  );

  const handleTaskToggle = (day, index, isCompleted) => {
    setCompletedTasksCount((prev) =>
      isCompleted ? prev + 1 : Math.max(0, prev - 1)
    );
  };

  const roadmapProgressPercent =
    totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  const handleCopySummary = () => {
    const summaryText = `InterviewPilot Report
Match Score: ${matchScore}%
Skill Gaps Identified: ${skillGaps.length}
Technical Questions to Practice: ${technicalQuestions.length}
Behavioral Questions to Practice: ${behavioralQuestions.length}
Preparation Plan: ${preparationPlan.length} Days

Target Role: ${jobDescription.slice(0, 150)}...`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    clearCurrentReport();
    navigate('/');
  };

  const filteredSkillGaps = skillGaps.filter((g) => {
    if (severityFilter === 'all') return true;
    return (g.severity || '').toLowerCase() === severityFilter.toLowerCase();
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <button
          className="btn-secondary"
          onClick={handleBack}
          style={{ padding: '8px 14px' }}
        >
          <ArrowLeft size={16} />
          <span>New Preparation Plan</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={handleCopySummary}
            style={{ padding: '8px 14px' }}
          >
            {copiedSummary ? (
              <>
                <Check size={15} style={{ color: '#34d399' }} />
                <span style={{ color: '#34d399' }}>Copied</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            className="btn-secondary"
            onClick={handlePrint}
            style={{ padding: '8px 14px' }}
            title="Print or Save PDF"
          >
            <Printer size={15} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Match Score Hero Card */}
      <div className="glass-panel" style={{ padding: '32px 36px' }}>
        <div className="match-hero-grid">
          {/* Radial Score Gauge */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MatchScoreGauge score={matchScore} size={210} />
          </div>

          {/* Qualitative Metrics & Context */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                background:
                  matchScore >= 80
                    ? 'rgba(16, 185, 129, 0.15)'
                    : matchScore >= 60
                    ? 'rgba(245, 158, 11, 0.15)'
                    : 'rgba(244, 63, 94, 0.15)',
                color:
                  matchScore >= 80
                    ? '#34d399'
                    : matchScore >= 60
                    ? '#fbbf24'
                    : '#fb7185',
                border:
                  matchScore >= 80
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : matchScore >= 60
                    ? '1px solid rgba(245, 158, 11, 0.3)'
                    : '1px solid rgba(244, 63, 94, 0.3)',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={13} />
              <span>
                {matchScore >= 80
                  ? 'Strong Candidate Alignment'
                  : matchScore >= 60
                  ? 'Moderate Technical Fit'
                  : 'Targeted Preparation Needed'}
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: '10px',
              }}
            >
              Resume Compatibility Assessment
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginBottom: '20px',
              }}
            >
              {matchScore >= 80
                ? 'Your profile reflects deep synergy with the required core competencies. Polishing high-level system design trade-offs and behavioral STAR narratives will maximize your offer probability.'
                : matchScore >= 60
                ? 'You possess a solid foundation for this role, with key technical overlap. Addressing the prioritized skill gaps below will elevate your candidacy into the top tier.'
                : 'Significant divergence identified between your resume and the stated requirements. Follow the day-wise roadmap strictly to close critical knowledge gaps before the interview.'}
            </p>

            {/* Metric Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
              }}
            >
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Skill Gaps
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fb7185',
                    marginTop: '2px',
                  }}
                >
                  {skillGaps.length}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tech Questions
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--primary-light)',
                    marginTop: '2px',
                  }}
                >
                  {technicalQuestions.length}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Behavioral Qs
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#f472b6',
                    marginTop: '2px',
                  }}
                >
                  {behavioralQuestions.length}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Study Roadmap
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--cyan)',
                    marginTop: '2px',
                  }}
                >
                  {preparationPlan.length} Days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Job Description Snippet */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={() => setShowFullJobDesc(!showFullJobDesc)}
          >
            <div
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              Target Role Context & Candidate Self-Description
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              {showFullJobDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {showFullJobDesc && (
            <div
              style={{
                marginTop: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Job Description Summary
                </div>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {jobDescription}
                </p>
              </div>

              {selfDescription && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    Candidate Pitch / Background
                  </div>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {selfDescription}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Layers size={16} />
          <span>Full Comprehensive Report</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <AlertTriangle size={16} />
          <span>Skill Gaps ({skillGaps.length})</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
          onClick={() => setActiveTab('tech')}
        >
          <Code2 size={16} />
          <span>Technical Questions ({technicalQuestions.length})</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
          onClick={() => setActiveTab('behavioral')}
        >
          <MessageSquare size={16} />
          <span>Behavioral Questions ({behavioralQuestions.length})</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Calendar size={16} />
          <span>Day-Wise Roadmap ({preparationPlan.length} Days)</span>
        </button>
      </div>

      {/* SECTION 1: Skill Gaps */}
      {(activeTab === 'all' || activeTab === 'skills') && (
        <section style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(244, 63, 94, 0.15)',
                    color: '#fb7185',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AlertTriangle size={16} />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  Skill Gaps & Remediation Strategy
                </h3>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                Identified variances between your resume experience and expected role qualifications
              </p>
            </div>

            {/* Severity Filter Pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['all', 'high', 'medium', 'low'].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: '1px solid',
                    cursor: 'pointer',
                    background:
                      severityFilter === sev
                        ? 'rgba(99, 102, 241, 0.2)'
                        : 'rgba(255, 255, 255, 0.03)',
                    borderColor:
                      severityFilter === sev
                        ? 'rgba(99, 102, 241, 0.4)'
                        : 'var(--border-subtle)',
                    color:
                      severityFilter === sev
                        ? 'var(--primary-light)'
                        : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '14px',
            }}
          >
            {filteredSkillGaps.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem',
                }}
              >
                No skill gaps found for this severity filter.
              </div>
            ) : (
              filteredSkillGaps.map((item, idx) => (
                <SkillGapCard key={idx} skillGap={item} />
              ))
            )}
          </div>
        </section>
      )}

      {/* SECTION 2: Technical Questions */}
      {(activeTab === 'all' || activeTab === 'tech') && (
        <section style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={16} />
              </div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Technical Interview Questions to Practice
              </h3>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              Curated architectural, coding, and system design problems targeted at your skill gaps
            </p>
          </div>

          <div>
            {technicalQuestions.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                No technical questions available.
              </div>
            ) : (
              technicalQuestions.map((item, idx) => (
                <QuestionCard
                  key={idx}
                  item={item}
                  index={idx}
                  type="technical"
                />
              ))
            )}
          </div>
        </section>
      )}

      {/* SECTION 3: Behavioral Questions */}
      {(activeTab === 'all' || activeTab === 'behavioral') && (
        <section style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(236, 72, 153, 0.15)',
                  color: '#f472b6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageSquare size={16} />
              </div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Behavioral & Leadership Scenarios
              </h3>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}
            >
              STAR structured frameworks designed to convey ownership, impact, and cultural synergy
            </p>
          </div>

          <div>
            {behavioralQuestions.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                No behavioral questions available.
              </div>
            ) : (
              behavioralQuestions.map((item, idx) => (
                <QuestionCard
                  key={idx}
                  item={item}
                  index={idx}
                  type="behavioral"
                />
              ))
            )}
          </div>
        </section>
      )}

      {/* SECTION 4: Day-Wise Preparation Roadmap */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Calendar size={16} />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  Day-Wise Study & Practice Roadmap
                </h3>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                Track your structured day-by-day learning milestones and mark actionable tasks completed
              </p>
            </div>

            {/* Overall Roadmap Progress Tracker */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Roadmap Readiness
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#34d399',
                  }}
                >
                  {roadmapProgressPercent}% Complete
                </div>
              </div>
              <div
                style={{
                  width: '90px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${roadmapProgressPercent}%`,
                    height: '100%',
                    background:
                      'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="roadmap-timeline">
            {preparationPlan.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                No preparation plan available.
              </div>
            ) : (
              preparationPlan.map((planItem, idx) => (
                <RoadmapDayCard
                  key={planItem.day || idx}
                  planItem={planItem}
                  onTaskToggle={handleTaskToggle}
                />
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ReportView;
