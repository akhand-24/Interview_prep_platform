import React, { useEffect, useState } from 'react';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../../auth/hooks/useAuth';
import Sidebar from '../components/Sidebar';
import GeneratorForm from '../components/GeneratorForm';
import ReportView from '../components/ReportView';
import { Menu, Sparkles } from 'lucide-react';

const Home = () => {
  const {
    currentReport,
    setCurrentReport,
    fetchReports,
    loadingReports,
  } = useInterview();

  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar with previous reports */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main View Area */}
      <main className="main-content">
        {/* Top Navbar */}
        <header
          style={{
            height: '68px',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(9, 14, 26, 0.6)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="btn-icon"
              style={{ display: 'none' }} // can be activated on mobile
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle Navigation"
            >
              <Menu size={18} />
            </button>

            <div>
              <div
                style={{
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Welcome back, {user?.username || 'Candidate'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {currentReport
                  ? 'Viewing generated interview analysis'
                  : 'Start a new interview preparation session'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: 'var(--primary-light)',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} />
              <span>InterviewPilot AI Engine</span>
            </div>
          </div>
        </header>

        {/* Viewport Area */}
        <div className="viewport-area">
          {currentReport ? (
            <ReportView report={currentReport} />
          ) : (
            <GeneratorForm
              onGenerated={(newReport) => {
                setCurrentReport(newReport);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
