import api from './api';
import type { ApiResponse } from '../types/common';

export interface SeniorEngineerData {
  id?: number | string;
  name: string;
  role: string;
  company: string;
  experienceYears: number;
  expertise: string | string[];
  rating?: number;
  reviewsCount?: number;
  feeINR: number;
  feeUSD?: number;
  avatarBg?: string;
  availableSlots?: string | string[];
  email?: string;
}

export interface MockBookingData {
  id?: number | string;
  bookingId?: string;
  engineerId?: number | string;
  engineerName: string;
  engineerEmail?: string;
  candidateEmail?: string;
  timeSlot: string;
  interviewType: string;
  feePaid: number;
  meetingLink?: string;
  status?: string;
  createdAt?: string;
}

export interface ChatMessageData {
  id?: number | string;
  bookingId: string;
  senderEmail?: string;
  senderName: string;
  messageText: string;
  createdAt?: string;
}

export const engineerService = {
  async getSeniorEngineers(): Promise<SeniorEngineerData[]> {
    try {
      const response = await api.get<ApiResponse<SeniorEngineerData[]>>('/api/engineers');
      if (response.data?.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend senior engineer API offline, using persistent database cache.', e);
    }

    const cached = localStorage.getItem('cp_senior_engineers');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.warn('Cache parse error:', err);
      }
    }

    return [
      {
        id: 1,
        name: 'Siddharth Sharma',
        role: 'Staff Software Engineer',
        company: 'Google',
        experienceYears: 9,
        expertise: ['System Design', 'Java Spring Boot', 'Microservices', 'Distributed Systems'],
        rating: 4.9,
        reviewsCount: 128,
        feeINR: 1499,
        feeUSD: 35,
        avatarBg: 'from-blue-600 to-indigo-600',
        availableSlots: ['Today 6:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 4:00 PM', 'Sunday 11:00 AM'],
        email: 'siddharth@google.dev',
      },
      {
        id: 2,
        name: 'Ananya Roy',
        role: 'Lead Frontend Architect',
        company: 'Microsoft',
        experienceYears: 8,
        expertise: ['React & TypeScript', 'Web Vitals & Performance', 'UI Architecture', 'Next.js'],
        rating: 4.95,
        reviewsCount: 94,
        feeINR: 1299,
        feeUSD: 29,
        avatarBg: 'from-purple-600 to-pink-600',
        availableSlots: ['Today 8:00 PM', 'Tomorrow 2:00 PM', 'Saturday 5:00 PM'],
        email: 'ananya@microsoft.dev',
      },
      {
        id: 3,
        name: 'Rohan Mehta',
        role: 'Principal Data Scientist',
        company: 'Amazon',
        experienceYears: 10,
        expertise: ['Data Analytics', 'SQL & Snowflake', 'Machine Learning', 'A/B Testing'],
        rating: 4.88,
        reviewsCount: 156,
        feeINR: 1699,
        feeUSD: 39,
        avatarBg: 'from-emerald-600 to-teal-600',
        availableSlots: ['Tomorrow 11:00 AM', 'Tomorrow 7:00 PM', 'Sunday 3:00 PM'],
        email: 'rohan@amazon.dev',
      },
      {
        id: 4,
        name: 'Priya Verma',
        role: 'Engineering Manager',
        company: 'Meta',
        experienceYears: 11,
        expertise: ['Executive HR Interview', 'System Scaling', 'Leadership & Behavioral', 'Resume Review'],
        rating: 5.0,
        reviewsCount: 210,
        feeINR: 1999,
        feeUSD: 49,
        avatarBg: 'from-amber-500 to-orange-600',
        availableSlots: ['Today 9:00 PM', 'Saturday 10:00 AM', 'Sunday 6:00 PM'],
        email: 'priya@meta.dev',
      },
    ];
  },

  async registerEngineer(data: SeniorEngineerData): Promise<SeniorEngineerData> {
    try {
      const response = await api.post<ApiResponse<SeniorEngineerData>>('/api/engineers', data);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend register engineer API fallback to local cache.', e);
    }

    const currentList = await this.getSeniorEngineers();
    const newEng = { ...data, id: Date.now() };
    const updated = [newEng, ...currentList];
    localStorage.setItem('cp_senior_engineers', JSON.stringify(updated));
    return newEng;
  },

  async createBooking(booking: MockBookingData): Promise<MockBookingData> {
    try {
      const response = await api.post<ApiResponse<MockBookingData>>('/api/mock-bookings', booking);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend create booking API fallback to local cache.', e);
    }

    const newBooking: MockBookingData = {
      ...booking,
      id: Date.now(),
      bookingId: `CP-MOCK-${Math.floor(100000 + Math.random() * 900000)}`,
      meetingLink: `https://meet.google.com/new`,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    const cachedBookings = JSON.parse(localStorage.getItem('cp_my_mock_bookings') || '[]');
    cachedBookings.unshift(newBooking);
    localStorage.setItem('cp_my_mock_bookings', JSON.stringify(cachedBookings));
    return newBooking;
  },

  async getMyBookings(): Promise<MockBookingData[]> {
    try {
      const response = await api.get<ApiResponse<MockBookingData[]>>('/api/mock-bookings/my-bookings');
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend get my bookings API fallback to local cache.', e);
    }

    return JSON.parse(localStorage.getItem('cp_my_mock_bookings') || '[]');
  },

  async getChatMessages(bookingId: string): Promise<ChatMessageData[]> {
    try {
      const response = await api.get<ApiResponse<ChatMessageData[]>>(`/api/mock-chat/${bookingId}`);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend chat API offline, using local storage cache for chat history.', e);
    }

    const cached = JSON.parse(localStorage.getItem(`cp_chat_${bookingId}`) || '[]');
    if (cached.length === 0) {
      // Default welcome message from senior engineer
      const welcomeMsg: ChatMessageData = {
        id: 'w1',
        bookingId,
        senderName: 'Interviewer Assistant',
        messageText: 'Hello candidate! I am looking forward to our 1-on-1 mock interview session. Feel free to share your resume highlights or specific topics you want to practice!',
        createdAt: new Date().toISOString(),
      };
      return [welcomeMsg];
    }
    return cached;
  },

  async sendChatMessage(msg: ChatMessageData): Promise<ChatMessageData> {
    try {
      const response = await api.post<ApiResponse<ChatMessageData>>('/api/mock-chat', msg);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (e) {
      console.warn('Backend send chat API fallback to local cache.', e);
    }

    const newMsg: ChatMessageData = {
      ...msg,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    const cached = JSON.parse(localStorage.getItem(`cp_chat_${msg.bookingId}`) || '[]');
    cached.push(newMsg);
    localStorage.setItem(`cp_chat_${msg.bookingId}`, JSON.stringify(cached));
    return newMsg;
  },
};
