# 💭 mol.ip
아이디어를 기록하는 가장 효과적인 방법

## 이정표
### 오늘의 이정표
- [ ] 에디터 까리하게 CSS 칠하기
- [ ] 서버 레이아웃 짜기

### 지나간 이정표
- [x] 저장 메소드 간단 구현
- [x] 제목 4 태그 추가
- [x] placeholder 보완
- [x] placeholder 만들기

### 미래의 이정표
- 시스템
    - [ ] 서버에 저장 기능
    - [ ] 검색 기능
    - [ ] Git Style 저장 히스토리
    - [ ] 폴더 기능
- 에디터
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
    - [ ] 드래그 앤 드롭을 통한 블럭 순서 변경
    - [ ] 인라인 중간에서 Enter 눌렀을 시 뒷부분 블럭 분리
    - [ ] 인라인 선택 후 서식 기능
    - [ ] 읽기 모드 (선택 후 깜빡이는 거 잠그기)
    - [ ] 사이드바 닫는 기능
    - [ ] 화살표 위 아래 키를 통한 블럭 이동

### 수정해야 할 버그 & 추가해야할 자잘한 기능
- [ ] 없는 태그 입력 시 오류 뿜는 버그
    - [ ] 그냥 /만 입력하고 싶어서 /치고 계속 타이핑 한 후 블럭 바꾸면 오류남
- [ ] 미입력 상태에서 저장하려고 ctrl S 누르면 html 저장이 뜨는 버그

- [ ] 태그 Selector 위치가 잘못 나옴. Caret에 정확하기 맞추기

- [ ] 제목을 중간 정렬, 심볼 장식 추가

- [ ] 문장 중간에서 Enter 눌렀을 때 그 이전 문장들 새로 생기는 다음 블럭으로 옮겨주는 기능 안 됨
- [ ] 문장 앞에서 Backspace키 눌렀을 때 전 블럭과 병합되는 기능 안 됨

- [ ] 스크롤이 에디터 뿐 아니라 메뉴바에도 적용
- [ ] 스크롤시 위쪽 namespace는 따라오도록 구현

- [ ] 제목없음 버그? 빈블럭 위 문장에서 enter 누를 시, 빈 블럭을 남겨둔 채로 새로고침 할 시
- [ ] 블럭 사이사이에 pointer가 바뀌는 버그

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