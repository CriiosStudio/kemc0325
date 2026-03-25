import React, { useState, useEffect } from "react";
import "./styles.css";

// --- [외부 데이터 및 로직 임포트] ---
import { QUESTIONS } from "./data_questions";
import { calculateGrade } from "./data_grades";
import { COURSES_LIST, COURSE_CONTENTS } from "./data_courses_main";
import { getMentoringMessage } from "./data_results";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [testResult, setTestResult] = useState<any>({ isDone: false });
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [testDate, setTestDate] = useState("");
  const [totalParticipants, setTotalParticipants] = useState(1428);

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "남성",
    license: "보유",
    field: "가수",
    experience: "",
    artist: "",
    artistType: "가수",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  const checkCertConditions = () => {
    const allCourses = [
      ...COURSES_LIST.common,
      ...COURSES_LIST.actor,
      ...COURSES_LIST.singer,
    ];

    const isAllDone = allCourses.every(
      (course) => completedCourses.indexOf(course) !== -1
    );
    const hasTested = testResult.isDone;

    return { canGetCert: isAllDone, hasTested };
  };

  const startTest = (data: any) => {
    setUserInfo(data);
    setTestDate(new Date().toLocaleDateString());
    setCurrentTab("test");
  };

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <HomeTab onGoInfo={() => setCurrentTab("info")} />;
      case "info":
        return <InfoTab onStart={startTest} />;
      case "test":
        return (
          <TestTab
            testResult={testResult}
            setTestResult={setTestResult}
            userInfo={userInfo}
            goToClass={() => setCurrentTab("class")}
            goToProfile={() => {
              setTotalParticipants((prev) => prev + 1);
              setCurrentTab("profile");
            }}
            checkCertConditions={checkCertConditions}
          />
        );
      case "class":
        return (
          <ClassTab
            completedCourses={completedCourses}
            setCompletedCourses={setCompletedCourses}
            goToProfile={() => setCurrentTab("profile")}
          />
        );
      case "profile":
        return (
          <ProfileTab
            testResult={testResult}
            userInfo={userInfo}
            testDate={testDate || new Date().toLocaleDateString()}
            serialNo={totalParticipants + 1}
            checkCertConditions={checkCertConditions}
            goToTest={() => setCurrentTab("info")}
          />
        );
      default:
        return <HomeTab onGoInfo={() => setCurrentTab("info")} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>K-Ent Master Class</h2>
        <p>엔터 실무자 역량 강화 플랫폼</p>
      </header>
      <main className="app-main">{renderContent()}</main>
      <nav className="bottom-nav">
        <NavItem
          icon="🏠"
          label="홈"
          isActive={currentTab === "home"}
          onClick={() => setCurrentTab("home")}
        />
        <NavItem
          icon="📝"
          label="역량검사"
          isActive={currentTab === "test" || currentTab === "info"}
          onClick={() =>
            testResult.isDone ? setCurrentTab("test") : setCurrentTab("info")
          }
        />
        <NavItem
          icon="🎓"
          label="실무교육"
          isActive={currentTab === "class"}
          onClick={() => setCurrentTab("class")}
        />
        <NavItem
          icon="📜"
          label="인증서"
          isActive={currentTab === "profile"}
          onClick={() => setCurrentTab("profile")}
        />
      </nav>
    </div>
  );
}

// --- [하위 컴포넌트 구현] ---

function HomeTab({ onGoInfo }: any) {
  return (
    <div className="home-content" style={{ textAlign: "center" }}>
      <div className="welcome-card">
        <h3>환영합니다, 매니저님!</h3>
        <p
          style={{
            fontSize: "13.5px",
            lineHeight: "1.7",
            color: "#334155",
            marginTop: "12px",
            textAlign: "left",
          }}
        >
          본 시스템은 엔터테인먼트 산업의 공공적 발전과 매니저 직무에 대한 전문
          역량 검증 및 기초 교육을 목적으로 제작되었습니다.
          <br />
          <br />
          현직에서 활동 중인 매니저들과 전문 학과의 교육인들이 협업하여
          설계하였으며, 이 검사가 실무자 여러분께 실질적인 도움이 되기를
          희망합니다.
          <br />
          <br />
          60문항의 정교한 검사를 통해 실무 역량을 진단하고, 맞춤형 10강
          커리큘럼을 통해 전문 매니저로 거듭나세요.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fff1f2",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
          border: "1px solid #fecdd3",
        }}
      >
        <p
          style={{
            fontSize: "12.5px",
            color: "#e11d48",
            lineHeight: "1.6",
            fontWeight: "600",
            margin: 0,
          }}
        >
          ⚠️ 주의: 앱을 종료하면 정보가 초기화됩니다. 카카오톡 인앱 브라우저로
          실행 중이시라면 우측 하단 메뉴(점 3개)를 눌러{" "}
          <span style={{ textDecoration: "underline" }}>
            [다른 브라우저로 열기]
          </span>{" "}
          혹은 [Safari로 열기]를 권장드립니다.
        </p>
      </div>

      <button className="primary-btn mt-6" onClick={onGoInfo}>
        매니저 실무 인적성 검사 시작
      </button>
      <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "15px" }}>
        * 본 검사는 전문 역량 진단을 위한 참고 자료로 활용됩니다.
      </p>
    </div>
  );
}

function InfoTab({ onStart }: any) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "남성",
    license: "보유",
    field: "가수",
    experience: "",
    artist: "",
    artistType: "가수",
  });
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="info-container" style={{ paddingBottom: "80px" }}>
      <div className="form-group">
        <h4 style={{ marginBottom: "15px", color: "#1e293b" }}>
          [필수] 기본 정보
        </h4>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="age"
          placeholder="나이 (예: 28)"
          onChange={handleChange}
          className="input-field mt-2"
        />
        <div
          className="radio-group mt-4"
          style={{ display: "flex", gap: "20px", padding: "5px 10px" }}
        >
          <label>
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={formData.gender === "남성"}
              onChange={handleChange}
            />{" "}
            남성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={formData.gender === "여성"}
              onChange={handleChange}
            />{" "}
            여성
          </label>
        </div>
        <select
          name="license"
          onChange={handleChange}
          className="select-field mt-4"
        >
          <option value="보유">운전면허 보유</option>
          <option value="미보유">운전면허 미보유</option>
        </select>
        <select
          name="field"
          onChange={handleChange}
          className="select-field mt-2"
        >
          <option value="가수">가수 매니지먼트 지원</option>
          <option value="배우">배우 매니지먼트 지원</option>
          <option value="종합">종합 엔터테인먼트 지원</option>
        </select>
      </div>
      <div className="form-group mt-4">
        <h4 style={{ marginBottom: "15px", color: "#1e293b" }}>
          [선택] 추가 역량 (상세 분석용)
        </h4>
        <input
          type="text"
          name="experience"
          placeholder="관련 경력 (예: 신입, 2년차)"
          onChange={handleChange}
          className="input-field"
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="text"
            name="artist"
            placeholder="관심 아티스트"
            onChange={handleChange}
            className="input-field"
            style={{ flex: 2, marginTop: 0 }}
          />
          <select
            name="artistType"
            onChange={handleChange}
            className="select-field"
            style={{ flex: 1, marginTop: 0 }}
          >
            <option value="가수">가수</option>
            <option value="배우">배우</option>
            <option value="방송인">방송인</option>
          </select>
        </div>
      </div>
      <button
        className="primary-btn mt-6"
        onClick={() => {
          if (!formData.name || !formData.age)
            return alert("필수 항목(이름, 나이)을 입력해주세요.");
          onStart(formData);
        }}
      >
        인적성 검사 시작하기
      </button>
    </div>
  );
}

function TestTab({
  testResult,
  setTestResult,
  userInfo,
  goToClass,
  goToProfile,
  checkCertConditions,
}: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setAiLoading(true);
      const res = calculateGrade(newAnswers, QUESTIONS, userInfo);
      setTimeout(() => {
        setTestResult(res);
        setAiLoading(false);
      }, 1500);
    }
  };

  if (aiLoading)
    return (
      <div
        className="test-result-container"
        style={{ textAlign: "center", paddingTop: "100px" }}
      >
        <h3>🤖 60개 데이터 정밀 분석 중...</h3>
      </div>
    );

  if (testResult.isDone) {
    const { canGetCert } = checkCertConditions();
    return (
      <div className="test-result-container" style={{ paddingBottom: "80px" }}>
        <div className="result-card">
          <p className="result-subtitle">K-Ent Master Class 종합 분석</p>
          <h3
            className="result-title"
            style={{ fontSize: "1.4rem", color: "#0f172a", margin: "10px 0" }}
          >
            {testResult.type}
          </h3>
          <p
            className="result-desc"
            style={{ color: "#64748b", fontSize: "0.95rem" }}
          >
            {testResult.desc}
          </p>
          <RadarChart data={testResult.radar} grade={testResult.grade} />
          <div className="ai-box">
            <h4
              style={{
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "10px",
              }}
            >
              💡 실무 멘토링 리포트
            </h4>
            <div style={{ marginTop: "15px" }}>
              {getMentoringMessage(testResult, userInfo)}
            </div>
          </div>
          <button
            className="primary-btn mt-4"
            onClick={canGetCert ? goToProfile : goToClass}
          >
            {canGetCert
              ? "프리미엄 수료증 확인하기"
              : "전체 교육 수강하러 가기"}
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="test-container" style={{ paddingBottom: "80px" }}>
      <div className="test-progress-wrapper">
        <div className="test-stats">
          <span className="current-step">문항 {currentIndex + 1}</span>
          <span className="total-steps">/ {QUESTIONS.length}</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="question-card">
        <h3 className="question-text">{QUESTIONS[currentIndex].text}</h3>
      </div>
      <div className="answer-buttons">
        {[5, 4, 3, 2, 1].map((s) => {
          const labels: any = {
            5: "매우 그렇다",
            4: "그런 편이다",
            3: "보통이다",
            2: "아닌 편이다",
            1: "전혀 아니다",
          };
          return (
            <button
              key={s}
              className="answer-btn"
              onClick={() => handleAnswer(s)}
            >
              {labels[s]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadarChart({ data, grade }: any) {
  if (!data) return null;
  const size = 320;
  const center = size / 2;
  const radius = 90;
  const angles = [0, 60, 120, 180, 240, 300].map(
    (a) => ((a - 90) * Math.PI) / 180
  );
  const getPoint = (val: number, idx: number) => ({
    x: center + (val / 100) * radius * Math.cos(angles[idx]),
    y: center + (val / 100) * radius * Math.sin(angles[idx]),
  });
  const getLabelPos = (idx: number) => ({
    x: center + (radius + 25) * Math.cos(angles[idx]),
    y: center + (radius + 25) * Math.sin(angles[idx]),
  });
  return (
    <div
      className="radar-chart-container"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "30px 0",
        position: "relative",
      }}
    >
      <svg width={size} height={size}>
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((l, i) => (
          <polygon
            key={i}
            points={angles
              .map(
                (_, idx) =>
                  `${getPoint(l * 100, idx).x},${getPoint(l * 100, idx).y}`
              )
              .join(" ")}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        <polygon
          points={data
            .map(
              (d: any, i: number) =>
                `${getPoint(d.value, i).x},${getPoint(d.value, i).y}`
            )
            .join(" ")}
          fill="rgba(2, 132, 199, 0.25)"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <text
          x={center}
          y={center + 15}
          textAnchor="middle"
          fontSize="65"
          fontWeight="900"
          fill="rgba(2, 132, 199, 0.15)"
          style={{ pointerEvents: "none", fontFamily: "Georgia, serif" }}
        >
          {grade}
        </text>
        {data.map((d: any, i: number) => {
          const lp = getLabelPos(i);
          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y + 5}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#64748b"
            >
              {d.subject}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function ClassTab({ completedCourses, setCompletedCourses, goToProfile }: any) {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCourse]);

  const handleComplete = (courseTitle: string) => {
    if (completedCourses.indexOf(courseTitle) === -1) {
      setCompletedCourses([...completedCourses, courseTitle]);
    }
    setActiveCourse(null);
  };

  if (activeCourse) {
    const content =
      COURSE_CONTENTS[activeCourse] ||
      `
      <div style="text-align:center; padding: 40px 20px;">
        <h4 style="color:#64748b;">⏳ 강의 자료 업데이트 준비 중입니다.</h4>
        <p style="color:#94a3b8; font-size:13px;">이 강의의 상세 자료는 곧 제공될 예정입니다.</p>
      </div>
    `;

    return (
      <div className="class-container" style={{ paddingBottom: "100px" }}>
        <button
          onClick={() => setActiveCourse(null)}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "8px",
            color: "#475569",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          ← 목록으로 돌아가기
        </button>

        <h3
          style={{
            marginBottom: "20px",
            color: "#0f172a",
            fontSize: "1.3rem",
            lineHeight: "1.5",
          }}
        >
          {activeCourse}
        </h3>

        <div
          style={{
            background: "white",
            padding: "25px 20px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            lineHeight: "1.7",
            fontSize: "0.95rem",
            color: "#334155",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <button
          className="primary-btn mt-6"
          onClick={() => handleComplete(activeCourse)}
        >
          {completedCourses.indexOf(activeCourse) !== -1
            ? "✓ 이미 수강 완료했습니다 (목록으로)"
            : "학습 완료 및 체크하기"}
        </button>
      </div>
    );
  }

  const renderSection = (title: string, list: string[], color: string) => (
    <div className="course-section" style={{ marginBottom: "30px" }}>
      <h4
        style={{
          fontSize: "0.95rem",
          color: color,
          marginBottom: "15px",
          borderLeft: `4px solid ${color}`,
          paddingLeft: "10px",
        }}
      >
        {title}
      </h4>
      {list.map((c, i) => (
        <div
          key={i}
          className="course-item"
          style={{ background: "white", cursor: "pointer" }}
          onClick={() => setActiveCourse(c)}
        >
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              flex: 1,
              marginRight: "10px",
              color: "#1e293b",
            }}
          >
            {c}
          </span>
          <button
            className={`course-btn ${
              completedCourses.indexOf(c) !== -1 ? "btn-done" : ""
            }`}
            style={{ pointerEvents: "none" }}
          >
            {completedCourses.indexOf(c) !== -1 ? "복습" : "학습"}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="class-container" style={{ paddingBottom: "100px" }}>
      <h3 style={{ marginBottom: "25px" }}>실무 교육 커리큘럼</h3>
      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>
        * 강좌를 클릭하여 상세 자료를 학습하고 완료해 주세요.
      </p>

      {renderSection(
        "📗 [파트 1] 매니저 공통 기초",
        COURSES_LIST.common,
        "#0284c7"
      )}
      {renderSection(
        "🎬 [파트 2] 배우 매니저 실무",
        COURSES_LIST.actor,
        "#0891b2"
      )}
      {renderSection(
        "🎤 [파트 3] 가수 매니저 실무",
        COURSES_LIST.singer,
        "#4f46e5"
      )}

      <div
        style={{
          marginTop: "40px",
          borderTop: "2px dashed #cbd5e1",
          paddingTop: "30px",
          textAlign: "center",
        }}
      >
        <p
          style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "15px" }}
        >
          모든 과정을 이수하셨다면 수료증을 확인해보세요!
        </p>
        <button
          className="primary-btn"
          onClick={goToProfile}
          style={{ backgroundColor: "#0f172a" }}
        >
          📜 인증서 확인하기
        </button>
      </div>
    </div>
  );
}

function ProfileTab({
  testResult,
  userInfo,
  testDate,
  serialNo,
  checkCertConditions,
  goToTest,
}: any) {
  const { canGetCert, hasTested } = checkCertConditions();

  if (!canGetCert)
    return (
      <div
        className="placeholder-screen"
        style={{ padding: "80px 40px", textAlign: "center", color: "#64748b" }}
      >
        🔒 수료증이 잠겨있습니다.
        <br />
        <br />
        전체 실무 교육 (총 10개 강좌)을
        <br />
        모두 이수해야 발급이 가능합니다.
      </div>
    );

  // 🚨 [수정됨] 이름 위에 표시되는 타이틀을 검사 유무와 관계없이 무조건 공식 명칭으로 고정
  const displayType = "K-Ent Master Class 실무 교육 수료";
  const displayName = userInfo.name ? `${userInfo.name} 님` : "교육생 님";

  return (
    <div
      className="certificate-container"
      style={{ paddingBottom: "100px", textAlign: "center" }}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1cm;
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background-color: white; 
            margin: 0; padding: 0;
          }
          .app-header, .bottom-nav, .no-print { display: none !important; }
          .app-container, .app-main { 
            padding: 0 !important; 
            margin: 0 !important; 
            box-shadow: none !important; 
            background: transparent !important;
            height: auto !important; 
            overflow: visible !important; 
          }
          
          .cert-page-print {
            height: 270mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            page-break-after: always;
          }
          .cert-border-print { 
            width: 100%;
            height: 90%;
            border: 12px solid #0f172a !important; 
            outline: 2px solid #0f172a; 
            outline-offset: -18px; 
            border-radius: 0 !important; 
            box-shadow: none !important; 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 50px 30px !important;
            box-sizing: border-box;
          }

          .result-page-print {
            height: 270mm;
            page-break-before: always;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div id="print-area">
        {/* === [1페이지: 공식 인증서] === */}
        <div className="cert-page-print">
          <div
            className="certificate-card cert-border-print"
            style={{
              position: "relative",
              border: "8px solid #0f172a",
              padding: "40px 25px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                right: "10px",
                bottom: "10px",
                border: "1px solid #cbd5e1",
                pointerEvents: "none",
              }}
            ></div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#0f172a",
                  letterSpacing: "3px",
                  fontSize: "2.2rem",
                  marginTop: "10px",
                }}
              >
                CERTIFICATE
              </h2>

              <div style={{ margin: "50px 0" }}>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    color: "#0369a1",
                    marginBottom: "40px",
                    lineHeight: "1.5",
                  }}
                >
                  {displayType}
                </h3>
                <p style={{ fontSize: "1.6rem" }}>
                  <strong>{displayName}</strong>
                </p>
              </div>

              <p
                style={{
                  lineHeight: "2.0",
                  wordBreak: "keep-all",
                  padding: "0 20px",
                  fontSize: "1.15rem",
                  color: "#334155",
                }}
              >
                위 사람은 K-Ent Master Class에서 제공하는
                <br />
                모든 엔터테인먼트 실무 교육 과정을
                <br />
                성실히 이수하였기에 이 증서를 수여합니다.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                borderTop: "2px solid #e2e8f0",
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Serial No. KEMC-2026-{serialNo}
                </div>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "1rem",
                    color: "#64748b",
                  }}
                >
                  발급일: {testDate}
                </p>
              </div>

              <div
                style={{
                  width: "85px",
                  height: "85px",
                  border: "5px double #dc2626",
                  borderRadius: "50%",
                  color: "#dc2626",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "14px",
                  transform: "rotate(-15deg)",
                  letterSpacing: "1px",
                  fontFamily: "sans-serif",
                  opacity: "0.9",
                }}
              >
                <span style={{ marginBottom: "2px" }}>KEMC</span>
                <span style={{ fontSize: "9px" }}>OFFICIAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* === [2페이지: 역량검사 결과지] === */}
        {hasTested && (
          <div className="result-page-print" style={{ marginTop: "40px" }}>
            <div
              style={{
                padding: "40px 30px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                textAlign: "left",
                backgroundColor: "#fff",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  color: "#0f172a",
                  marginBottom: "15px",
                  fontSize: "1.6rem",
                }}
              >
                K-Ent Master Class 역량검사 결과지
              </h2>
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "1rem",
                  borderBottom: "2px solid #e2e8f0",
                  paddingBottom: "20px",
                  marginBottom: "30px",
                }}
              >
                성명: {userInfo.name} | 지원 직무: {userInfo.field}
              </p>

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "1.8rem",
                    color: "#0369a1",
                    margin: "15px 0",
                  }}
                >
                  {testResult.type}
                </h3>
                <p style={{ color: "#475569", fontSize: "1.1rem" }}>
                  {testResult.desc}
                </p>
              </div>

              <div style={{ transform: "scale(1.1)", margin: "40px 0" }}>
                <RadarChart data={testResult.radar} grade={testResult.grade} />
              </div>

              <div
                style={{
                  marginTop: "40px",
                  backgroundColor: "#f8fafc",
                  padding: "30px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h4
                  style={{
                    color: "#0f172a",
                    marginBottom: "20px",
                    fontSize: "1.2rem",
                  }}
                >
                  💡 실무 멘토링 리포트
                </h4>
                <div
                  style={{
                    color: "#334155",
                    lineHeight: "1.8",
                    fontSize: "1.05rem",
                  }}
                >
                  {getMentoringMessage(testResult, userInfo)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="no-print" style={{ marginTop: "20px" }}>
        <button
          className="primary-btn"
          onClick={() => window.print()}
          style={{
            backgroundColor: "#334155",
            padding: "14px",
            fontSize: "1rem",
          }}
        >
          {hasTested ? "📥 인증서 & 결과지 PDF 저장" : "📥 인증서 PDF 저장"}
        </button>

        {!hasTested && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#f0fdf4",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
              textAlign: "left",
            }}
          >
            <strong
              style={{
                color: "#166534",
                display: "block",
                marginBottom: "8px",
              }}
            >
              💡 아직 역량 검사를 진행하지 않으셨네요!
            </strong>
            <p
              style={{
                color: "#15803d",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                marginBottom: "15px",
              }}
            >
              60문항 진단을 통해 나의 강점과 취약점도 한눈에 분석해 드립니다.
            </p>
            <button
              onClick={goToTest}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              역량 검사 진행하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <div className={`nav-item ${isActive ? "active" : ""}`} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </div>
  );
}
