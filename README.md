# 💭 molip

> 아이디어를 기록하는 가장 효과적인 방법

> The most effective way to save ideas

## ⛳️ 이정표

### 오늘의 이정표
- [ ] 폴더 제목 설정창 구현
- [ ] UI 최종 손보기

### 타임라인
#### 23.11.28
- [x] Title Header 보완
#### 23.11.27
- [x] Document Tree 구현
#### 23.11.25
- [x] ✨ DELETE를 통한 게시물 삭제 기능
- [x] ✨ CRUD 완성
#### 23.11.24
- [x] ✨ POST를 통한 새 게시물 추가 기능
- [x] ✨ 폴더 기능
#### 23.11.22
- [x] ✨ PUT을 통한 게시물 저장 기능
#### 23.11.21
- [x] ✨ MongoDB 설정, FE와 연결, GET을 통한 게시물 열람 기능
- [x] ✨ 제목을 중간 정렬, 심볼 장식 추가
#### 23.11.20
- [x] ✨ 서버 레이아웃 설계
- [x] 🐛 blur 상태에서 ctrl + S 누르면 html 저장창이 뜨는 버그
- [x] 🐛 / 입력 후, 일반 텍스트 입력 시, 없는 태그로 인한 버그
- [x] 🐛 placeholder "제목없음"이 적절하지 않게 뜨는 버그 :: 빈블럭 위 문장에서 enter 누를 시, 빈 블럭을 남겨둔 채로 새로고침 할 시
- [x] 🐛 placeholder "/를 눌러 태그 변경"이 적절하지 않게 뜨는 버그
#### 23.11.17
- [x] 🐛 savePageHandler가 불필요하게 여러번 호출되는 버그
- [x] 🐛 스크롤이 메뉴바에도 적용되는 버그
#### 23.11.16
- [x] ✨ 에디터 UI CSS
- [x] 🐛 블럭 사이사이에 pointer가 바뀌는 버그
#### 23.11.14
- [x] ✨ placeholder 만들기
- [x] 🐛 스크롤이 namespace에도 적용되는 버그
#### 23.11.10
- [x] ✨ 저장 메소드 localstorage로 임시 구현
- [x] ✨ 제목 4 태그 추가

### 미래의 이정표
- 전체
    - [ ] 검색 기능
    - [ ] Git Style 저장 히스토리
    - [ ] 다크모드 지원
    - [ ] 폴더 / 파일 접기 모드
- 에디터 관련
    - [ ] 어디에 저장해야할지 모르겠다면, 백지에 입력해보세요! < Editor Landing Page
    - [ ] 스크롤 올리면 타이틀이 반응형으로 Header style 제목으로 변경
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
    - [ ] 인라인 처음에서 BackSpace 눌렀을 시 앞 블럭과 병합
    - [ ] 인라인 선택 후 서식 기능
    - [ ] 읽기 모드 (선택 후 깜빡이는 거 잠그기)
    - [ ] 사이드바 닫는 기능
    - [ ] 화살표 위 아래 키를 통한 블럭 이동
    - [ ] 목차 구현

### 🐛 수정해야 할 버그
- [ ] /를 입력한 상태에서 enter로 블럭을 바꾸려하는 상황 대응
- [ ] Tag Selector Position 오류. 현재 Caret에 정확하기 대응