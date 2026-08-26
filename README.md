# zukuapp.github.io

**Tresillo × ZUKU** 기업 소개 사이트. GitHub Pages로 발행되는 정적 사이트입니다.

- 공개 주소: <https://zukuapp.github.io/>
- 서비스: <https://zuzunza.com>
- 조직: [github.com/zukuapp](https://github.com/zukuapp)
- 문의: contact@crevision.kr

## 구성

| 경로 | 역할 |
|---|---|
| `/` | 허브. Hype/Swipe/Jump 체험 무대 + 상세 페이지 입구 |
| `/platform/` | 제품 표면 지도 |
| `/hype/` `/swipe/` `/jump/` | 미디어 3종 상세 + 인터랙티브 데모 |
| `/jump/studio/` | Jump Studio 배급 파이프라인 |
| `/thread/` `/vive/` `/vine/` `/aist/` | 나머지 제품 표면 |
| `/technology/` | 기술 개요와 4개 계약 페이지 |
| `/company/` `/contact/` | 회사 · 문의 |
| `styles.css` / `script.js` | 토큰·레이아웃·인터랙션. 의존성 없음 |
| `assets/` | 브랜드 마크 · 파비콘 · OG 카드 |
| `404.html` | 404 |
| `robots.txt`, `sitemap.xml` | 크롤링 · 색인 |
| `.nojekyll` | Jekyll 비활성 |

## 미디어 3종

- **Hype** — 인터랙티브 롱폼 · 가로형 영상 · 사진
- **Swipe** — 세로형 숏폼 영상
- **Jump** — WASM/HTML5 게임

## 로컬 확인

빌드 단계가 없습니다. 정적 서버로 열어 확인합니다.

```bash
python -m http.server 8080
# http://localhost:8080
```

## 브랜드 표기

- 브랜드: **ZUKU (즈쿠)** · 회사: **Tresillo (트레실로)**
- 조직 접두사: `zuku-` · GitHub 조직: `zukuapp`

---

© 2026 Tresillo. All rights reserved.
