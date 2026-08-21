# zukuapp.github.io

**Tresillo × ZUKU** 기업 소개 사이트. GitHub Pages로 발행되는 정적 사이트입니다.

- 공개 주소: <https://zukuapp.github.io/>
- 서비스: <https://zuzunza.com>
- 조직: [github.com/zukuapp](https://github.com/zukuapp)

## 구성

| 경로 | 역할 |
|---|---|
| `index.html` | 단일 페이지 랜딩 (Hero · Platform · Technology · Company · Contact) |
| `styles.css` | 디자인 토큰 및 레이아웃. ZUKU 디자인 시스템 팔레트를 따름 |
| `script.js` | 스크롤 리빌, 스티키 헤더. 의존성 없음 |
| `assets/` | 브랜드 마크 · 파비콘 · OG 카드 |
| `404.html` | 404 페이지 |
| `robots.txt`, `sitemap.xml` | 크롤링 · 색인 |
| `.nojekyll` | Jekyll 빌드 파이프라인 비활성화 (정적 파일 그대로 서빙) |

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
