import { Sparkles } from "lucide-react";
import CardSwap, { Card } from './ui/CardSwap';
import Particles from './Particles';

const projects = [
	{
		id: "001",
		title: "AGENCY WEBSITE DESIGN",
		year: "2025",
		image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
		description: "Modern agency website with dynamic interactions"
	},
	{
		id: "002",
		title: "MOBILE APP DESIGN",
		year: "2025",
		image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800",
		description: "Intuitive mobile application interface"
	},
	{
		id: "003",
		title: "DASHBOARD DESIGN",
		year: "2025",
		image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?q=80&w=800",
		description: "Data visualization dashboard"
	},
];

const ProjectsSection = () => {
	return (
		<section id="work" className="py-20 px-6 relative min-h-[800px] overflow-hidden">
			{/* Particles Background for entire section */}
			<div className="absolute inset-0 z-0">
				<Particles
					particleColors={['#ffffff', '#ffffff']} // White particles
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={false}
					alphaParticles={false}
					disableRotation={false}
				/>
			</div>

			<div className="container mx-auto relative z-10">
				<div className="grid grid-cols-2 gap-8">
					{/* Left side - Text */}
					<div className="flex flex-col justify-center">
						<div className="flex items-center gap-3 mb-12">
							<Sparkles className="w-5 h-5 text-accent" />
							<span className="text-sm text-muted-foreground">PROJECTS</span>
						</div>

						<h2 className="text-4xl md:text-5xl font-bold mb-6">Recent Projects</h2>
						<p className="text-muted-foreground mb-16 max-w-xl">
							My work is more than design - it's the result of deep thinking, fresh ideas, and fearless execution across disciplines.
						</p>
					</div>

					{/* Right side - Cards */}
					<div style={{ height: '600px', position: 'relative', zIndex: 20 }}>
						<CardSwap
							cardDistance={60}
							verticalDistance={70}
							delay={5000}         // Increased from 3000 to 5000 for slower rotation
							pauseOnHover={true}
							width={400}
							height={500}
							easing="linear"
						>
							{projects.map((project) => (
								<Card key={project.id} className="p-6 text-white overflow-hidden group">
									<div className="h-full flex flex-col">
										<div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
											<img
												src={project.image}
												alt={project.title}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
										<h3 className="text-xl font-bold mb-2">{project.title}</h3>
										<p className="text-gray-300">{project.description}</p>
										<div className="mt-auto">
											<span className="text-sm text-gray-400">// {project.year}</span>
										</div>
									</div>
								</Card>
							))}
						</CardSwap>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
