import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  Sparkles,
  PlusCircle,
  FileText,
  LogOut,
  ChevronRight,
  Search,
  CheckCircle,
  History,
  Briefcase,
  X,
  Menu,
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reports, currentReport, clearCurrentReport, loadingReports } = useInterview();
  const { user, handleLogout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((r) =>
    (r.jobDescription || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPlan = () => {
    clearCurrentReport();
    navigate('/');
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handleSelectReport = (reportId) => {
    navigate(`/interview/${reportId}`);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const getScoreColorClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-med';
    return 'score-low';
  };

  return (
    <aside
      className="sidebar"
      style={{
        transform: isMobileOpen ? 'translateX(0)' : undefined,
      }}
    >
      {/* Brand Header */}
      <div className="sidebar-header">
        <div
          className="brand-badge"
          style={{ cursor: 'pointer' }}
          onClick={handleNewPlan}
        >
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="brand-title">InterviewPilot</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="brand-tag">AI Prep</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Platform</span>
            </div>
          </div>
        </div>

        {setIsMobileOpen && (
          <button
            className="btn-icon"
            style={{ display: 'md-none' }}
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* New Analysis Action */}
      <div className="sidebar-action-wrap">
        <button className="btn-new-prep" onClick={handleNewPlan}>
          <PlusCircle size={18} />
          <span>New Preparation</span>
        </button>
      </div>

      {/* Search History */}
      <div style={{ padding: '0 20px 10px' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{
              padding: '8px 12px 8px 34px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
            }}
            placeholder="Search past roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* History Section Title */}
      <div className="sidebar-section-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <History size={14} />
          <span>Previous Reports ({reports.length})</span>
        </div>
        {loadingReports && (
          <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)' }}>
            Updating...
          </span>
        )}
      </div>

      {/* History List */}
      <div className="sidebar-list">
        {filteredReports.length === 0 ? (
          <div
            style={{
              padding: '24px 16px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
            }}
          >
            <Briefcase
              size={28}
              style={{ margin: '0 auto 8px', opacity: 0.4, display: 'block' }}
            />
            {searchTerm ? 'No matching reports found.' : 'No interview reports yet. Generate your first one above!'}
          </div>
        ) : (
          filteredReports.map((report) => {
            const isActive =
              currentReport?._id === report._id ||
              location.pathname === `/interview/${report._id}`;

            return (
              <button
                key={report._id}
                className={`history-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectReport(report._id)}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive
                      ? 'rgba(99, 102, 241, 0.25)'
                      : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: isActive ? 'var(--primary-light)' : 'var(--text-muted)',
                  }}
                >
                  <FileText size={16} />
                </div>

                <div className="history-item-content">
                  <div className="history-item-title">
                    {report.jobDescription || 'Technical Role'}
                  </div>
                  <div className="history-item-meta">
                    {report.matchScore !== undefined && (
                      <span
                        className={`score-badge ${getScoreColorClass(
                          report.matchScore
                        )}`}
                      >
                        {report.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  style={{
                    color: isActive ? 'var(--primary-light)' : 'var(--text-dim)',
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })
        )}
      </div>

      {/* Footer Profile & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {(user?.username || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <div className="user-name">
              {user?.username || 'Interview Candidate'}
            </div>
            <div className="user-email">{user?.email || 'candidate@prep.ai'}</div>
          </div>
        </div>

        <button
          className="btn-icon"
          onClick={handleLogout}
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
