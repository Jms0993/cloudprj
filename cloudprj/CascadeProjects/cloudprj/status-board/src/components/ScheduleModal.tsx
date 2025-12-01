import React, { useState } from 'react';
import { User } from '@/lib/mockData';
import { X, Calendar, Clock, Plus, ChevronLeft, ChevronRight, Trash2, Edit2 } from 'lucide-react';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

interface ScheduleModalProps {
  user: User | null;
  onClose: () => void;
}

export function ScheduleModal({ user, onClose }: ScheduleModalProps) {
  const [activeTab, setActiveTab] = useState<'day' | 'month'>('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  if (!user) return null;
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  const days = [];
  const totalDays = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
  
  for (let i = 0; i < totalDays; i++) {
    const day = i - firstDayOfMonth + 1;
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    const isToday = isCurrentMonth && day === new Date().getDate() && currentMonth === new Date().getMonth();
    days.push({ day: isCurrentMonth ? day : '', isCurrentMonth, isToday });
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-end">
      
      {/* ✅ 여기가 수정된 부분입니다 
         bg-black/80: 배경을 80% 진한 검정색으로 덮음
         backdrop-blur-sm: 뒤에 있는 글씨를 흐리게 뭉갰음
      */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* 바텀 시트 본체 */}
      <div className="relative w-full max-w-4xl bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] h-[650px] overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* 핸들바 */}
        <div className="absolute top-0 left-0 right-0 h-6 flex justify-center pt-2 bg-white z-20 cursor-grab active:cursor-grabbing" onClick={onClose}>
           <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* --- Header --- */}
        <div className="flex-none px-8 pt-8 pb-4 border-b border-gray-100 bg-white flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shadow-sm">
                {user.avatar}
             </div>
             <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {user.name} 
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">일정 관리</span>
                </h2>
                <p className="text-sm text-gray-500">{user.role}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('day')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'day' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  리스트
                </button>
                <button 
                  onClick={() => setActiveTab('month')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  달력
                </button>
             </div>

             <button 
               onClick={onClose} 
               className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
             >
               <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* --- Body --- */}
        <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
          {activeTab === 'day' ? (
            <div className="space-y-4">
              {user.schedules.length > 0 ? (
                user.schedules.map((schedule) => {
                  const isTimelineItem = 'duration' in schedule;
                  const endTime = isTimelineItem 
                    ? `${(schedule as any).start + (schedule as any).duration}시` 
                    : schedule.end;
                    
                  return (
                    <div key={schedule.id} className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-1.5 h-12 rounded-full ${schedule.type === 'meeting' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
                          <div>
                             <h3 className="font-bold text-gray-800 text-base mb-1">{schedule.title}</h3>
                             <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1.5 text-indigo-400" />
                                {schedule.start} ~ {endTime}
                             </div>
                          </div>
                       </div>
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200">수정</button>
                          <button className="px-3 py-1.5 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-lg border border-rose-100">삭제</button>
                       </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                  <Calendar className="w-10 h-10 mb-2 opacity-20" />
                  <p>등록된 일정이 없습니다.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
               <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
                  <span className="font-bold text-gray-800 text-lg">{currentYear}년 {currentMonth + 1}월</span>
                  <div className="flex gap-1">
                     <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))} className="p-1.5 hover:bg-white rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600"/></button>
                     <button onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))} className="p-1.5 hover:bg-white rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-gray-600"/></button>
                  </div>
               </div>
               <div className="grid grid-cols-7 text-center bg-white">
                  {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d} className="py-3 text-xs font-bold text-gray-400 uppercase">{d}</div>)}
                  {days.map((d, i) => (
                    <div key={i} className={`h-14 border-t border-gray-50 flex items-center justify-center text-sm relative group ${d.isToday ? 'bg-indigo-50 font-bold text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {d.day}
                      {d.day && Math.random() > 0.7 && (
                         <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      )}
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        <div className="flex-none p-6 bg-gray-50 border-t border-gray-200 z-20">
           <div className="flex gap-4">
              <input type="text" placeholder="새로운 업무나 미팅을 입력하세요..." className="flex-[2] bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" />
              
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 flex-1 shadow-sm">
                 <Clock className="w-4 h-4 text-gray-400" />
                 <input type="number" placeholder="09" className="w-full bg-transparent py-3 text-center outline-none text-sm" />
                 <span className="text-gray-300">~</span>
                 <input type="number" placeholder="11" className="w-full bg-transparent py-3 text-center outline-none text-sm" />
              </div>
              
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-200">
                 <Plus className="w-5 h-5" />
                 추가
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}