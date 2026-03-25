// data_stats.ts

export const getStats = (userInfo: any, testResult: any) => {
  const { scores, grade } = testResult;

  // 1. 나이대별 평균 점수 (가상 데이터 시뮬레이션)
  const ageGroup = Math.floor(parseInt(userInfo.age) / 10) * 10;
  const ageAvg = ageGroup >= 40 ? 85 : 95; // 젊은 층이 엔터 상식이 조금 더 높다는 가정

  // 2. 동일 지원 분야(가수/배우) 내 백분위 계산
  const fieldRank = Math.max(1, 100 - Math.floor(scores.percent + 5));

  // 3. 통계 메시지 생성
  const statsMessage = `${
    userInfo.name
  } 매니저님은 현재 ${ageGroup}대 참여자 중 상위 ${fieldRank}%에 해당하며, 특히 ${
    testResult.scores.C > 40 ? "공통 소양" : "현장 대처"
  } 능력이 해당 그룹 평균보다 월등히 높게 나타났습니다.`;

  return {
    ageAvg,
    fieldRank,
    message: statsMessage,
    totalUsers: 1428 + (grade === "S" ? 1 : 0), // 누적 참여자 수 반영
  };
};
