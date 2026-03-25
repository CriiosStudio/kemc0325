// data_certs.ts

export const CERT_CONFIG = {
  issuer: "K-Ent Master Class 운영위원회",
  foundation: "Joongbu University & CRIIOS",
  validPeriod: "발급일로부터 2년",
};

export const getCertData = (testResult: any, userInfo: any) => {
  const { grade, type } = testResult;

  // 등급별 수료증 명칭 설정
  const certTitles: Record<string, string> = {
    S: "최우수 실무 전문가 인증 (Master)",
    "A+": "우수 실무 전문가 인증 (Expert)",
    A: "전문 실무자 인증 (Professional)",
    "B+": "심화 과정 이수 인증 (Advanced)",
    B: "실무 과정 이수 인증 (Senior)",
    "C+": "기초 과정 이수 인증 (Junior)",
    C: "입문 과정 이수 인증 (Beginner)",
    F: "이수 불가 (재검토 대상)",
  };

  return {
    title: certTitles[grade] || "교육 이수 인증",
    content: `${userInfo.name}님은 K-Ent Master Class에서 시행한 역량 검사 및 실무 교육 과정을 성실히 수행하였으며, 특히 '${type}' 분야에서 탁월한 적합성을 증명하였기에 이 증서를 수여합니다.`,
    canIssue: grade !== "F", // F등급은 수료증 발급 버튼 비활성화
    sealText: grade === "S" ? "GOLD SEAL" : "OFFICIAL",
  };
};
