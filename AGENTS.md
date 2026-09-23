# zukuapp.github.io — 공식 개발 문서와 제품 소개 사이트

## 목적

`https://zukuapp.github.io/`는 Trecillo × ZUKU의 공식 정적 GitHub Pages 사이트입니다. 첫 화면과 `/docs/`는 개발자 출발점이며, 기존 `/platform/`과 제품별 페이지는 제품 소개로 유지합니다.

## 구조

- `index.html`: 개발자 중심 첫 화면
- `docs/index.html`: 실행 가능한 ZWF2 입문, 공개 저장소/계약/상태 지도
- `docs/index.md`: 문서 작성 및 검증 안내
- `technology/**/index.html`: 공개 명세에 근거한 주제별 설명
- `platform/`, `hype/`, `swipe/`, `jump/`, `thread/`, `vive/`, `vine/`, `aist/`: 제품 소개와 체험
- `company/`, `contact/`: 회사와 문의
- `styles.css`: 공통·제품 페이지 스타일
- `docs.css`: 개발 문서 페이지 스타일
- `assets/brand/trecillo/game-ci-20260919.png`: 현행 Trecillo 로고 원본 사본

## 정확성

- 기술 설명은 공개 저장소의 실제 코드·스키마·명세로 뒷받침하세요.
- `zwf`는 실행 가능한 로컬 ZWF2 컴파일러입니다. `zuku-cli`의 create/validate/package/upload는 현재 미구현입니다.
- `zuku-api`의 OpenAPI는 계약이고 SDK는 골격입니다. 운영 서비스나 npm 배포를 추정하지 마세요.
- ZWF2 HTML5와 ZUKBOX ZWF1은 같은 `.zwf` 확장자를 공유하지만 다른 포맷입니다.
- 게임 실행 경계는 ZWF2 명세에 따릅니다. CPU·메모리·PID 한도를 브라우저 격리의 보장으로 표현하지 마세요.

## 브랜드와 스택

- 공식 표기: Trecillo(트레실로), ZUKU(즈쿠).
- 로고는 `game-ci-20260919.png`의 픽셀·종횡비·검정 배경을 유지합니다.
- 한글 본문 Pretendard, 영문 제목 Inter. Hype `#00BCF2`, Swipe `#FFD600`, Jump `#EC008C`.
- 빌드 단계와 패키지 의존성이 없는 HTML/CSS/JS 정적 사이트입니다.

## 확인

`python3 -m http.server 8080`으로 `/`, `/docs/`, `/technology/`와 모바일 화면을 확인하세요. 내부 링크와 외부 명세 URL, 접근 가능한 탐색/포커스 상태를 검사하세요. `main` 루트가 GitHub Pages 발행 소스이며 `.nojekyll`이 있습니다.
