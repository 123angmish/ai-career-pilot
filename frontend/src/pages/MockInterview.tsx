import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Star, Users, Calendar, Clock, ShieldCheck, Briefcase, ExternalLink, UserPlus, Check, X, CreditCard, RefreshCw, Loader2, MessageSquare, Mail, Send
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { engineerService, type SeniorEngineerData, type MockBookingData, type ChatMessageData } from '../services/engineer.service';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4 }
  },
};

export const MockInterview: React.FC = () => {
  const [engineers, setEngineers] = useState<SeniorEngineerData[]>([]);
  const [myBookings, setMyBookings] = useState<MockBookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Modal State
  const [selectedEngineer, setSelectedEngineer] = useState<SeniorEngineerData | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [interviewType, setInterviewType] = useState<string>('System Design & Distributed Architecture');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<MockBookingData | null>(null);

  // Senior Engineer Registration Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regExp, setRegExp] = useState(5);
  const [regSkills, setRegSkills] = useState('');
  const [regFeeINR, setRegFeeINR] = useState(1499);
  const [regSuccessMsg, setRegSuccessMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Live Chat Drawer / Modal State
  const [activeChatBooking, setActiveChatBooking] = useState<MockBookingData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([]);
  const [newMsgText, setNewMsgText] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [emailSentToast, setEmailSentToast] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [engList, bookings] = await Promise.all([
        engineerService.getSeniorEngineers(),
        engineerService.getMyBookings(),
      ]);
      setEngineers(engList);
      setMyBookings(bookings);
    } catch (e) {
      console.warn('Error loading mock interview records:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSession = async () => {
    if (!selectedEngineer || !selectedSlot) return;
    setIsBooking(true);
    try {
      const booking: MockBookingData = {
        engineerId: selectedEngineer.id,
        engineerName: selectedEngineer.name,
        engineerEmail: selectedEngineer.email || `${selectedEngineer.name.toLowerCase().replace(/\s+/g, '')}@tech.dev`,
        timeSlot: selectedSlot,
        interviewType,
        feePaid: selectedEngineer.feeINR,
        meetingLink: 'https://meet.google.com/new',
      };
      const created = await engineerService.createBooking(booking);
      setBookingSuccess(created);
      setMyBookings((prev) => [created, ...prev]);
      setSelectedEngineer(null);
    } catch (e) {
      alert('Failed to process session booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleRegisterSeniorEngineer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regRole.trim() || !regCompany.trim()) return;
    setIsRegistering(true);

    try {
      const newEngData: SeniorEngineerData = {
        name: regName.trim(),
        role: regRole.trim(),
        company: regCompany.trim(),
        experienceYears: Number(regExp) || 5,
        expertise: regSkills.split(',').map((s) => s.trim()).filter(Boolean),
        rating: 5.0,
        reviewsCount: 1,
        feeINR: Number(regFeeINR) || 1499,
        feeUSD: Math.round(Number(regFeeINR) / 40) || 35,
        avatarBg: 'from-purple-600 via-pink-600 to-rose-600',
        availableSlots: ['Tomorrow 5:00 PM', 'Sunday 10:00 AM', 'Sunday 3:00 PM'],
        email: `${regName.toLowerCase().replace(/\s+/g, '')}@careerpilot.dev`,
      };

      const saved = await engineerService.registerEngineer(newEngData);
      setEngineers((prev) => [saved, ...prev]);
      setRegSuccessMsg(`Successfully registered in database as a Senior Engineer Interviewer! Candidates can now book sessions with you.`);
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegSuccessMsg('');
        setRegName('');
        setRegRole('');
        setRegCompany('');
      }, 2000);
    } catch (e) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  // Open Chat Drawer & Fetch History from Database
  const handleOpenChat = async (booking: MockBookingData) => {
    setActiveChatBooking(booking);
    if (booking.bookingId) {
      const msgs = await engineerService.getChatMessages(booking.bookingId);
      setChatMessages(msgs);
    }
  };

  // Send Message in Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim() || !activeChatBooking?.bookingId) return;

    setIsSendingMsg(true);
    const userMsg: ChatMessageData = {
      bookingId: activeChatBooking.bookingId,
      senderName: 'You (Candidate)',
      messageText: newMsgText.trim(),
    };

    try {
      const saved = await engineerService.sendChatMessage(userMsg);
      setChatMessages((prev) => [...prev, saved]);
      setNewMsgText('');

      // Simulate live reply from Senior Engineer
      setTimeout(async () => {
        const replyText = `Thanks for your message regarding ${activeChatBooking.interviewType}! I have noted your preferences and look forward to meeting you at ${activeChatBooking.timeSlot} on Google Meet (${activeChatBooking.meetingLink || 'https://meet.google.com/new'}).`;
        const engReply: ChatMessageData = {
          bookingId: activeChatBooking.bookingId!,
          senderName: activeChatBooking.engineerName,
          messageText: replyText,
        };
        const savedReply = await engineerService.sendChatMessage(engReply);
        setChatMessages((prev) => [...prev, savedReply]);
      }, 1500);
    } catch (err) {
      console.warn('Error sending chat message:', err);
    } finally {
      setIsSendingMsg(false);
    }
  };

  // Send Formal Google Meet Email Invitation
  const handleSendEmailInvite = (b: MockBookingData) => {
    const engineerEmail = b.engineerEmail || `${b.engineerName.toLowerCase().replace(/\s+/g, '')}@tech.dev`;
    const candidateEmail = b.candidateEmail || 'candidate@careerpilot.dev';
    const meetLink = b.meetingLink || 'https://meet.google.com/new';

    const subject = encodeURIComponent(`Google Meet 1-on-1 Mock Interview Invitation: ${b.engineerName} & Candidate [${b.bookingId}]`);
    const body = encodeURIComponent(
      `Hello ${b.engineerName} and Candidate,\n\nYou are invited to a live 1-on-1 Senior Engineer Mock Interview session on CareerPilot.\n\n` +
      `📅 Scheduled Time: ${b.timeSlot}\n` +
      `🎯 Focus Area: ${b.interviewType}\n` +
      `📹 Google Meet Link: ${meetLink}\n` +
      `📌 Booking Reference ID: ${b.bookingId}\n\n` +
      `Candidate Email: ${candidateEmail}\n` +
      `Interviewer Email: ${engineerEmail}\n\n` +
      `Please join the Google Meet link 5 minutes prior to start time.\n\nBest regards,\nCareerPilot Engineering Team`
    );

    window.open(`mailto:${engineerEmail},${candidateEmail}?subject=${subject}&body=${body}`, '_blank');
    setEmailSentToast(`Email invitation generated for ${b.engineerName} & Candidate!`);
    setTimeout(() => setEmailSentToast(''), 4000);
  };

  const parseSlots = (slots: string | string[] | undefined): string[] => {
    if (!slots) return ['Tomorrow 5:00 PM', 'Sunday 10:00 AM'];
    if (Array.isArray(slots)) return slots;
    return slots.split(',').map((s) => s.trim());
  };

  const parseExpertise = (exp: string | string[] | undefined): string[] => {
    if (!exp) return ['System Design', 'Algorithms'];
    if (Array.isArray(exp)) return exp;
    return exp.split(',').map((s) => s.trim());
  };

  return (
    <div className="relative space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-16">
      {/* Toast Notification */}
      {emailSentToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-3">
          <Mail className="h-4 w-4" />
          {emailSentToast}
        </div>
      )}

      {/* Floating Ambient Background Glows */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/25">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  1-on-1 Senior Engineer Mock Platform
                </h1>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm font-medium">
            Book live 45-minute technical & behavioral mock sessions with Senior Engineers from Google, Microsoft, Amazon & Meta.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="primary"
            onClick={() => setShowRegisterModal(true)}
            className="shrink-0 py-3 px-5 text-xs font-black shadow-xl shadow-brand-600/30 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white rounded-2xl transition-all"
          >
            <UserPlus className="h-4 w-4 mr-2" /> Become an Interviewer (Earn Money)
          </Button>
        </motion.div>
      </motion.div>

      {/* Top Value Glassmorphic Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-indigo-950/80 to-zinc-900/90 backdrop-blur-xl text-white shadow-2xl border border-white/10 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-black tracking-wide">Database-Backed Verified Senior Engineers</h3>
          </div>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed font-medium">
            Includes 1-on-1 Live Google Meet video evaluation, direct 1-on-1 chat history, email invitations, and architectural code feedback stored in database.
          </p>
        </div>
      </motion.div>

      {/* Booking Confirmation Banner */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="p-6 rounded-3xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Check className="h-6 w-6 stroke-[3]" />
              </div>
              <div>
                <h4 className="font-black text-base">Mock Interview Session Booked in Database!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Booking ID: <span className="font-mono font-black">{bookingSuccess.bookingId}</span></p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-850 shadow-inner">
              <div>
                <span className="text-zinc-500 block font-semibold">Senior Interviewer</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{bookingSuccess.engineerName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block font-semibold">Scheduled Time Slot</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{bookingSuccess.timeSlot}</span>
              </div>
              <div>
                <span className="text-zinc-500 block font-semibold">Focus Area</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">{bookingSuccess.interviewType}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={bookingSuccess.meetingLink || 'https://meet.google.com/new'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-600/30"
              >
                <Video className="h-4 w-4" /> Join Google Meet Link <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => handleSendEmailInvite(bookingSuccess)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100"
              >
                <Mail className="h-3.5 w-3.5 text-brand-500" /> Send Email Invitation
              </button>
              <button
                onClick={() => setBookingSuccess(null)}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline ml-auto"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Booked Mock Sessions */}
      {myBookings.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-brand-200/80 dark:border-brand-900/60 shadow-xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-black">My Upcoming Booked Mock Sessions ({myBookings.length})</CardTitle>
                </div>
                <button onClick={loadData} className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline">
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {myBookings.map((b, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200/80 dark:border-zinc-750/80 hover:border-brand-400 transition-all">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">{b.engineerName}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                        {b.status || 'CONFIRMED'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-medium mt-1 flex items-center gap-3">
                      <span><Clock className="h-3 w-3 inline mr-1 text-brand-500" />{b.timeSlot}</span>
                      <span>• {b.interviewType}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleOpenChat(b)}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-extrabold text-xs hover:bg-purple-700 shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> Live Chat
                    </button>
                    <button
                      onClick={() => handleSendEmailInvite(b)}
                      className="px-3 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-300 flex items-center gap-1 transition-all"
                      title="Send Email Invitation with Google Meet link"
                    >
                      <Mail className="h-3.5 w-3.5" /> Invite
                    </button>
                    <a
                      href={b.meetingLink || 'https://meet.google.com/new'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                    >
                      <Video className="h-3.5 w-3.5" /> Google Meet <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Engineer Grid Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2.5 tracking-tight">
          <span>Available Senior Engineers ({engineers.length})</span>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Database
          </span>
        </h3>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 gap-3 text-xs font-bold text-brand-600 dark:text-brand-400">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          <span>Fetching live database records for Senior Engineers...</span>
        </div>
      ) : (
      /* Senior Engineer Cards Grid with Framer Motion Stagger */
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {engineers.map((eng) => {
          const slots = parseSlots(eng.availableSlots);
          const skills = parseExpertise(eng.expertise);

          return (
            <motion.div key={eng.id} variants={cardVariants} whileHover={{ y: -6 }}>
              <Card className="h-full hover:border-brand-500/60 dark:hover:border-brand-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${eng.avatarBg || 'from-brand-600 via-indigo-600 to-purple-600'} text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25 ring-4 ring-brand-500/10`}>
                      {eng.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-zinc-900 dark:text-zinc-50 text-base truncate tracking-tight">{eng.name}</h4>
                        <span className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                          <Star className="h-3 w-3 fill-current text-amber-400" /> {eng.rating || 5.0} ({eng.reviewsCount || 100})
                        </span>
                      </div>
                      <p className="text-xs font-bold text-brand-600 dark:text-brand-400 mt-1 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 shrink-0" /> {eng.role} @ <span className="font-black text-zinc-900 dark:text-zinc-100">{eng.company}</span>
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                        {eng.experienceYears}+ Years Industry Experience
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1.5">Core Expertise</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((exp, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-semibold border border-zinc-200/60 dark:border-zinc-700/60">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">Session Fee</span>
                      <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">
                        ₹{eng.feeINR.toLocaleString()} <span className="text-xs font-normal text-zinc-400">/ ${eng.feeUSD || Math.round(eng.feeINR/40)} (45 mins)</span>
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedEngineer(eng);
                        setSelectedSlot(slots[0] || 'Tomorrow 5:00 PM');
                      }}
                      className="py-2 px-4 text-xs font-black bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-600/20 rounded-xl transition-all"
                    >
                      <Calendar className="h-3.5 w-3.5 mr-1.5" /> Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
      )}

      {/* LIVE 1-ON-1 CHAT DRAWER / MODAL */}
      <AnimatePresence>
        {activeChatBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative flex flex-col h-[550px]"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black flex items-center justify-center shadow-md">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-sm flex items-center gap-1.5">
                      <span>Chat with {activeChatBooking.engineerName}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-semibold">{activeChatBooking.timeSlot} • {activeChatBooking.interviewType}</p>
                  </div>
                </div>
                <button onClick={() => setActiveChatBooking(null)} className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat History Box */}
              <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-zinc-50 dark:bg-zinc-850/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-750/80">
                {chatMessages.map((msg, idx) => {
                  const isUser = msg.senderName.includes('You') || msg.senderName.includes('Candidate');

                  return (
                    <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] font-bold text-zinc-400 mb-0.5 px-1">{msg.senderName}</span>
                      <div className={`p-3 rounded-2xl max-w-[85%] text-xs font-medium leading-relaxed ${
                        isUser 
                          ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-brand-600/20'
                          : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-none shadow-sm'
                      }`}>
                        {msg.messageText}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Type message to senior engineer..."
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  className="flex-1 p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <Button type="submit" variant="primary" isLoading={isSendingMsg} className="rounded-2xl px-4 bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {selectedEngineer && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${selectedEngineer.avatarBg || 'from-brand-600 to-indigo-600'} text-white font-black text-lg flex items-center justify-center shadow-md`}>
                    {selectedEngineer.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-base">Book Session with {selectedEngineer.name}</h3>
                    <p className="text-xs text-zinc-500 font-semibold">{selectedEngineer.role} @ {selectedEngineer.company}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEngineer(null)} className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Select Available Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {parseSlots(selectedEngineer.availableSlots).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                          selectedSlot === slot
                            ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-600 shadow-md shadow-brand-600/30'
                            : 'bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5 inline mr-1.5" /> {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Select Mock Focus Area
                  </label>
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-extrabold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>System Design & Distributed Architecture</option>
                    <option>Data Structures, Algorithms & Coding</option>
                    <option>Data Analytics, SQL & ETL Pipelines</option>
                    <option>Behavioral, Leadership & Executive HR</option>
                    <option>Resume Code Review & Portfolio Audit</option>
                  </select>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-850/80 rounded-2xl border border-zinc-200 dark:border-zinc-750 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                    <span>Interviewer Hourly Rate</span>
                    <span>₹{selectedEngineer.feeINR.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                    <span>Platform Verification Fee</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-zinc-50 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <span>Total Payable Amount</span>
                    <span className="text-brand-600 dark:text-brand-400">₹{selectedEngineer.feeINR.toLocaleString()} / ${selectedEngineer.feeUSD || Math.round(selectedEngineer.feeINR/40)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="w-1/2 rounded-2xl py-3 text-xs font-bold" onClick={() => setSelectedEngineer(null)}>
                  Cancel
                </Button>
                <Button variant="primary" className="w-1/2 rounded-2xl py-3 text-xs font-black bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-600/30" isLoading={isBooking} onClick={handleBookSession}>
                  <CreditCard className="h-4 w-4 mr-1.5" /> Pay & Save Booking
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REGISTER SENIOR ENGINEER MODAL */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-base">Register as a Senior Interviewer (Database)</h3>
                </div>
                <button onClick={() => setShowRegisterModal(false)} className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {regSuccessMsg ? (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs font-black text-center border border-emerald-300 dark:border-emerald-800">
                  {regSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleRegisterSeniorEngineer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Full Name *</label>
                    <input type="text" required placeholder="e.g. Vikram Sharma" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Current Job Title *</label>
                      <input type="text" required placeholder="e.g. Staff Engineer" value={regRole} onChange={(e) => setRegRole(e.target.value)} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Company *</label>
                      <input type="text" required placeholder="e.g. Google, Uber" value={regCompany} onChange={(e) => setRegCompany(e.target.value)} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Years of Experience</label>
                      <input type="number" min={3} max={30} value={regExp} onChange={(e) => setRegExp(Number(e.target.value))} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Your Fee per Session (₹)</label>
                      <input type="number" step={100} min={500} value={regFeeINR} onChange={(e) => setRegFeeINR(Number(e.target.value))} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">Expertise Topics (Comma Separated)</label>
                    <input type="text" placeholder="e.g. Java, System Design, SQL, React" value={regSkills} onChange={(e) => setRegSkills(e.target.value)} className="w-full p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" className="w-1/2 rounded-2xl py-3 text-xs font-bold" onClick={() => setShowRegisterModal(false)}>Cancel</Button>
                    <Button type="submit" variant="primary" className="w-1/2 rounded-2xl py-3 text-xs font-black bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/30" isLoading={isRegistering}>Save to Database</Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MockInterview;
