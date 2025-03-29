// src/components/sections/Testimonials.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added React import back (needed for JSX Fragments <>)
import styles from './Testimonials.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

// Define the structure for testimonial data
interface TestimonialData {
    id: number;
    quote: React.ReactNode;
    author: string;
    title: string;
    avatarInitial: string;
}

// Testimonial content with corrected className
const testimonials: TestimonialData[] = [
    {
        id: 1,
        quote: <>"What I learned with Mia in just two days was <span className={styles.testimonialHighlight}>more than I learned from all other courses combined</span>. I use the tools she taught me in every sitting I do. Mia removes the pressure from mediumship and teaches us to have fun while taking care of ourselves."</>,
        author: "Anna",
        title: "Medium Student",
        avatarInitial: "A"
    },
    {
        id: 2,
        quote: <>"Mia shares all of her knowledge without hesitation. She <span className={styles.testimonialHighlight}>encourages us to find our own voice and path in mediumship</span> while keeping a watchful eye. Her honesty and generosity create an environment where we can stay faithful to ourselves without compromise."</>,
        author: "Magdalena",
        title: "Developing Medium",
        avatarInitial: "M"
    },
    {
        id: 3,
        quote: <>"I met Mia at the Arthur Findlay College feeling scared and insecure. <span className={styles.testimonialHighlight}>She is one of the most beautiful, honest, and kind-hearted people I've ever met</span>. Seeing herself in me, she helped me feel less alone during that week. She's incredible as both a tutor and friend."</>,
        author: "Danice",
        title: "Former Student",
        avatarInitial: "D"
    },
     {
        id: 4,
        quote: <>"After witnessing Mia's mediumship demonstrations over the past two years, I've been consistently impressed by her accuracy and connection. She is genuine and straightforward — <span className={styles.testimonialHighlight}>truly one of the best mediums in the world today</span>."</>,
        author: "Simon",
        title: "Professional Medium",
        avatarInitial: "S"
    },
     {
        id: 5,
        quote: <>"My first course with Mia was challenging, but <span className={styles.testimonialHighlight}>she eased my mind and taught me to believe in myself</span>. I appreciate her teaching approach — straightforward yet supportive, with a firm but loving hand. She's always there when needed but waits for us to ask for help."</>,
        author: "Inger",
        title: "Medium Student",
        avatarInitial: "I"
    }
];

const Testimonials: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const sliderContainerRef = useRef<HTMLDivElement>(null); // Ref IS used now

     const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
     const { ref: sliderViewRef, inView: sliderInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const totalSlides = testimonials.length;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, [totalSlides]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

     const startInterval = useCallback(() => {
         if (intervalRef.current) { clearInterval(intervalRef.current); }
         intervalRef.current = setInterval(nextSlide, 5000);
     }, [nextSlide]);

    useEffect(() => {
        startInterval();
        return () => { if (intervalRef.current) { clearInterval(intervalRef.current); } };
    }, [startInterval]);

     const handleMouseEnter = () => { if (intervalRef.current) { clearInterval(intervalRef.current); } };
     const handleMouseLeave = () => { startInterval(); };


    return (
        <section className="section" id="testimonials">
            <div className="container">
                <div ref={headingRef} className={`section-heading ${headingInView ? 'animate fade-up' : 'animate'}`}>
                    <span className="section-subtitle">TRANSFORMATIONAL EXPERIENCES</span>
                    <h2>Student Success Stories</h2>
                    <p>Hear from those who have experienced Mia's unique approach to medium development</p>
                </div>

                 <div
                    ref={sliderContainerRef} // Attach the ref here
                    className={`${styles.testimonialSliderContainer} ${sliderInView ? 'animate fade-up' : 'animate'}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    aria-roledescription="carousel"
                    aria-label="Testimonials"
                >
                    <div className={styles.testimonialArrows}>
                        <button className={`${styles.testimonialArrow} ${styles.prev}`} onClick={() => { prevSlide(); startInterval(); }} aria-label="Previous testimonial">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className={`${styles.testimonialArrow} ${styles.next}`} onClick={() => { nextSlide(); startInterval(); }} aria-label="Next testimonial">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className={styles.testimonialSlider}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.testimonialCard} ${index === currentSlide ? styles.active : ''}`}
                                role="group" aria-roledescription="slide" aria-label={`Testimonial ${index + 1} of ${totalSlides}`} aria-hidden={index !== currentSlide}
                            >
                                <div className={styles.testimonialContent}><p>{testimonial.quote}</p></div>
                                <div className={styles.testimonialAuthor}>
                                    <div className={styles.authorAvatar}>{testimonial.avatarInitial}</div>
                                    <div className={styles.authorInfo}>
                                        <h4>{testimonial.author}</h4>
                                        <p>{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.testimonialNav} role="tablist" aria-label="Testimonial navigation dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index} className={`${styles.testimonialDot} ${index === currentSlide ? styles.active : ''}`}
                                onClick={() => { goToSlide(index); startInterval(); }} role="tab" aria-selected={index === currentSlide} aria-label={`Go to testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;