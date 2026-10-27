<!-- BEGIN ZUKU OFFICIAL BRAND -->
<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <a href="https://docs.zuzunza.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)"
        srcset="docs/branding/zuku-logo-dark.png">
      <img src="docs/branding/zuku-logo-light.png"
        alt="ZUKU" width="320">
    </picture>
  </a>
</p>
<p align="center">ZUKU - 내가 불러 일으키는 새로운 창작.</p>
<!-- markdownlint-enable MD033 MD041 -->
<!-- END ZUKU OFFICIAL BRAND -->

![version](https://img.shields.io/badge/version-v27.26102701-informational)

# ZUKU 개발자 사이트

| 항목 | 주소 |
| --- | --- |
| 공개 사이트 | <https://zukuapp.github.io/> |
| 개발 문서 | <https://zukuapp.github.io/docs/> |

## 개요

이 저장소는 Trecillo가 만드는 ZUKU의 공식 GitHub Pages 소스입니다. 현재 버전은 `v27.26102701`입니다.

- 첫 화면과 `/docs/`는 공개 도구, 파일 형식, API 계약을 안내하는 개발자 출발점입니다.
- 제품 소개는 `/platform/` 이하에 있습니다.
- 사이트는 HTML·CSS·JavaScript 정적 파일로 구성됩니다. 빌드 단계와 패키지 의존성이 없습니다.

| 경로 | 내용 |
| --- | --- |
| `/` | 개발자 첫 화면, 실행 가능한 입문 경로와 저장소 상태 |
| `/docs/` | ZWF2 5분 입문, 공개 저장소 지도, Jump·API·ZUKBOX 계약, 기여 경로 |
| `/technology/` | 공개 기술 계약의 탐색 입구 |
| `/technology/unprivileged/` | ZWF2 브라우저 실행 경계와 보장 범위 |
| `/technology/contracts/` | 형식·스키마·OpenAPI의 기준 문서 |
| `/technology/resources/` | 공개 명세가 보장하는 범위와 리소스 한도의 구분 |
| `/technology/standards/` | 공개 소스에 있는 형식과 표준 |
| `/platform/` 및 제품별 경로 | ZUKU 제품 소개와 체험 |
| `/company/`, `/contact/` | 회사와 문의 |
| `docs/index.md` | 이 저장소의 문서 작성·검증 안내 |

`/docs/`의 저장소별 명령과 형식은 각 저장소 README·스키마·명세로 연결됩니다. 공개 계약은 서비스 가용성이나 배포 상태를 보증하지 않습니다. ZWF2 HTML5 패키지와 ZUKBOX의 이전 ZWF1 바이너리는 같은 `.zwf` 확장자를 사용하지만 형식이 다릅니다.

## 요구 사항

- 로컬 확인: Python 3 (`http.server` 모듈)
- 웹 브라우저

## 사용법

### 로컬 확인

사이트는 루트 경로(`/`)를 사용합니다. `file://`로 열면 경로가 맞지 않으므로 로컬 서버에서 확인합니다.

1. 저장소 루트에서 정적 서버를 실행합니다.

   ```bash
   python3 -m http.server 8080
   ```

2. <http://localhost:8080/>과 <http://localhost:8080/docs/>를 엽니다.
3. 데스크톱과 모바일 화면 폭에서 레이아웃과 링크를 확인합니다.

### 발행

GitHub Pages는 `main` 브랜치의 루트를 발행합니다. `.nojekyll` 파일이 Jekyll 처리를 건너뜁니다.

## 브랜드

- ZUKU 문서 로고와 한영 사용 지침은 [공식 브랜드 안내](docs/branding/README.md)에 있습니다.
- 기존 회사 로고인 Trecillo 로고는 `assets/brand/trecillo/game-ci-20260919.png`에 보존합니다. [원본](https://trecillo.crevision.kr/assets/brand/game-ci.png?v=20260919)의 픽셀과 비율을 유지합니다.
- 한글 본문은 Pretendard, 영문 제목·레이블은 Inter를 사용합니다.

| 색 | 값 |
| --- | --- |
| ZUKU Hype | `#00BCF2` |
| ZUKU Swipe | `#FFD600` |
| ZUKU Jump | `#EC008C` |
| Trecillo 로고 분홍 | `#FF2D7A` |

## 변경 제안

- 오탈자·깨진 링크·상태 오류는 이 저장소의 이슈 또는 PR로 제보합니다.
- 명령과 형식의 변경은 해당 소스 저장소에서 먼저 반영하고, 이 사이트의 안내를 함께 갱신합니다.
- [공통 기여 안내](https://github.com/zukuapp/.github/blob/main/CONTRIBUTING.md)와 [보안 정책](https://github.com/zukuapp/.github/blob/main/SECURITY.md)을 따릅니다.

## 변경 이력

[CHANGELOG.md](CHANGELOG.md)에 있습니다.

© 2026 Trecillo.
