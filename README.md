# gowoon

## 학습할 내용

- zod 패키지
- zustand 사용법
- next server action의 의미
- tailwind-css에서 다크 모드 구현하는 방법

## 요구사항

[x] next.js의 app router 기반한 페이지 라우팅
[x] zustand를 이용한 상태 관리
[x] zod를 이용하여 사용자의 입력 값 검증
[x] Next Server Action과 Prisma를 이용한 데이터 저장
[x] SEO를 고려한 메타 태그
[x] Next.js의 다양한 렌더링 방식을 적절히 활용하여 각 페이지 구현
[x] 북마크 목록을 조회할 수 있는 페이지들에서 무한 스크롤 또는 페이지네이션을 구현하여 대량의 데이터를 효율적으로 로드.

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

### SEO 관련 생각

- SEO가 긁어갈 만한 내용은 메인 페이지나 category/북마크 페이지 뿐이다. \_app애서 meta 태그를 설정해주면 충분할 것 같다.
- SEO를 고려한다면 서버사이드 렌더링시에 bookmark 관련된 정보를 fetch하고 Props로 내려주는 것이 더 좋지만, 시간 부족으로 Pass.

## 실행 방법

pnpm install;
pnpm dev;

.env에 DATABASE_URL를 로컬 환경에 맞게 설정해주세요.

npx prisma migrate dev;
npx prisma generate;
npx prisma db push;

GET /api/db/category
GET /api/db/bookmark => 모든 카테고리의 데이터가 하나씩 늘어납니다.

### 추가로 구현할 내용

- SEO가 좋아할 만한 데이터를 getServerSideProps에서 가져와서 props로 내려주기
  - 메인 페이지, 카테고리 페이지
- tailwind-css를 좀 더 잘 사용하기
  - 같은 string을 묶어서 사용하는 방법이 없을까?
- 현재는 api와 페이지 디렉토리 구조가 정확히 일치한다.
  - ex) api/bookmark/[id] => pages/bookmark/[id]
  - 같은 api를 사용하는 페이지가 있어도 반복해서 만들었는데, 이걸 개선할 수 없을까?
- test 코드 작성하기
- Next.js의 api는 책임이 명확하게 나눠져 있지 않은데, 이걸 어떻게 개선할 수 있을까
  - nest.js 처럼 사용한 사례는 없나?
- db table이 지금 bookmark와 category로 되어 있는데, 이걸 개선할 필요는 없을까?
  - 특히, 마지막 페이지의 수를 찾기 위해 전체를 가져오고 계산을 하고 있는데 이를 개선할 순 없을까?
  - bookmark.length / (page 당 보여줄 수) => 마지막 페이지의 번호

## 구현에 걸린 시간

- 걸린 시간 : 7월 29일 월요일 오전 11시 ~ 7월 30일 화요일 오후 4시
- Ps : 병원에 가야해서 시간이 남았지만 마무리 하겠습니다.
