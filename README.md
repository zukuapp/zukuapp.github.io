<p align="center">
  <a href="https://zukuapp.github.io/docs/"><img src="https://raw.githubusercontent.com/zukuapp/.github/main/profile/assets/developer-hero.png" alt="Trecillo · ZUKU 개발자 문서" width="760"></a>
</p>

# ZUKU 개발자 사이트

**공개 사이트:** <https://zukuapp.github.io/> · **개발 문서:** <https://zukuapp.github.io/docs/>

Trecillo가 만드는 ZUKU의 공식 GitHub Pages 저장소입니다. 첫 화면과 `/docs/`는 공개 도구, 파일 형식, API 계약을 찾는 개발자 출발점입니다. 제품 소개는 `/platform/` 이하에 유지합니다. 이 사이트는 HTML·CSS·JavaScript 정적 파일로 구성되며 빌드나 패키지 설치가 필요하지 않습니다.

## 문서 구조

| 경로 | 내용 |
| --- | --- |
| `/` | 개발자 첫 화면, 실행 가능한 입문 경로와 저장소 상태 |
| `/docs/` | ZWF2 5분 입문, 공개 저장소 지도, Jump·API·ZUKBOX 계약, 기여 경로 |
| `/technology/` | 공개 기술 계약의 탐색 입구 |
| `/technology/unprivileged/` | ZWF2 브라우저 실행 경계와 보장 범위 |
| `/technology/contracts/` | 형식·스키마·OpenAPI의 기준 문서 |
| `/technology/resources/` | 공개 명세가 보장하는 범위와 리소스 한도의 구분 |
| `/technology/standards/` | 공개 소스에서 확인할 수 있는 형식과 표준 |
| `/platform/` 및 제품별 경로 | ZUKU 제품 소개와 체험 |
| `/company/`, `/contact/` | 회사와 문의 |
| `docs/index.md` | 이 저장소의 문서 작성·검증 안내 |

`/docs/`의 저장소별 명령과 형식은 각 저장소 README·스키마·명세로 연결됩니다. 서비스 가용성이나 배포 상태를 공개 계약만으로 보증하지 않습니다. **ZWF2 HTML5 패키지**와 ZUKBOX의 이전 **ZWF1 바이너리**는 같은 `.zwf` 확장자를 사용해도 형식이 다릅니다.

## 로컬 확인

```bash
python3 -m http.server 8080
```

<http://localhost:8080/>과 <http://localhost:8080/docs/>를 열어 데스크톱·모바일에서 확인합니다. 루트 경로를 사용하는 정적 사이트이므로 `file://` 대신 서버에서 확인하세요. `main` 브랜치의 루트를 GitHub Pages로 발행하며 `.nojekyll`이 있습니다.

## 브랜드

현행 Trecillo 로고는 `assets/brand/trecillo/game-ci-20260919.png`에 보존했습니다. [원본](https://trecillo.crevision.kr/assets/brand/game-ci.png?v=20260919)의 픽셀과 비율을 유지합니다. 한글 본문은 Pretendard, 영문 제목·레이블은 Inter를 사용합니다. ZUKU의 색은 Hype `#00BCF2`, Swipe `#FFD600`, Jump `#EC008C`이고 Trecillo 로고 분홍은 `#FF2D7A`입니다.

## 변경 제안

오탈자·깨진 링크·상태 오류는 이 저장소의 이슈 또는 PR로 알려 주세요. 명령과 형식에 대한 변경은 해당 소스 저장소에서 먼저 확인하고, 사이트의 안내를 함께 갱신해 주세요. [공통 기여 안내](https://github.com/zukuapp/.github/blob/main/CONTRIBUTING.md)와 [보안 정책](https://github.com/zukuapp/.github/blob/main/SECURITY.md)을 따릅니다.

© 2026 Trecillo.
