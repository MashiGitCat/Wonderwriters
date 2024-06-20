import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./hero.css";

const Hero: React.FC = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const t1 = gsap.timeline();
		const letters = document.querySelectorAll(
			".hero__text-container__subtitle--letter"
		);
		if (titleRef.current && subtitleRef.current) {
			t1.fromTo(
				titleRef.current,
				{
					y: "-100%",
					opacity: 0,
				},

				{
					duration: 3.5,
					y: 0,
					opacity: 1,
					ease: "bounce.out",
				}
			).fromTo(
				subtitleRef.current,
				{ width: 0 },
				{ duration: 4, width: "auto", ease: "power2.inOut", delay: 0.2 },
				">-2"
			);
			t1.to(letters, { duration: 0.5, color: "#fdbd29", stagger: 0.1 })
				.to(letters, { duration: 2, color: "#1655f2", stagger: 0.1 })
				.to(letters, { duration: 2, color: "#0f1eaf", stagger: 0.1 })
				.to(letters, { duration: 2, color: "#fd641f", stagger: 0.1 });
		}
	}, []);
	return (
		<div className="hero">
			<div className="hero__text-container">
				<h1 ref={titleRef} className="hero__text-container__title">
					Imagine, Illustrate & Write
				</h1>
				<div
					ref={subtitleRef}
					className="hero__text-container__subtitle-container"
				>
					<p className="hero__text-container__subtitle">
						Weave your ideas with{" "}
						<span className="hero__text-container__subtitle--letter">W</span>
						<span className="hero__text-container__subtitle--letter">o</span>
						<span className="hero__text-container__subtitle--letter">n</span>
						<span className="hero__text-container__subtitle--letter">d</span>
						<span className="hero__text-container__subtitle--letter">e</span>
						<span className="hero__text-container__subtitle--letter">r</span>
						<span className="hero__text-container__subtitle--letter">W</span>
						<span className="hero__text-container__subtitle--letter">r</span>
						<span className="hero__text-container__subtitle--letter">i</span>
						<span className="hero__text-container__subtitle--letter">t</span>
						<span className="hero__text-container__subtitle--letter">e</span>
						<span className="hero__text-container__subtitle--letter">r</span>
						<span className="hero__text-container__subtitle--letter">s</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Hero;
