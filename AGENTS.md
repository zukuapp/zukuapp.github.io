# zukuapp.github.io — 기업 소개 정적 사이트 (GitHub Pages)

## 목적
**Tresillo × ZUKU** 기업 소개 사이트. GitHub Pages로 발행되는 완전 정적 사이트.  
공개 주소: `https://zukuapp.github.io/` · 서비스: `https://zuzunza.com`

## 스택
- **빌드 단계 없음** — HTML/CSS/JS 정적 파일만
- 의존성 0 — `styles.css`, `script.js`만 사용
- 폰트: IBM Plex Mono, Syne, Pretendard (Google Fonts / jsDelivr CDN)
- `.nojekyll`로 Jekyll 비활성화

## 구조
```
index.html              # 허브 — Hype/Swipe/Jump 3종 인터랙티브 스테이지
platform/index.html     # 제품 표면 지도
hype/index.html         # Hype 상세 + 데모
swipe/index.html        # Swipe 상세 + 데모
jump/index.html         # Jump 상세
jump/studio/index.html  # Jump Studio 배급 파이프라인
thread/index.html       # Thread(통합 홈) 진입
vive/index.html         # Vive(글/문학)
vine/index.html         # Vine(음악/보이스)
aist/index.html         # Aist(AI 게임 스튜디오)
technology/
  index.html            # 기술 개요
  unprivileged/index.html  # 안전한 실행 경계
  contracts/index.html     # 명확한 제품 규칙
  resources/index.html     # 리소스 한도
  standards/index.html     # 공개 표준 우선
company/index.html      # 회사 소개
contact/index.html      # 문의
assets/
  favicon.svg / zuku-mark.svg / og-card.png
styles.css              # 토큰·레이아웃·애니메이션·인터랙션
script.js               # 스테이지 탭/스크러브/포인터 인터랙션
robots.txt / sitemap.xml / .nojekyll
```

## 미디어 3종 (인터랙티브 데모)
| 경로 | 내용 |
|------|------|
| `/` (hero) | Hype(시네마틱 3신), Swipe(세로 피드 4클립), Jump(미니 게임) 탭 전환 |
| `/hype/` | Hype 전용 상세 |
| `/swipe/` | Swipe 전용 상세 |
| `/jump/` | Jump 허브 + Studio 링크 |

## 로컬 확인
빌드 불필요. 정적 서버로 열기:
```bash
python -m http.server 8080
# http://localhost:8080
```
또는 `npx serve` 등 어떤 정적 서버든 가능.

## 배포
GitHub Pages 설정: `main` 브랜치 `/` (root) → `https://zukuapp.github.io/`  
`.nojekyll` 존재로 Jekyll 처리 생략. `main` 푸시 시 자동 발행.

## 브랜드 표기
- 플랫폼: **ZUKU (즈쿠)**
- 회사: **Tresillo (트레실로)**
- 조직 접두사: `zuku-` · GitHub 조직: `zukuapp`
- "시즈쿠" 표기 금지

## 문의
`contact@crevision.kr` · Seoul, Korea

## 라이선스
© 2026 Tresillo. All rights reserved.