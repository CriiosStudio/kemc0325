// data_grades.ts
import { COURSES_LIST } from "./data_courses_main";

export const GRADES = [
  { id: "S", label: "Master", minPercent: 95, color: "#0369a1" },
  { id: "A", label: "Expert", minPercent: 85, color: "#0284c7" },
  { id: "B", label: "Professional", minPercent: 70, color: "#0ea5e9" },
  { id: "C", label: "Advanced", minPercent: 55, color: "#38bdf8" },
  { id: "D", label: "Senior", minPercent: 40, color: "#7dd3fc" },
  { id: "E", label: "Junior", minPercent: 25, color: "#bae6fd" },
  { id: "F", label: "Reality Check", minPercent: 0, color: "#f1f5f9" },
];

export const calculateGrade = (answers: number[], questions: any[], userInfo: any) => {
  let rawC = 0; let rawA = 0; let rawS = 0;

  answers.forEach((ans, idx) => {
    const q = questions[idx];
    if (!q) return;
    const score = q.rev ? 6 - ans : ans;
    if (q.category === 'C') rawC += score;
    if (q.category === 'A') rawA += score;
    if (q.category === 'S') rawS += score;
  });

  // 60문항 합산을 0.5배 하여 150점 만점으로 변환
  const C = rawC * 0.5; 
  const A = rawA * 0.5; 
  const S = rawS * 0.5; 

  const totalScore = C + A + S;
  const maxPossible = 150; 
  const percent = (totalScore / maxPossible) * 100;

  const gradeObj = GRADES.find(g => percent >= g.minPercent) || GRADES[GRADES.length - 1];
  
  const diff = Math.abs(A - S);
  const prefix = C >= 42 ? "준비된 에이스," : C >= 32 ? "무난하고 안정적인" : "열정이 필요한";
  
  let suffix = "";
  if (diff <= 5) suffix = "전천후 올라운더 매니저";
  else if (A > S) suffix = "현장 케어 특화 배우 매니저";
  else suffix = "현장 지휘관형 가수 매니저";
  
  // --- [새로운 강좌 추천 로직] ---
  let recCourse = COURSES_LIST.common[0]; // 기본값: 1강

  if (gradeObj.id === "F" || C < 30) {
    // 기초가 부족하거나 F등급인 경우 윤리/기초 강좌 추천
    recCourse = COURSES_LIST.common[2]; // 제3강: 기초 법률, 윤리, 성교육
  } else if (A > S && A >= 35) {
    // 배우 성향이 강하고 점수가 높을 때
    recCourse = COURSES_LIST.actor[2]; // 제7강: 촬영 대기실과 현장 체크리스트
  } else if (S > A && S >= 35) {
    // 가수 성향이 강하고 점수가 높을 때
    recCourse = COURSES_LIST.singer[2]; // 제10강: 행사와 팬들이 모이는 곳에서의 안전 관리
  } else {
    // 그 외 무난한 경우
    recCourse = COURSES_LIST.common[3]; // 제4강: 아티스트 현장 케어의 기초
  }

  const radar = [
    { subject: "에너지", value: Math.min(100, S * 2.0) },
    { subject: "위기대처", value: Math.min(100, C * 2.0) },
    { subject: "소통공감", value: Math.min(100, A * 2.0) },
    { subject: "꼼꼼함", value: Math.min(100, ((C + A) / 2) * 2) },
    { subject: "인내심", value: Math.min(100, ((A + S) / 2) * 2) },
    { subject: "순발력", value: Math.min(100, S * 2.2) },
  ];

  return {
    isDone: true,
    type: gradeObj.id === "F" ? "직무 재고려형" : `${prefix} ${suffix}`,
    grade: gradeObj.id,
    gradeLabel: gradeObj.label,
    desc: `${userInfo.name} 매니저님의 역량 점수는 상위 약 ${Math.max(1, 100 - Math.floor(percent))}% 수준입니다.`,
    course: recCourse,
    radar: radar,
    scores: { C, A, S, total: totalScore, percent }
  };
};