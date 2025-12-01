"use client";

import React, { useState, useEffect } from "react";
import { User, users } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Search, Bell, Monitor, Command, Menu, X, Plus, Clock, Calendar, Edit2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScheduleModal } from "./ScheduleModal";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 하이드레이션 에러 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setResponse(
        `🤖 Insight: "${query}" 확인.\n김서원님은 현재 '집중 모드'이며 오후 4시 이후 리뷰 가능합니다.`
      );
      setQuery("");
      setTimeout(() => setResponse(null), 6000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
      case "busy": return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]";
      case "meeting": return "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]";
      default: return "bg-slate-500";
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full font-sans bg-white text-slate-800 overflow-hidden selection:bg-indigo-500/30">
      
      {/* 🌌 배경 앰비언트 라이트 (은은한 효과) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px]" />
      </div>

      {/* 🟦 SIDEBAR (Left) */}
      <aside className="w-[280px] flex-shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-xl flex flex-col z-20 shadow-sm">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">TeamFlow</span>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
            Team Members
          </div>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                className={`group flex items-center p-2.5 rounded-xl hover:bg-gray-50 border transition-all cursor-pointer ${selectedUser?.id === user.id ? 'border-indigo-200 bg-indigo-50' : 'border-transparent hover:border-gray-100'}`}
              >
                <div className="relative mr-3">
                  <Avatar className="h-9 w-9 border border-gray-200 group-hover:border-indigo-500/50 transition-colors">
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${selectedUser?.id === user.id ? 'text-indigo-600' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>
                    {user.name}
                  </div>
                  <div className="text-[11px] text-gray-500 group-hover:text-gray-700 truncate">
                    {user.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-indigo-600 text-white text-xs">Me</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Guest User</div>
              <div className="text-[10px] text-gray-500">View Profile</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 🟣 MAIN CONTENT (Right) */}
      <main className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 z-10">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Schedule Board</h1>
            <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"/>
              Live Updates • 2025. 06. 09
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1" />
            <button className="px-4 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              + New Task
            </button>
          </div>
        </header>

        {/* Schedule Panel - Slides up from bottom */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedUser(null)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-in-out" 
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{selectedUser.name}</h2>
                      <p className="text-xs text-gray-500">{selectedUser.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedUser.schedules.length > 0 ? (
                    selectedUser.schedules.map((schedule) => {
                      // Check if it's a TimelineItem (has duration) or Schedule (has end time)
                      const isTimelineItem = 'duration' in schedule;
                      const endTime = isTimelineItem 
                        ? `${(schedule as any).start + (schedule as any).duration}시`
                        : (schedule as any).end;
                      
                      return (
                        <div key={schedule.id} className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl p-4 gap-2 hover:border-indigo-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-indigo-500"></span>
                              <span className="font-bold text-gray-800 text-sm">{schedule.title}</span>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-indigo-600">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-rose-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 ml-4 bg-white w-fit px-2 py-1 rounded border border-gray-100">
                            <Clock className="w-3 h-3 mr-1" />
                            {isTimelineItem ? `${(schedule as any).start}시 ~ ${endTime}` : `${schedule.start} ~ ${endTime}`}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>등록된 일정이 없습니다.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="새 일정 추가"
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Timeline Area */}
        <div className="flex-1 overflow-hidden flex flex-col p-6">
          <div className="bg-white border border-gray-200 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm relative">
            
            {/* Time Header */}
            <div className="h-12 border-b border-gray-200 flex items-center bg-gray-50">
               <div className="w-32 flex-shrink-0 border-r border-gray-200 h-full flex items-center justify-center text-xs font-bold text-gray-500">
                  MEMBER
               </div>
               <div className="flex-1 grid grid-cols-9 h-full">
                  {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
                    <div key={hour} className="border-r border-gray-200 h-full flex items-center pl-2 text-[10px] font-medium text-gray-500">
                      {hour}:00
                    </div>
                  ))}
               </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 left-32 grid grid-cols-9 pointer-events-none z-0">
                 {[...Array(9)].map((_, i) => (
                    <div key={i} className="border-r border-gray-100 h-full" />
                 ))}
              </div>

              {/* Rows */}
              <div className="relative z-10">
                {users.map((user) => (
                  <div key={user.id} className="flex h-16 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    {/* Name Column */}
                    <div className="w-32 flex-shrink-0 border-r border-gray-200 flex items-center px-4 gap-3 bg-white">
                       <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedUser(user);
                           }}
                           className="hover:text-indigo-600 transition-colors text-left"
                         >
                           {user.name}
                         </button>
                       </div>
                    </div>

                    {/* Timeline Column */}
                    <div className="flex-1 relative h-full">
                       {user.schedules.map((item) => {
                         // Check if it's a TimelineItem (has duration) or Schedule (has end time)
                         const isTimelineItem = 'duration' in item;
                         const startTime = isTimelineItem ? (item as any).start : parseInt((item as any).start.split(':')[0]);
                         const duration = isTimelineItem ? (item as any).duration : 1; // Default to 1 hour for Schedule items
                         
                         return (
                           <div
                             key={item.id}
                             className={`absolute top-2 bottom-2 rounded-lg px-3 flex items-center text-[11px] font-semibold text-white shadow-sm overflow-hidden border border-white/10
                              hover:scale-[1.02] hover:z-20 transition-all cursor-pointer
                              ${isTimelineItem && (item as any).type === "meeting" 
                                ? "bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-200" 
                                : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200"}
                            `}
                             style={{
                               left: `${((startTime - 9) / 9) * 100}%`,
                               width: `${(duration / 9) * 100}%`
                             }}
                           >
                             <span className="truncate drop-shadow-md">{item.title}</span>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 🟡 AI Command Bar (Floating) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] max-w-[90%] z-50">
           <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-focus-within:opacity-100 transition duration-300 blur-md"></div>
              <div className="relative bg-white flex items-center rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                 <div className="pl-4 text-gray-400">
                    <Command className="w-5 h-5" />
                 </div>
                 <Input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleCommand}
                    className="h-14 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm"
                    placeholder="AI Copilot에게 질문하세요 (예: 김서원 지금 미팅 가능해?)"
                 />
                 <div className="pr-4 hidden md:block">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">ENTER</span>
                 </div>
              </div>

              {response && (
                 <div className="absolute bottom-full left-0 right-0 mb-4 bg-[#18181b]/95 backdrop-blur-xl text-white p-5 rounded-xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-2 fade-in">
                    <div className="flex gap-3">
                       <div className="p-2 bg-indigo-600 rounded-lg h-fit">
                          <Monitor className="w-4 h-4 text-white" />
                       </div>
                       <div>
                          <div className="font-bold text-sm text-indigo-700 mb-1">AI Insight Analysis</div>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{response}</div>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </div>

        {/* Schedule Management Modal */}
        <ScheduleModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      </main>
    </div>
  );
}