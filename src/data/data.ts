import type {
  About,
  SkillCategory,
  Project,
  Education,
  Certificate,
  Activity,
  PortfolioData,
} from './data.types';

export const aboutData: About = {
  name: '정현영',
  title: 'Backend Developer',
  slogan: '안정적인 서버를 만드는 개발자',
  introduction:
    '꾸준한 학습과 리팩터링을 통해 코드 품질과 성능 향상을 목표로 노력하는 개발자입니다. 문제를 끝까지 파고드는 것을 좋아하고, 트러블슈팅 과정을 기록하며 성장하고 있습니다.',
  email: 'email@example.com',
  blogUrl: 'https://sealog.com',
  githubUrl: 'https://github.com/username',
  profileImage: '/public/images/profile_img.jpg',
};

export const skillsData: SkillCategory[] = [
  {
    category: 'MAIN',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL'],
  },
  {
    category: 'ETC',
    skills: [
      'React',
      'TypeScript',
      'AWS EC2',
      'AWS S3',
      'Redis',
      'GitHub Actions',
      'Git',
      'Linux',
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Sealog',
    description: 'Spring Boot + React 기반 기술 블로그 플랫폼',
    period: '2026.01 ~ 진행중',
    role: '개인 프로젝트',
    team: '',
    skills: ['Java', 'Spring Boot', 'JPA', 'MariaDB', 'AWS', 'React', 'TypeScript'],
    features: [
      'JWT 인증/인가, Refresh Token 자동 갱신',
      'Tiptap 마크다운 에디터 + S3 이미지 업로드',
      '카테고리/태그 복합 필터링',
    ],
    troubleshooting: [
      {
        problem: '[S] 게시글 목록 조회 시 평균 1.2초 소요로 사용자 경험 저하',
        solutions: [
          '[T] Hibernate 쿼리 로그 분석 결과 N+1 문제 발견 (1001번 쿼리 발생)',
          '[A] @EntityGraph를 적용하여 연관 엔티티(User, Category)를 한 번에 조회하도록 개선',
          '[R] 쿼리 수 92% 감소 (1001개→1개), 응답속도 85% 개선 (1.2s→0.18s)',
        ],
      },
      {
        problem: '[S] 게시글 작성 취소 시에도 업로드된 이미지가 S3에 누적되어 월 스토리지 비용 증가',
        solutions: [
          '[T] 게시글과 연결되지 않은 고아 파일 자동 정리 시스템 필요',
          '[A] Spring Scheduler로 매일 새벽 2시 미사용 파일 자동 삭제, 게시글-이미지 매핑 테이블로 사용 중인 파일 추적',
          '[R] S3 불필요한 요청 90% 감소, 월 스토리지 비용 약 30% 절감',
        ],
      },
    ],
    github: 'https://github.com/username/sealog',
  },
  {
    id: 2,
    title: 'SoosCode',
    description: '실시간 코딩 교육 플랫폼 (MSA)',
    period: '2024.10 ~ 2024.12',
    role: '팀장, 백엔드 개발',
    team: '5인 팀 프로젝트',
    skills: ['Spring Boot', 'WebSocket', 'Redis', 'LiveKit', 'MySQL'],
    features: [
      'WebSocket + STOMP 실시간 코드 동기화',
      'Redis Pub/Sub 멀티 세션 브로드캐스팅',
      'LiveKit 영상/음성 스트리밍 연동',
    ],
    troubleshooting: [
      {
        problem: '[S] 여러 사용자가 동시에 코드 편집 시 전체 코드 전송(평균 500KB)으로 네트워크 지연 및 렌더링 부하 발생',
        solutions: [
          '[T] 변경된 부분만 전송하는 Delta 방식으로 최적화 필요',
          '[A] 코드 변경 시 position, deleted, inserted 정보만 전송하도록 WebSocket 메시지 구조 개선',
          '[R] 네트워크 전송량 90% 감소 (500KB→50KB), 클라이언트 렌더링 시간 83% 개선 (300ms→50ms)',
        ],
      },
      {
        problem: '[S] 다중 사용자 환경에서 실시간 코드 동기화가 필요한 상황',
        solutions: [
          '[T] 세션별 독립적인 코드 상태 관리 및 브로드캐스팅 구조 설계',
          '[A] Redis Pub/Sub을 활용하여 룸별 메시지 브로드캐스팅 구현',
          '[R] 동시 접속자 50명 환경에서 안정적인 실시간 동기화 달성',
        ],
      },
    ],
    github: 'https://github.com/username/sooscode',
  },
  {
    id: 3,
    title: 'Mulang',
    description: '외국어 온라인 강의 예약 플랫폼',
    period: '2024.10 ~ 2024.10',
    role: '팀장, 백엔드 개발',
    team: '4인 팀 프로젝트',
    skills: ['Spring Boot', 'JPA', 'JSP', 'TossPayments', 'MariaDB'],
    features: [
      'TossPayments API 결제 연동',
      'Spring Security 역할별 인증/인가 (학생/강사/관리자)',
      '강의 예약 및 관리 시스템',
    ],
    troubleshooting: [
      {
        problem: '[S] 학생/강사/관리자 각 역할별로 접근 가능한 기능이 달라 복잡한 권한 관리 필요',
        solutions: [
          '[T] 역할별 분기 처리가 컨트롤러마다 중복되어 유지보수성 저하',
          '[A] Spring Security의 Hierarchical Roles 적용, @PreAuthorize로 메서드 레벨 권한 검증, 본인 확인 로직을 AOP로 모듈화',
          '[R] 권한 검증 코드 중복 80% 제거, 역할 추가/변경 시 수정 범위 최소화',
        ],
      },
      {
        problem: '[S] 결제 프로세스 중 예외 발생 시 데이터 불일치 및 중복 결제 위험',
        solutions: [
          '[T] 결제 승인과 DB 저장 간의 원자성 보장 필요',
          '[A] @Transactional 전파 속성으로 트랜잭션 관리, TossPayments 콜백 검증 및 롤백 전략 수립, 결제 상태별 중복 방지 로직 구현',
          '[R] 테스트 환경에서 100회 결제 시나리오 중 데이터 불일치 0건, 중복 결제 0건 달성',
        ],
      },
    ],
    github: 'https://github.com/username/mulang',
  },
  {
    id: 4,
    title: 'RAG 대학교 챗봇',
    description: 'RAG + LLM(OpenAI)를 활용한 대학교 Q&A 챗봇',
    period: '2025.02 ~ 2025.06',
    role: '프론트엔드 개발',
    team: '팀 프로젝트',
    skills: ['React', 'JavaScript', 'Axios'],
    features: [
      'React 기반 실시간 채팅 UI 구현',
      'REST API 연동 및 에러 핸들링',
      '반응형 디자인, 타이핑 인디케이터',
    ],
    troubleshooting: [],
    github: 'https://github.com/username/rag-chatbot',
  },
];

export const educationData: Education[] = [
  {
    id: 1,
    institution: 'OO 부트캠프',
    period: '2024.03 ~ 2024.09',
    description: 'Java/Spring 백엔드 개발 과정 수료',
  },
  {
    id: 2,
    institution: 'OO 대학교',
    period: '2019.03 ~ 2024.02',
    description: '컴퓨터공학과 졸업',
  },
];

export const certificatesData: Certificate[] = [
  {
    id: 1,
    name: '정보처리기사',
    date: '2024.06',
    organization: '한국산업인력공단',
  },
  {
    id: 2,
    name: 'SQLD',
    date: '2024.04',
    organization: '한국데이터산업진흥원',
  },
];

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: 'OO 해커톤 참가',
    period: '2024.11',
    description: '실시간 협업 툴 개발 및 발표',
  },
];

export const portfolioData: PortfolioData = {
  about: aboutData,
  skills: skillsData,
  projects: projectsData,
  education: educationData,
  certificates: certificatesData,
  activities: activitiesData,
};