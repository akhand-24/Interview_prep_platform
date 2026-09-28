import React, { useState, useRef } from 'react';
import { useInterview } from '../hooks/useInterview';
import {
  UploadCloud,
  FileText,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Cpu,
  Brain,
  Layers,
  CalendarCheck,
} from 'lucide-react';


const GeneratorForm = ({ onGenerated }) => {
  const { createReport, isGenerating, generationStep } = useInterview();

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setResumeFile(file);
        setFormError('');
      } else {
        setFormError('Please upload a PDF format resume file.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setResumeFile(file);
        setFormError('');
      } else {
        setFormError('Please upload a PDF format resume file.');
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!resumeFile) {
      setFormError('Please upload your resume in PDF format.');
      return;
    }

    if (!jobDescription.trim()) {
      setFormError('Please enter the target Job Description.');
      return;
    }

    try {
      const report = await createReport({
        resumeFile,
        jobDescription,
        selfDescription: selfDescription || 'Experienced technical candidate.',
      });

      if (onGenerated && report) {
        onGenerated(report);
      }
    } catch (err) {
      setFormError(err.message || 'Generation failed. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const STEPS = [
    { num: 1, label: 'Reading & Parsing PDF Resume', icon: <FileText size={18} /> },
    { num: 2, label: 'Extracting Core Competencies & Skills', icon: <Cpu size={18} /> },
    { num: 3, label: 'Analyzing Job Specs & Computing Match Score', icon: <Brain size={18} /> },
    { num: 4, label: 'Formulating Targeted Tech & Behavioral Qs', icon: <Layers size={18} /> },
    { num: 5, label: 'Synthesizing Day-by-Day Preparation Plan', icon: <CalendarCheck size={18} /> },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* AI Processing Overlay */}
      {isGenerating && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 9, 18, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '36px 32px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'white',
              }}
              className="pulse-glow"
            >
              <Sparkles size={32} />
            </div>

            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              Generating Interview Intelligence
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '28px',
              }}
            >
              Our AI is matching your resume against the target role requirements...
            </p>

            {/* Pipeline Step List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {STEPS.map((st) => {
                const isCurrent = generationStep === st.num;
                const isPast = generationStep > st.num;

                return (
                  <div
                    key={st.num}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isCurrent
                        ? 'rgba(99, 102, 241, 0.15)'
                        : isPast
                        ? 'rgba(16, 185, 129, 0.08)'
                        : 'rgba(255, 255, 255, 0.02)',
                      border: isCurrent
                        ? '1px solid rgba(99, 102, 241, 0.4)'
                        : isPast
                        ? '1px solid rgba(16, 185, 129, 0.25)'
                        : '1px solid var(--border-subtle)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isPast
                          ? '#10b981'
                          : isCurrent
                          ? 'var(--primary)'
                          : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isPast ? <CheckCircle2 size={16} /> : st.num}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent
                            ? 'var(--text-primary)'
                            : isPast
                            ? '#34d399'
                            : 'var(--text-muted)',
                        }}
                      >
                        {st.label}
                      </div>
                    </div>

                    {isCurrent && (
                      <div
                        className="animate-spin"
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(99, 102, 241, 0.3)',
                          borderTopColor: 'var(--primary-light)',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Generator Card */}
      <div className="glass-panel" style={{ padding: '36px 40px' }}>
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'var(--primary-light)',
              fontSize: '0.78rem',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            <Sparkles size={14} />
            <span>InterviewPilot AI Engine</span>
          </div>

          <h1
            style={{
              fontSize: '1.9rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.25,
            }}
          >
            Elevate Your Interview Performance
          </h1>
          <p
            style={{
              fontSize: '0.94rem',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              maxWidth: '720px',
            }}
          >
            Upload your resume and paste the target job description to compute your match score, pinpoint critical skill gaps, practice tailored questions, and receive a customized day-wise study roadmap.
          </p>
        </div>

        {formError && (
          <div className="alert-box alert-error">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Resume PDF Dropzone */}
          <div className="form-group">
            <label className="form-label">
              <span>Candidate Resume (PDF)</span>
              <span className="form-label-hint">PDF format only • Max 10MB</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              style={{ display: 'none' }}
            />

            {!resumeFile ? (
              <div
                className={`dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="dropzone-icon">
                  <UploadCloud size={26} />
                </div>
                <div className="dropzone-title">Click to upload or drag & drop resume</div>
                <div className="dropzone-subtitle">Supported format: PDF</div>
              </div>
            ) : (
              <div className="file-pill">
                <div className="file-pill-left">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(99, 102, 241, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-light)',
                    }}
                  >
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <div className="file-name">{resumeFile.name}</div>
                    <div className="file-size">{formatFileSize(resumeFile.size)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setResumeFile(null)}
                  title="Remove resume"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Job Description Textarea */}
          <div className="form-group">
            <label className="form-label" htmlFor="job-description-input">
              <span>Target Job Description</span>
              <span className="form-label-hint">{jobDescription.length} characters</span>
            </label>

            <textarea
              id="job-description-input"
              className="form-textarea"
              style={{ minHeight: '130px' }}
              placeholder="Paste the full job description, role requirements, core technologies, and expectations here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>

          {/* Self Description Textarea */}
          <div className="form-group">
            <label className="form-label" htmlFor="self-description-input">
              <span>Candidate Self-Description & Focus Areas</span>
              <span className="form-label-hint">Optional context / pitch</span>
            </label>

            <textarea
              id="self-description-input"
              className="form-textarea"
              style={{ minHeight: '90px' }}
              placeholder="Describe your background, years of experience, key strengths, target compensation tier, or specific areas you want to emphasize..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ minWidth: '240px' }}
              disabled={isGenerating}
            >
              <Sparkles size={18} />
              <span>Generate Interview Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratorForm;
