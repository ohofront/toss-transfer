# Toss Transfer (토스 간편 송금 웹 애플리케이션)

토스(Toss)의 직관적이고 빠른 간편 송금 사용자 경험(UX)을 재현한 Next.js 웹 애플리케이션입니다.  
Supabase 클라우드 데이터베이스 연동과 함께 **Mock/더미 데이터(Dummy Data) 모드를 기본 지원**하여, 별도의 환경 변수나 백엔드 설정 없이도 즉시 전체 송금 플로우를 테스트하고 Netlify 등의 플랫폼에 배포할 수 있습니다.

---

## 📱 주요 기능 (Key Features)

1. **계좌 및 총 잔액 조회 (Home)**
   - 보유 계좌(KB국민, 카카오뱅크 등) 목록 및 실시간 잔액 표시
   - 총 보유 자산 합산액 자동 계산 및 표기
   - 각 계좌별 [송금] 버튼을 통한 송금 출금 계좌 지정

2. **송금 금액 입력 (`/remit`)**
   - 가상 키패드(1~9, 0, 취소, 한 글자 지우기) 지원
   - 출금 가능 계좌 정보 및 잔액 표시
   - 한글 화폐 단위 실시간 변환 표기 (예: 50,000 원 ➡️ 5만 원)
   - 출금 가능 잔액 초과 방지 및 금액 유효성 검사

3. **받는 분 선택 (3가지 탭 지원)**
   - **최근 보낸 계좌 (`/remit/recent`)**: 즐겨찾기(북마크) 및 최근 송금 대상 목록, 이름/계좌 실시간 검색 필터
   - **계좌 직접 입력 (`/remit/account`)**: 주요 은행(토스뱅크, 카카오뱅크, KB국민, 신한, 우리, NH농협, 하나, IBK기업) 선택 및 계좌번호/받는 분 입력
   - **연락처 (`/remit/contact`)**: 연락처 목록 검색 및 전화번호 기반 간편 송금

4. **송금 확인 및 이체 완료 (Transfer Modal)**
   - 토스 스타일의 바텀시트 확인 모달
   - 받는 분, 출금 계좌, 이체 금액, 송금 후 예상 잔액, 수수료 무료 안내
   - 송금 완료 시 출금 계좌 잔액 차감 및 최근 송금 목록 자동 갱신 (localStorage 동기화)

5. **더미 데이터 & Supabase 하이브리드 지원**
   - 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)가 설정되어 있으면 Supabase와 연동
   - 환경 변수가 없거나 네트워크 오류 시 내장 더미 데이터와 브라우저 로컬 스토리지로 부드럽게 대체 구동

---

## 🛠 기술 스택 (Tech Stack)

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database / Backend**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`) with Fallback Mock Store
- **Icons**: [FontAwesome](https://fontawesome.com/)

---

## 📂 프로젝트 구조 (Directory Structure)

```text
src/
├── app/
│   ├── globals.css              # 전역 스타일 및 Tailwind 세팅
│   ├── layout.tsx               # 루트 레이아웃 (모바일 뷰 컨테이너 및 폰트)
│   ├── page.tsx                 # 메인 화면 (계좌 목록 및 총 잔액)
│   └── remit/
│       ├── page.tsx             # 송금 금액 입력 화면
│       ├── recent/page.tsx      # 최근 송금 내역 탭
│       ├── account/page.tsx     # 계좌 직접 입력 탭
│       └── contact/page.tsx     # 연락처 송금 탭
├── assets/                      # 은행 및 프로필 이미지 리소스
├── components/
│   ├── common/                  # 공통 컴포넌트 (Divider, Loading)
│   ├── main/                    # 메인 페이지 컴포넌트 (AccountList, AccountLink, Reset)
│   └── remit/                   # 송금 관련 컴포넌트 (Keypad, Money, RemitHeader, BankBadge, TransferConfirmModal 등)
├── lib/
│   └── supabaseClient.ts        # Supabase 클라이언트 세이프 초기화
├── services/
│   ├── dummyData.ts             # 기본 더미 데이터 및 로컬 스토리지 동기화 모듈
│   ├── account.ts               # 계좌 조회 및 잔액 차감 서비스
│   ├── recent.ts                # 최근 송금 목록 조회 및 추가 서비스
│   └── contact.ts               # 연락처 목록 조회 서비스
├── store/
│   └── index.ts                 # 송금 금액, 출금/입금 계좌 전역 상태 관리 (Zustand)
└── util/
    └── number-util.ts           # 금액 단위 한글 변환 유틸
```

---

## 🚀 로컬 실행 방법 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 구동
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 더미 데이터와 함께 바로 동작하는 애플리케이션을 확인할 수 있습니다.

### 3. 프로덕션 빌드 및 실행
```bash
npm run build
npm run start
```

---

## ⚙️ 환경 변수 설정 (선택 사항)

별도의 환경 변수 없이도 더미 데이터로 모든 기능이 작동합니다. Supabase 실제 데이터베이스와 연결하려면 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 값을 입력합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase 테이블 구조 참고
- `accounts`: `id` (int), `name` (text), `balance` (numeric), `bookmark` (bool), `type` (text: 'KB' | 'KAKAO')
- `recent`: `id` (int), `name` (text), `account` (text), `type` (text), `bookmark` (bool)
- `contact`: `id` (int), `name` (text), `phone` (text), `account` (text), `type` (text)

---

## 🌐 Netlify 배포 가이드 (Netlify Deployment)

이 프로젝트는 Netlify의 Next.js Runtime 지원(`@netlify/plugin-nextjs`)과 `netlify.toml` 설정이 사전 구성되어 있습니다.

### 배포 순서
1. **GitHub 저장소 연결**: [Netlify](https://www.netlify.com/) 대시보드에서 `Add new site` > `Import an existing project` 선택 후 본 저장소(`toss-transfer`)를 선택합니다.
2. **빌드 설정 확인**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - (`netlify.toml` 파일이 리포지토리에 포함되어 있어 자동으로 설정됩니다)
3. **환경 변수 (선택 사항)**:
   - Supabase를 사용할 경우: `Site settings` > `Environment variables`에서 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 등록합니다.
   - 등록하지 않아도 더미 데이터 모드로 정상 빌드 및 배포됩니다.
4. **Deploy**: `Deploy site` 버튼을 클릭하면 배포가 완료됩니다.
