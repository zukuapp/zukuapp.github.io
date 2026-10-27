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

- 기술 설명의 근거는 공개 저장소의 실제 코드·스키마·명세입니다.
- `zwf`는 로컬 ZWF2 컴파일러입니다.
- `zukujs-cli`의 소스 구현과 GUI·서비스·릴리스 검증은 각각 별도 증거로 판단합니다.
- `zuku-api`의 OpenAPI는 계약이고 SDK는 골격입니다. 운영 서비스나 npm 배포 여부는 근거 없이 추정해 쓰지 않습니다.
- ZWF2 HTML5와 ZUKBOX ZWF1은 같은 `.zwf` 확장자를 공유하지만 다른 포맷입니다.
- 게임 실행 경계는 ZWF2 명세에 따릅니다. CPU·메모리·PID 한도는 브라우저 격리의 보장으로 표현하지 않습니다.

## 브랜드와 스택

- 공식 표기: Trecillo(트레실로), ZUKU.
- ZUKU 로고는 승인된 `ZUKU_Logo_Assets.zip`의 원본 PNG와 해시·종횡비·투명도를 유지합니다. `docs/branding/README.md`를 따릅니다. 회사 로고와 상류 저작권은 별도로 보존합니다.
- 글꼴: 한글 본문 Pretendard, 영문 제목 Inter.
- 색: Hype `#00BCF2`, Swipe `#FFD600`, Jump `#EC008C`.
- 빌드 단계와 패키지 의존성이 없는 HTML/CSS/JS 정적 사이트입니다.

## 확인

1. 저장소 루트에서 정적 서버를 실행합니다.

   ```bash
   python3 -m http.server 8080
   ```

2. `/`, `/docs/`, `/technology/`와 모바일 화면을 확인합니다.
3. 내부 링크, 외부 명세 URL, 키보드 탐색과 포커스 상태를 검사합니다.

`main` 루트가 GitHub Pages 발행 소스입니다. `.nojekyll`이 Jekyll 처리를 건너뜁니다.

## 버전

사이트 버전은 `v27.26102701`입니다. 각 페이지 푸터와 `README.md` 배지, `CHANGELOG.md`에 같은 값을 표기합니다.
