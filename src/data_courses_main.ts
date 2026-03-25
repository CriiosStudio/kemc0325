// data_courses_main.ts

// 1. 개별 강의 데이터 모두 불러오기
// --- [공통 C 파트] ---
import { course_C01 } from "./courses/course_C01";
import { course_C02 } from "./courses/course_C02";
import { course_C03 } from "./courses/course_C03";
import { course_C04 } from "./courses/course_C04";

// --- [배우 A 파트] ---
import { course_A01 } from "./courses/course_A01";
import { course_A02 } from "./courses/course_A02";
import { course_A03 } from "./courses/course_A03";

// --- [가수 S 파트] ---
import { course_S01 } from "./courses/course_S01";
import { course_S02 } from "./courses/course_S02";
import { course_S03 } from "./courses/course_S03";

// 2. 전체 커리큘럼 리스트 구조
export const COURSES_LIST = {
  common: [
    "제1강: 매니저란 무엇인가? (역사와 정의)",
    "제2강: 매니저의 단계와 역할 (로드매니저부터 대표까지)",
    "제3강: 기초 법률, 윤리, 성교육 (꼭 알아야 할 기본 상식)",
    "제4강: 아티스트 현장 케어의 기초 (소통과 마음가짐)",
  ],
  actor: [
    "제5강: 배우 매니저가 현장에서 하는 일 (현장 도착부터 철수까지)",
    "제6강: 드라마·영화 촬영장 매너와 에티켓 (현장 스태프와 소통법)",
    "제7강: 촬영 대기실과 현장 체크리스트 (의상, 대본, 컨디션 관리)",
  ],
  singer: [
    "제8강: 가수 매니저가 현장에서 하는 일 (음악 방송과 공연 현장)",
    "제9강: 방송국 대기실과 무대 뒤에서의 수칙 (음방 타임테이블 이해)",
    "제10강: 행사와 팬들이 모이는 곳에서의 안전 관리 (이동 동선과 현장 통제)",
  ],
};

// 3. 강의명과 실제 내용 완벽 맵핑
export const COURSE_CONTENTS: Record<string, string> = {
  // 공통
  "제1강: 매니저란 무엇인가? (역사와 정의)": course_C01,
  "제2강: 매니저의 단계와 역할 (로드매니저부터 대표까지)": course_C02,
  "제3강: 기초 법률, 윤리, 성교육 (꼭 알아야 할 기본 상식)": course_C03,
  "제4강: 아티스트 현장 케어의 기초 (소통과 마음가짐)": course_C04,

  // 배우
  "제5강: 배우 매니저가 현장에서 하는 일 (현장 도착부터 철수까지)": course_A01,
  "제6강: 드라마·영화 촬영장 매너와 에티켓 (현장 스태프와 소통법)": course_A02,
  "제7강: 촬영 대기실과 현장 체크리스트 (의상, 대본, 컨디션 관리)": course_A03,

  // 가수
  "제8강: 가수 매니저가 현장에서 하는 일 (음악 방송과 공연 현장)": course_S01,
  "제9강: 방송국 대기실과 무대 뒤에서의 수칙 (음방 타임테이블 이해)":
    course_S02,
  "제10강: 행사와 팬들이 모이는 곳에서의 안전 관리 (이동 동선과 현장 통제)":
    course_S03,
};
