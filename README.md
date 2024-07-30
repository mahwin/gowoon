# gowoon

## 학습할 내용

- zod 패키지
- zustand 사용법
- next server action의 의미
- tailwind-css에서 다크 모드 구현하는 방법

## 요구사항

[] next.js의 app router 기반한 페이지 라우팅
[] zustand를 이용한 상태 관리
[] zod를 이용하여 사용자의 입력 값 검증
[] Next Server Action과 Prisma를 이용한 데이터 저장
[] SEO를 고려한 메타 태그
[] Next.js의 다양한 렌더링 방식을 적절히 활용하여 각 페이지 구현
[] 북마크 목록을 조회할 수 있는 페이지들에서 무한 스크롤 또는 페이지네이션을 구현하여 대량의 데이터를 효율적으로 로드.

## 구현

### 다크모드 구현

1. 최초 접속 시에 사용자의 기본 설정을 따르되 사용자가 재방문 했다면 해당 값을 localStorage에 저장하여 사용자가 설정한 값을 따른다.

### 페이지 네이션

1.  한 페이지에 몇 개의 리스트가 보여야 하는지를 api를 요청할 때 포함하여 요청한다.
    - api/currentPage?page=1&size=10 이런 식으로 요청한다.
2.  해당 데이터와 db 데이터를 바탕으로 총 몇 개의 페이지가 필요한지 계산해서 보내준다.
    - lastPage: Math.ceil(data.length / size)
3.  이를 바탕으로 페이지 네이션을 구현한다.
4.  넘겨 받은 데이터를 바탕으로 리스트를 렌더링한다.
5.  페이지는 1부터 시작해서 양 옆으로 2개씩 보여준다.
    - 1페이지면 1,2,3 / 3페이지면 1,2,3,4,5

### 공통 컴포넌트 묶어내기

- 북마크 생성 페이지와 북마크 편집 페이지, 상세 페이지의 BookMarkForm 을 flag를 통해 구분하여 사용한다.

### 서버 사이드 렌더링 시에 주의할 점

- 서버 사이드 렌더링 시에는 url에 접근할 수 없기 때문에 getServersideProps에서 접근한 후에 일정 규칙을 준수하지 못하면 redirect 한다.

### zustand를 이용한 상태 관리

1. 관리해야 할 상태값은 무엇일까?

=> 다크모드는 localStorage에 저장하는 것이 더 낫다.
=> 페이지네이션 관련된 정보도 update, delete의 과정에서 달라질 수 있기 때문에 현재 몇 번의 페이지에 있었다 정도의 데이터만 저장하고 매번 새로운 데이터를 받아야한다.

### 스택틱 페이지

- 동적으로 변하지 않는 페이지는 북마크 추가 페이지 밖에 없어서 따로 스태틱 페이지를 만들 필요는 없어 보임.

## 실행 방법

pnpm install;
pnpm dev;

.env에 DATABASE_URL를 로컬 환경에 맞게 설정해주세요.

npx prisma migrate dev;
npx prisma generate;
npx prisma db push;

GET /api/db/category
GET /api/db/bookmark => 모든 카테고리의 데이터가 하나씩 늘어납니다.
