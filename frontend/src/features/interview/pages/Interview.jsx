import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../../auth/hooks/useAuth';
import Sidebar from '../components/Sidebar';
import ReportView from '../components/ReportView';
import { Sparkles, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const {
    currentReport,
    fetchReportById,
    loadingReport,
    fetchReports,
  } = useInterview();

  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setFetchError(null);
      try {
        await fetchReportById(interviewId);
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message || 'Could not load interview report.');
        }
      }
    };

    if (interviewId) {
      load();
    }

    return () => {
      isMounted = false;
    };
  }, [interviewId, fetchReportById]);

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
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={14} />
              <span>Back to New Analysis</span>
            </button>

            <div>
              <div
                style={{
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Interview Report
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ID: {interviewId}
              </div>
            </div>
          </div>

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
            <span>InterviewPilot Analysis</span>
          </div>
        </header>

        {/* Viewport Area */}
        <div className="viewport-area">
          {loadingReport ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                gap: '16px',
              }}
            >
              <div
                className="pulse-glow"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <RefreshCw size={26} className="animate-spin" />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Fetching interview report...
              </div>
            </div>
          ) : fetchError ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <AlertCircle size={36} style={{ color: '#fb7185', margin: '0 auto 12px' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                Unable to load interview report
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                {fetchError}
              </p>
              <button className="btn-primary" onClick={() => navigate('/')}>
                Return to Dashboard
              </button>
            </div>
          ) : currentReport ? (
            <ReportView report={currentReport} />
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                No Report Selected
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Please select a report from the sidebar or start a new analysis.
              </p>
              <button className="btn-primary" onClick={() => navigate('/')}>
                Create Preparation Plan
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Interview;
