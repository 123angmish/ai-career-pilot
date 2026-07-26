export interface CoverLetterRequest {
  resumeId: string;
  jobTitle: string;
  companyName: string;
  tone: 'PROFESSIONAL' | 'ENTHUSIASTIC' | 'CREATIVE' | 'MINIMAL';
  jobDescription?: string;
}

export interface CoverLetterResponse {
  id: string;
  resumeId: string;
  content: string;
  jobTitle: string;
  companyName: string;
  generatedAt: string;
}

export interface InterviewQuestionRequest {
  resumeId: string;
  jobDescription?: string;
  questionCount?: number;
}

export interface InterviewQuestionDto {
  id: string;
  questionText: string;
  category: 'TECHNICAL' | 'BEHAVIORAL' | 'SITUATIONAL' | 'GENERAL';
  expectedFocusPoints: string[];
  hint: string;
}

export interface AnswerSubmitRequest {
  questionId: string;
  answerText: string;
  audioDurationSeconds?: number;
}

export interface AnswerFeedbackDto {
  questionId: string;
  score: number; // 0-100
  feedback: string;
  suggestedImprovement: string;
  modelAnswer: string;
}

export interface MockInterviewSessionDto {
  id: string;
  resumeId: string;
  jobDescription?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  questions: InterviewQuestionDto[];
  feedbacks: AnswerFeedbackDto[];
  overallScore?: number;
  createdAt: string;
}

export interface ChatMessageDto {
  id: string;
  sender: 'USER' | 'AI';
  content: string;
  timestamp: string;
}

export interface CareerChatSessionDto {
  id: string;
  title: string;
  messages: ChatMessageDto[];
  createdAt: string;
}
