# 💭 mol.ip
아이디어를 기록하는 가장 효과적인 방법

## 이정표
### 오늘의 이정표

### 지나간 이정표
- [x] placeholder 만들기
- [x] 저장 메소드 간단 구현
- [x] 제목 4 태그 추가

### 미래의 이정표
- [ ] 서버에 저장 기능
- [ ] 검색 기능
- [ ] Git Style 저장 히스토리
- [ ] 태그 추가
    - [ ] 이미지
    - [ ] 하위 페이지
    - [ ] To-do 리스트
    - [ ] 표
    - [ ] 글머리 기호 (-)
    - [ ] 번호 매기기 (1.)
    - [ ] 토글 목록
    - [ ] 인용문
    - [ ] 구분선
    - [ ] 링크
        - [ ] 외부 URL
            - [ ] 시각적 북마크
        - [ ] 다른 페이지
    - [ ] 콜아웃
    - [ ] 동영상
    - [ ] 코드
    - [ ] 오디오
    - [ ] 파일
    - [ ] 수학 공식
- [ ] 폴더 기능

### 수정해야 할 버그
- [ ] 없는 태그 입력 시 오류 뿜는 버그
- [ ] 미입력 상태에서 저장하려고 ctrl S 누르면 html 저장이 뜨는 버그

## 대충 UI 계획

- 좌측 사이드 바
    - Main Bar (메인 바에서 선택한 기능이 Sub Bar에 표시됨)
        - mol.ip 프로덕트 로고 (비활성, 버튼 아님)
        - Document Tree
            - switch to Node Graph (Beta)
            - 즐겨찾기
            - 전체 페이지 트리
        - 검색 기능
            - 전체 문서에서 찾기, 현 문서에서 찾기
        - 업데이트 히스토리 열람 기능 (Git Style)
            - 깃허브 커밋 히스토리처럼 볼 수 있음
    - Sub Bar
- 메인 페이지
    - 현재 페이지 이름 & 저장 상태 표시
    - 에디터
- 우측 사이드
    - 프로필 설정
    - 환경 설정
    - 도움말, 고객지원 (우측 하단 버튼)