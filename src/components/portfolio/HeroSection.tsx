import { useEffect, useState, useRef } from 'react';
import { FiSun, FiMoon, FiDownload, FiChevronDown } from 'react-icons/fi';
import { useDarkMode } from '@/hooks';
import type { HeroData } from '@/types/portfolio';
import { PORTFOLIO_SECTIONS, aboutData } from '@/constants/portfolio';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  data: HeroData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.min(window.scrollY / (sectionHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 타이핑 효과
  useEffect(() => {
    const currentRole = data.roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % data.roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, data.roles]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    scrollToSection('about');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = `${aboutData.name}_이력서.pdf`;
    link.click();
  };

  const windowStyle = {
    opacity: 1 - scrollProgress * 1.8,
    transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * -50}px)`,
    pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
  } as React.CSSProperties;

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {/* 배경 효과 */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow} />

      {/* 맥 윈도우 */}
      <div className={styles.macWindow} style={windowStyle}>
        {/* 타이틀바 */}
        <div className={styles.titlebar}>
          <div className={styles.trafficLights}>
            <span className={`${styles.trafficLight} ${styles.red}`} />
            <span className={`${styles.trafficLight} ${styles.yellow}`} />
            <span className={`${styles.trafficLight} ${styles.green}`} />
          </div>

          <nav className={styles.tabNav}>
            {PORTFOLIO_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                className={styles.tab}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={handleDownloadResume}
              title="이력서 다운로드"
            >
              <FiDownload size={16} />
            </button>
            <button
              className={styles.actionButton}
              onClick={toggleDarkMode}
              title={darkMode ? '라이트 모드' : '다크 모드'}
            >
              {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>
        </div>

        {/* Hero 콘텐츠 */}
        <div className={styles.windowContent}>
          <div className={styles.heroContent}>
            {/* 인사말 */}
            <p className={styles.greeting}>{data.greeting}</p>

            {/* 이름 */}
            <h1 className={styles.name}>
              <span className={styles.nameText}>{data.name}</span>
              <span className={styles.nameSuffix}>입니다</span>
            </h1>

            {/* 타이핑 역할 */}
            <div className={styles.roleWrapper}>
              <span className={styles.roleLabel}>I'm a </span>
              <span className={styles.role}>
                {displayText}
                <span className={styles.cursor}>|</span>
              </span>
            </div>

            {/* 설명 */}
            <p className={styles.description}>{data.description}</p>

            {/* 스크롤 유도 */}
            <button className={styles.scrollDown} onClick={scrollToAbout}>
              <span>Scroll Down</span>
              <FiChevronDown className={styles.scrollIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
