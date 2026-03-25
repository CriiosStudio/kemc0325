import React from "react";

/**
 * 23일 최종 고도화 버전: 실무 멘토링 리포트 생성 로직
 * 1. 6대 역량 지표 상세 풀이
 * 2. 등급별 3단계 상세 진단 (S, A, B, C, D, E, F)
 * 3. 아티스트 매칭 (가수, 배우, 방송인 3종 지원 / 점수 상향 보정)
 */
export const getMentoringMessage = (testResult: any, userInfo: any) => {
  // 데이터 안전성 검사
  if (!testResult || !testResult.scores || !testResult.radar) {
    return [<p key="none">데이터 분석 중입니다...</p>];
  }

  const { grade, scores, radar } = testResult;
  const blocks: React.ReactNode[] = [];

  // --- [1. 6대 역량 지표 상세 풀이] ---
  const renderRadarAnalysis = () => {
    return (
      <div
        key="radar_detail"
        style={{
          marginBottom: "25px",
          padding: "15px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h5
          style={{ margin: "0 0 10px 0", color: "#0369a1", fontSize: "14px" }}
        >
          📊 지표별 역량 분석
        </h5>
        <ul
          style={{
            paddingLeft: "18px",
            margin: 0,
            fontSize: "13px",
            color: "#475569",
            lineHeight: "1.6",
          }}
        >
          {radar.map((item: any, idx: number) => (
            <li key={idx} style={{ marginBottom: "5px" }}>
              <span style={{ fontWeight: "700", color: "#1e293b" }}>
                {item.subject}:
              </span>{" "}
              {item.value >= 80
                ? "업계 최상위권의 강점입니다."
                : item.value >= 60
                ? "안정적인 숙련도를 보유하고 있습니다."
                : "향후 실무 교육을 통해 보완이 필요한 영역입니다."}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  blocks.push(renderRadarAnalysis());

  // --- [2. 등급별 3단계 상세 진단 (수정본)] ---
  const gradeDetails: Record<
    string,
    { adapt: string; expert: string; growth: string }
  > = {
    S: {
      adapt:
        "어떤 돌발 상황에서도 아티스트를 보호할 수 있는 완벽한 현장 장악력을 갖췄습니다.",
      expert:
        "매니지먼트의 본질을 꿰뚫고 있으며, 업계 표준이 될만한 실무 감각을 보유하고 있습니다.",
      growth:
        "현장을 진두지휘하는 총괄 매니저나 제작 총괄자로서 최고의 역량을 발휘할 것입니다.",
    },
    A: {
      adapt:
        "현장의 흐름을 읽는 눈이 뛰어나며, 실무 투입 시 즉시 전력감으로 평가됩니다.",
      expert:
        "담당 아티스트와의 신뢰 형성에 탁월하며, 업무 프로세스 이해도가 높습니다.",
      growth:
        "1년 내 팀장급 역량으로 성장할 가능성이 매우 높은 핵심 인재입니다.",
    },
    B: {
      adapt:
        "기본적인 현장 매너와 태도가 훌륭하며, 상급자의 지시를 정확히 수행합니다.",
      expert:
        "실무 지식의 기초가 탄탄하여 교육 이수 후 빠른 업무 숙달이 가능합니다.",
      growth: "성실함을 바탕으로 업계에서 롱런할 수 있는 안정적인 재목입니다.",
    },
    C: {
      adapt:
        "엔터 산업의 속도감에 적응하기 위한 기초 체력 훈련이 병행되어야 합니다.",
      expert:
        "열정은 충분하나 실무적인 디테일(운전, 스케줄링 등) 보강이 필요합니다.",
      growth:
        "본인만의 확실한 주특기를 설정한다면 충분히 전문가로 거듭날 수 있습니다.",
    },
    D: {
      adapt:
        "초기 현장 적응에 시간이 걸릴 수 있으나, 차분히 경험을 쌓으면 충분히 극복 가능한 수준입니다.",
      expert:
        "지금은 낯설게 느껴지는 실무 지식들도 체계적인 교육을 통해 하나씩 내재화할 수 있습니다.",
      growth:
        "기초부터 탄탄히 다진다면 안정적인 실무자로 성장할 잠재력이 있습니다. 응원합니다!",
    },
    E: {
      adapt:
        "현장의 거친 환경이 처음엔 버거울 수 있지만, 동료들과의 협업을 통해 적응력을 키울 수 있습니다.",
      expert:
        "실전 투입 전 충분한 시뮬레이션 교육을 거친다면 업무 실수를 최소화하며 성장할 수 있습니다.",
      growth:
        "본인만의 세심한 관찰력을 매니징에 접목한다면 독보적인 케어 능력을 갖출 수 있습니다.",
    },
    F: {
      adapt:
        "현장 매니지먼트 특유의 불규칙한 생활 패턴과 감정 소모가 본인의 성향과 상충될 우려가 큽니다.",
      expert:
        "매니저보다는 꼼꼼한 기획력을 살릴 수 있는 '엔터 행정', '팬마케팅', '언론홍보' 직군을 강력 추천합니다.",
      growth:
        "본인이 더 즐겁게 몰입할 수 있는 타 직군에서 엔터 전문가로서의 커리어 시작을 권장합니다.",
    },
  };

  const currentDetail = gradeDetails[grade] || gradeDetails["F"];

  const renderGradeReport = () => (
    <div
      key="grade_report"
      style={{
        marginTop: "10px",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#334155",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <span
          style={{
            fontSize: "12px",
            color: "#0284c7",
            fontWeight: "bold",
            display: "block",
            marginBottom: "4px",
          }}
        >
          [1. 현장 적응력]
        </span>
        <p style={{ margin: 0 }}>{currentDetail.adapt}</p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <span
          style={{
            fontSize: "12px",
            color: "#0284c7",
            fontWeight: "bold",
            display: "block",
            marginBottom: "4px",
          }}
        >
          [2. 업무 전문성]
        </span>
        <p style={{ margin: 0 }}>{currentDetail.expert}</p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <span
          style={{
            fontSize: "12px",
            color: "#0284c7",
            fontWeight: "bold",
            display: "block",
            marginBottom: "4px",
          }}
        >
          [3. 성장 가능성]
        </span>
        <p style={{ margin: 0 }}>{currentDetail.growth}</p>
      </div>
    </div>
  );
  blocks.push(renderGradeReport());

  // --- [3. 아티스트 매칭 로직 (후한 점수 + 이름 변동치 10% 제한)] ---
  if (userInfo.artist) {
    // 점수 산식 보정: 기본 80% 가중치 + 보너스 10점 + 이름 기반 최대 10점(10% 제한)
    const baseScore = Math.floor(scores.percent * 0.8) + 10;
    const nameBonus = (userInfo.name.length * 3.3) % 11; // 0~10점 사이 변동
    const finalMatchScore = Math.min(100, Math.floor(baseScore + nameBonus));

    // 유형별 맞춤 멘트 (가수, 배우, 방송인)
    let matchComment = "";
    const artistType = userInfo.artistType || "가수";

    if (artistType === "가수") {
      const energyScore =
        radar.find((r: any) => r.subject === "에너지")?.value || 50;
      matchComment =
        energyScore >= 60
          ? `긴박한 음악 방송 현장과 월드 투어 스케줄 속에서도 ${userInfo.artist}님을 완벽히 서포트할 에너지를 갖추셨네요.`
          : `가수 매니징의 핵심인 '현장 순발력'과 '에너지'를 보강한다면 ${userInfo.artist}님과 더욱 찰떡궁합이 될 것입니다.`;
    } else if (artistType === "배우") {
      const empathyScore =
        radar.find((r: any) => r.subject === "소통공감")?.value || 50;
      matchComment =
        empathyScore >= 60
          ? `배우의 섬세한 감정선을 읽어내는 공감 능력이 탁월하여 ${userInfo.artist}님과 깊은 신뢰 관계를 형성할 최적의 파트너입니다.`
          : `${userInfo.artist}님의 감정 케어를 위해 '소통 역량'에 조금 더 집중해본다면 매칭률이 훨씬 높아질 것입니다.`;
    } else if (artistType === "방송인") {
      const crisisScore =
        radar.find((r: any) => r.subject === "위기대처")?.value || 50;
      matchComment =
        crisisScore >= 60
          ? `수많은 스태프와 돌발 변수가 가득한 예능 현장에서 ${userInfo.artist}님을 보호할 뛰어난 위기대처 능력이 돋보입니다.`
          : `방송 현장의 돌발 상황을 통제하는 '위기관리 역량'을 키우면 ${userInfo.artist}님의 독보적인 조력자가 될 것입니다.`;
    }

    blocks.push(
      <div
        key="match_box"
        style={{
          marginTop: "25px",
          padding: "18px",
          background: "#fdf4ff",
          borderRadius: "16px",
          border: "1px solid #f0abfc",
          boxShadow: "0 4px 10px rgba(112, 26, 117, 0.05)",
        }}
      >
        <h5
          style={{ margin: "0 0 10px 0", color: "#701a75", fontSize: "15px" }}
        >
          🎯 {userInfo.artist}({artistType}) 매칭 결과
        </h5>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "900",
            color: "#a21caf",
            marginBottom: "10px",
          }}
        >
          {finalMatchScore}점
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#4a044e",
            lineHeight: "1.6",
            wordBreak: "keep-all",
          }}
        >
          {matchComment}
        </p>
      </div>
    );
  }

  // 나이 및 면허 가이드 (무생략)
  if (
    parseInt(userInfo.age) >= 45 &&
    (!userInfo.experience || userInfo.experience === "신입")
  ) {
    blocks.push(
      <p
        key="age_notice"
        style={{
          marginTop: "20px",
          padding: "12px",
          background: "#fffbeb",
          color: "#92400e",
          fontSize: "12px",
          borderRadius: "10px",
          borderLeft: "5px solid #f59e0b",
          lineHeight: "1.5",
        }}
      >
        <strong>💡 커리어 가이드:</strong> 신입으로서의 열정은 훌륭하나, 현장의
        물리적 피로도를 고려하여 기획사 운영 관리직이나 제작 파트로의 특화
        발전을 추천드립니다.
      </p>
    );
  }

  if (userInfo.license === "미보유") {
    blocks.push(
      <p
        key="license_warn"
        style={{
          marginTop: "12px",
          color: "#dc2626",
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        ⚠️ 알림: 매니저 채용 시 운전면허는 필수 요건입니다.
      </p>
    );
  }

  return blocks;
};
