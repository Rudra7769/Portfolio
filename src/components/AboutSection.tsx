import { Sparkles } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import Squares from "./Squares";

const stats = [
	{
		number: "160+",
		label: "Projects",
		description:
			"Delivered across various Client satisfaction Hubs based on worldwide.",
	},
	{
		number: "50+",
		label: "Team Members",
		description:
			"Professionals dedicated to delivering excellence and creative solutions.",
	},
	{
		number: "99%",
		label: "Success",
		description:
			"High client satisfaction based on worldwide reviews and feedback.",
	},
	{
		number: "50+",
		label: "Awards",
		description: "Recognized with numerous awards from top industry leaders.",
	},
];

const AboutSection = () => {
		return (
			<section id="about" className="relative py-20 px-6 bg-card/30 overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0 opacity-60">
					<Squares 
						speed={0.5} 
						squareSize={40}
						direction='diagonal'
						borderColor='rgba(255, 255, 255, 0.3)'
						hoverFillColor='rgba(96, 255, 103, 0.3)'
					/>
				</div>
				<div className="container mx-auto relative z-10">
				<div className="flex items-center gap-3 mb-12 justify-center">
					<Sparkles className="w-5 h-5 text-accent" />
					<span className="text-sm text-muted-foreground">ABOUT ME</span>
				</div>

				<div className="max-w-4xl mx-auto text-center mb-16">
					<p className="text-2xl md:text-3xl leading-relaxed">
						Hi, I’m Rudra — a developer and designer who loves turning ideas
						into interactive digital experiences. I craft experiences that inspire
						and connect, focusing on blending design, code, and creativity to solve
						real-world problems.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<SpotlightCard 
							key={index} 
							className="group hover:border-white/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-accent/40 hover:backdrop-blur-2xl transition-all duration-300" 
							spotlightColor="rgba(34, 197, 94, 0.4)"
						>
							<div className="text-sm text-muted-foreground mb-3">
								{stat.label}
							</div>
							<div className="text-5xl font-bold mb-4 group-hover:text-accent transition-colors">
								{stat.number}
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{stat.description}
							</p>
						</SpotlightCard>
					))}
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
