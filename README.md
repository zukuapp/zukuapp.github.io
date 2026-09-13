# zukuapp.github.io

<div align="center">

![ZUKU mark](/assets/zuku-mark.svg)

# Tresillo × ZUKU

**Create what moves next.**

</div>

> **공개 주소**: <https://zukuapp.github.io/>  
> **서비스**: <https://zuzunza.com>  
> **조직**: <https://github.com/zukuapp>  
> **문의**: contact@crevision.kr

ZUKU(즈쿠) 기업 소개 사이트 저장소입니다. GitHub Pages로 정적으로 발행됩니다. 의존성이 없는 HTML/CSS/JS만 사용합니다.

## 구성

| 경로 | 역할 |
|---|---|
| `/` | 허브. Hype / Swipe / Jump 인터랙티브 체험 무대 + 제품·회사·기술 입구 |
| `/platform/` | Thread · Hype · Swipe · Jump · Jump Studio · Vive · Vine · Aist 제품 지도 |
| `/hype/` | 가로 롱폼 + 인터랙티브 상세 |
| `/swipe/` | 세로 숏폼 상세 |
| `/jump/` | WASM/HTML5 게임 허브 |
| `/jump/studio/` | Jump Studio 배급 파이프라인 |
| `/thread/` | 통합 홈 · 미리보기 광장 |
| `/vive/` | 글 · 문학 · 연재 |
| `/vine/` | 음악 · 보이스 · 공유 |
| `/aist/` | AI로 게임을 만드는 웹 스튜디오 |
| `/technology/` | 기술 개요 + 안전한 경계 · 명확한 제품 규칙 · 리소스 한도 · 공개 표준 우선 |
| `/company/` | 회사 소개 |
| `/contact/` | 문의 |
| `/docs/index.md` | 사이트 자체 가이드 |

## 정적 자산

| 파일 | 용도 |
|---|---|
| `styles.css` | 토큰 · 레이아웃 · 애니메이션 · 인터랙션 |
| `script.js` | 체험 무대 탭/스크러브/포인터 인터랙션 |
| `assets/favicon.svg` | 파비콘 |
| `assets/zuku-mark.svg` | 브랜드 마크 |
| `assets/og-card.png` | OG/Twitter 카드 |

## 로컬 확인

빌드 단계가 없습니다. 정적 서버로 열어 확인합니다.

```bash
python -m http.server 8080
# http://localhost:8080
```

## 브랜드 표기

- 플랫폼: **ZUKU (즈쿠)**
- 회사: **Tresillo (트레실로)**
- 조직 접두사: `zuku-`
- GitHub 조직: `zukuapp`

## 배포

`main` 브랜치 루트로 GitHub Pages 발행. `.nojekyll`로 Jekyll 처리를 비활성화했습니다.

---

© 2026 Tresillo. All rights reserved.
