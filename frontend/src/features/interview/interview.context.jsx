import React, { createContext, useState, useCallback } from 'react';
import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
} from './services/interview.api';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    setLoadingReports(true);
    setError(null);
    try {
      const data = await getAllInterviewReports();
      console.log('[InterviewPilot] GET /api/interview response:', data);
      if (data && Array.isArray(data.reports)) {
        setReports(data.reports);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error('Error fetching interview reports:', err.message);
      setError(err.message || 'Failed to load previous interview reports');
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  }, []);

  const fetchReportById = useCallback(async (interviewId) => {
    if (!interviewId) return null;
    setLoadingReport(true);
    setError(null);
    try {
      const data = await getInterviewReportById(interviewId);
      if (data && data.interviewReport) {
        setCurrentReport(data.interviewReport);
        return data.interviewReport;
      } else if (data && data.message) {
        throw new Error(data.message);
      }
      throw new Error('Interview report could not be loaded.');
    } catch (err) {
      console.error('Error fetching interview report:', err.message);
      setError(err.message);
      setCurrentReport(null);
      throw err;
    } finally {
      setLoadingReport(false);
    }
  }, []);

  const createReport = async ({ resumeFile, jobDescription, selfDescription }) => {
    setIsGenerating(true);
    setGenerationStep(1);
    setError(null);

    // Dynamic step progression animation while backend is generating
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 2500);

    try {
      const response = await generateInterviewReport({
        resumeFile,
        jobDescription,
        selfDescription,
      });

      clearInterval(stepInterval);
      setGenerationStep(5);

      if (response && response.interviewReport) {
        const newReport = response.interviewReport;
        setCurrentReport(newReport);
        // Prepend to reports history list
        setReports((prev) => [
          {
            _id: newReport._id,
            jobDescription: newReport.jobDescription.slice(0, 30) + '...',
            matchScore: newReport.matchScore,
          },
          ...prev.filter((r) => r._id !== newReport._id),
        ]);
        return newReport;
      }
      throw new Error(response?.message || 'Failed to generate interview report.');
    } catch (err) {
      clearInterval(stepInterval);
      setError(err.message || 'Generation failed.');
      throw err;
    } finally {
      setIsGenerating(false);
      setGenerationStep(1);
    }
  };

  const clearCurrentReport = () => {
    setCurrentReport(null);
  };

  return (
    <InterviewContext.Provider
      value={{
        reports,
        setReports,
        currentReport,
        setCurrentReport,
        loadingReports,
        loadingReport,
        isGenerating,
        generationStep,
        error,
        setError,
        fetchReports,
        fetchReportById,
        createReport,
        clearCurrentReport,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};