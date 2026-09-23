# 사이트 문서 작성 안내

이 저장소의 렌더링되는 개발 문서 입구는 [`/docs/index.html`](index.html)입니다. 이 Markdown 파일은 사이트 소스 작업자를 위한 안내입니다. 오래된 목차에 나열됐던 `site-structure.md` 등 존재하지 않는 파일은 더 이상 참조하지 않습니다.

## 독자 경로

1. `/`: 개발자 중심 첫 화면. 실행 가능한 ZWF2 경로와 공개 계약·시제품 상태를 구분합니다.
2. `/docs/`: ZWF2 5분 입문, 11개 공개 저장소의 역할, Jump·API·ZUKBOX 계약과 기여 경로를 안내합니다.
3. `/technology/`: 기술과 형식의 주제별 문서를 제공합니다. 공개 명세가 확인하지 못하는 자원 한도나 배포 상태는 주장하지 않습니다.
4. 각 저장소 README·스키마·명세: 정확한 명령, 버전, 데이터 형식의 기준입니다.

`/platform/`, `/hype/`, `/swipe/`, `/jump/` 등의 경로는 제품 소개와 체험을 위해 유지합니다.

## 사실 확인 규칙

- `zwf`의 로컬 컴파일·검사는 실제 명령으로 재현한 뒤 설명합니다. npm 게시를 주장하지 않습니다.
- `zuku-cli`의 현재 명령은 미구현 시제품입니다. 성공 문구를 실제 결과로 안내하지 않습니다.
- `zuku-api`는 OpenAPI 계약과 SDK 소스 골격입니다. 운영 API나 공개 npm 패키지가 있다고 쓰지 않습니다.
- ZWF2 HTML5와 ZUKBOX ZWF1을 같은 포맷으로 취급하지 않습니다.
- 원본 Next2D 포크의 저작권·라이선스와 기술 문서를 보존하고 ZUKU 변경점은 해당 README에 설명합니다.

## 파일과 자산

- `index.html`, `docs/index.html`: 개발자 첫 화면과 문서 허브
- `technology/**/index.html`: 주제별 공개 계약 문서
- `styles.css`: 기존 제품 페이지의 공통 스타일과 헤더
- `docs.css`: 새 개발 문서 페이지 스타일
- `assets/brand/trecillo/game-ci-20260919.png`: 현행 Trecillo 로고 사본
- `sitemap.xml`: 공개 HTML 경로

한글 본문은 Pretendard, 영문 제목은 Inter를 사용합니다. 로고의 종횡비와 검정 배경을 유지하세요. 최신 브랜드 근거는 [조직 브랜드 안내](https://github.com/zukuapp/.github/blob/main/docs/brand.md)에 있습니다.

## 확인과 게시

```bash
python3 -m http.server 8080
```

로컬에서 `/`, `/docs/`, `/technology/`와 모바일 화면을 확인하고, 내부 경로 및 GitHub 문서 링크를 검사합니다. `main` 루트가 GitHub Pages의 발행 소스이며 `.nojekyll`로 Jekyll 처리를 건너뜁니다. 발행 후 공개 URL에서 새 페이지와 링크를 다시 확인합니다.
