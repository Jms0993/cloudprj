// @ts-nocheck
export type UserStatus = 'online' | 'busy' | 'meeting' | 'offline';

export interface Schedule {
  id: string;
  title: string;
  start: string; // 'HH:MM'
  end: string;   // 'HH:MM'
}

export interface TimelineItem {
  id: string;
  title: string;
  start: number;   // hour, e.g. 9, 9.5
  duration: number; // in hours
  type: 'meeting' | 'focus';
}

export interface User {
  id: string;
  name: string;
  role: string;
  status: UserStatus;
  avatar: string;
  schedules: Schedule[];
  schedule: TimelineItem[];
}

export const users: User[] = [
  {
    id: 'u1',
    name: '김서원',
    role: '프론트엔드 개발자',
    status: 'online',
    avatar: '사원',
    schedules: [
      { id: 'u1-1', title: '데일리 스탠드업', start: '09:00', end: '09:30' },
      { id: 'u1-2', title: '신규 대시보드 UI 작업', start: '10:00', end: '13:00' },
      { id: 'u1-3', title: '디자인팀과 협업 미팅', start: '14:00', end: '16:00' },
      { id: 'u1-4', title: '리뷰 및 리팩토링', start: '16:30', end: '18:00' },
    ],
    schedule: [
      { id: 'u1-t1', title: '데일리 스탠드업', start: 9, duration: 0.5, type: 'meeting' },
      { id: 'u1-t2', title: '대시보드 UI 작업', start: 10, duration: 3, type: 'focus' },
      { id: 'u1-t3', title: '디자인 협업', start: 14, duration: 2, type: 'meeting' },
    ],
  },
  {
    id: 'u2',
    name: '박팀장',
    role: '프로덕트 매니저',
    status: 'busy',
    avatar: '팀장',
    schedules: [
      { id: 'u2-1', title: '주간 일정 점검', start: '09:00', end: '10:00' },
      { id: 'u2-2', title: '클라이언트 미팅', start: '10:30', end: '12:00' },
      { id: 'u2-3', title: '기획서 리뷰', start: '13:30', end: '15:30' },
      { id: 'u2-4', title: '경영진 보고 준비', start: '16:00', end: '18:00' },
    ],
    schedule: [
      { id: 'u2-t1', title: '클라이언트 미팅', start: 10.5, duration: 1.5, type: 'meeting' },
      { id: 'u2-t2', title: '기획서 리뷰', start: 13.5, duration: 2, type: 'focus' },
      { id: 'u2-t3', title: '보고서 준비', start: 16, duration: 2, type: 'focus' },
    ],
  },
  {
    id: 'u3',
    name: '이하늘',
    role: '백엔드 개발자',
    status: 'meeting',
    avatar: '하늘',
    schedules: [
      { id: 'u3-1', title: 'API 스펙 논의', start: '09:30', end: '11:00' },
      { id: 'u3-2', title: 'DB 스키마 정리', start: '11:00', end: '13:00' },
      { id: 'u3-3', title: '성능 튜닝 작업', start: '14:00', end: '17:00' },
      { id: 'u3-4', title: '배포 준비', start: '17:00', end: '18:00' },
    ],
    schedule: [
      { id: 'u3-t1', title: 'API 스펙 논의', start: 9.5, duration: 1.5, type: 'meeting' },
      { id: 'u3-t2', title: 'DB 스키마 정리', start: 11, duration: 2, type: 'focus' },
      { id: 'u3-t3', title: '성능 튜닝', start: 14, duration: 3, type: 'focus' },
    ],
  },
  {
    id: 'u4',
    name: '최민지',
    role: '디자이너',
    status: 'online',
    avatar: '민지',
    schedules: [
      { id: 'u4-1', title: 'UX 리서치 정리', start: '09:00', end: '10:30' },
      { id: 'u4-2', title: '와이어프레임 작업', start: '10:30', end: '13:00' },
      { id: 'u4-3', title: 'UI 컴포넌트 정리', start: '14:00', end: '16:30' },
      { id: 'u4-4', title: '디자인 시스템 업데이트', start: '16:30', end: '18:00' },
    ],
    schedule: [
      { id: 'u4-t1', title: 'UX 리서치', start: 9, duration: 1.5, type: 'focus' },
      { id: 'u4-t2', title: '와이어프레임', start: 10.5, duration: 2.5, type: 'focus' },
      { id: 'u4-t3', title: '디자인 시스템', start: 16.5, duration: 1.5, type: 'focus' },
    ],
  },
  {
    id: 'u5',
    name: '정우진',
    role: 'QA 엔지니어',
    status: 'offline',
    avatar: '우진',
    schedules: [
      { id: 'u5-1', title: '테스트 케이스 작성', start: '09:00', end: '11:00' },
      { id: 'u5-2', title: '신규 기능 테스트', start: '11:00', end: '14:00' },
      { id: 'u5-3', title: '버그 리포트 정리', start: '15:00', end: '17:00' },
      { id: 'u5-4', title: '자동화 스크립트 정비', start: '17:00', end: '18:00' },
    ],
    schedule: [
      { id: 'u5-t1', title: '테스트 케이스', start: 9, duration: 2, type: 'focus' },
      { id: 'u5-t2', title: '기능 테스트', start: 11, duration: 3, type: 'focus' },
      { id: 'u5-t3', title: '버그 리포트', start: 15, duration: 2, type: 'meeting' },
    ],
  },
];
