import axios from 'axios';
import { BASE_URL } from '../../../../config';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const generateInterviewReport = async ({ jobDescription, resumeFile, selfDescription }) => {
  try {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    if (selfDescription) {
      formData.append('selfDescription', selfDescription);
    }

    const response = await api.post('/api/interview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to generate interview report';
    throw new Error(message);
  }
};

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (err) {
    // Fallback attempt in case backend uses /result/:id
    try {
      const fallbackRes = await api.get(`/api/interview/result/${interviewId}`);
      return fallbackRes.data;
    } catch {
      const message = err.response?.data?.message || err.message || 'Failed to fetch interview report';
      throw new Error(message);
    }
  }
};

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get('/api/interview');
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Failed to fetch interview history';
    throw new Error(message);
  }
};

export default api;