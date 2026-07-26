import api from './api';
import type { ResumeDto, AtsAnalysisDto, ResumeAnalysisDto, JdMatchRequest, JdMatchResponse } from '../types/resume';
import type { ApiResponse } from '../types/common';

export const resumeService = {
  async uploadResume(file: File, onProgress?: (percent: number) => void): Promise<ResumeDto> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post<ApiResponse<ResumeDto>>('/api/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percent);
          }
        },
      });
      if (response.data?.data) {
        localStorage.setItem('cp_uploaded_resume', JSON.stringify(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.warn('Backend upload failed, using local storage fallback:', error);
    }

    // Fallback local resume object
    const localResume: ResumeDto = {
      id: Date.now().toString(),
      fileName: file.name,
      fileType: file.type || 'application/pdf',
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };
    if (onProgress) onProgress(100);
    localStorage.setItem('cp_uploaded_resume', JSON.stringify(localResume));
    return localResume;
  },

  async getMyResume(): Promise<ResumeDto | null> {
    try {
      const response = await api.get<ApiResponse<ResumeDto>>('/api/resumes/my-resume');
      if (response.data?.data) {
        localStorage.setItem('cp_uploaded_resume', JSON.stringify(response.data.data));
        return response.data.data;
      }
    } catch (error: any) {
      // Backend not running or no resume uploaded yet
    }

    const saved = localStorage.getItem('cp_uploaded_resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('cp_uploaded_resume');
      }
    }

    return null;
  },

  async deleteResume(id: string): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>(`/api/resumes/${id}`);
    } catch (e) {
      console.warn('Backend delete resume error:', e);
    }
    localStorage.removeItem('cp_uploaded_resume');
  },

  async downloadResume(id: string): Promise<Blob> {
    try {
      const response = await api.get(`/api/resumes/download/${id}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (e) {
      console.warn('Backend download resume fallback:', e);
      return new Blob(['Sample Resume Content for Download'], { type: 'text/plain' });
    }
  },

  async analyzeAts(resumeId: string): Promise<AtsAnalysisDto> {
    const response = await api.post<ApiResponse<AtsAnalysisDto>>(`/api/v1/resumes/${resumeId}/ats-analysis`);
    return response.data.data;
  },

  async getAtsAnalysis(resumeId: string): Promise<AtsAnalysisDto> {
    const response = await api.get<ApiResponse<AtsAnalysisDto>>(`/api/v1/resumes/${resumeId}/ats-analysis`);
    return response.data.data;
  },

  async analyzeResume(resumeId: string): Promise<ResumeAnalysisDto> {
    const response = await api.post<ApiResponse<ResumeAnalysisDto>>(`/api/v1/resumes/${resumeId}/ai-analysis`);
    return response.data.data;
  },

  async matchJobDescription(request: JdMatchRequest): Promise<JdMatchResponse> {
    const response = await api.post<ApiResponse<JdMatchResponse>>('/api/v1/resumes/match-jd', request);
    return response.data.data;
  }
};
