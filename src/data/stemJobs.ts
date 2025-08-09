// data/stemJobs.ts
export type ValidKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'K'

export type StemJob = {
    id: number
    title: string
    description: string
    hollandCodes: ValidKey[] // most-to-least dominant
}

const stemJobs: StemJob[] = [
    {
        id: 1,
        title: "Data Scientist",
        description:
            "Builds predictive models, mines large datasets, and communicates insights that drive product and business decisions.",
        hollandCodes: ['I', 'A', 'E']
    },
    {
        id: 2,
        title: "Software Engineer",
        description:
            "Designs, implements, and maintains reliable, scalable software systems across frontend, backend, or full stack.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 3,
        title: "Machine Learning Engineer",
        description:
            "Operationalizes ML models, optimizes training/inference, and productionizes pipelines with monitoring and CI/CD.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 4,
        title: "UX Researcher",
        description:
            "Plans and runs studies, synthesizes findings, and influences product direction with evidence-based insights.",
        hollandCodes: ['S', 'A', 'I']
    },
    {
        id: 5,
        title: "Product Designer (UI/UX)",
        description:
            "Crafts end-to-end product experiences, from problem definition and flows to visual design and prototypes.",
        hollandCodes: ['A', 'E', 'S']
    },
    {
        id: 6,
        title: "Cybersecurity Analyst",
        description:
            "Monitors threats, investigates incidents, and strengthens defenses through policies, tooling, and risk assessment.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 7,
        title: "Cloud Solutions Architect",
        description:
            "Designs cloud-native architectures, aligns scalability and cost, and guides teams through migrations and patterns.",
        hollandCodes: ['I', 'E', 'K']
    },
    {
        id: 8,
        title: "DevOps Engineer",
        description:
            "Automates delivery, builds CI/CD systems, and champions observability, reliability, and developer experience.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 9,
        title: "Robotics Engineer",
        description:
            "Designs and builds robotic systems combining mechanics, electronics, and software for real-world tasks.",
        hollandCodes: ['R', 'I', 'K']
    },
    {
        id: 10,
        title: "Bioinformatician",
        description:
            "Builds computational pipelines to analyze biological data and generate insights for research and healthcare.",
        hollandCodes: ['I', 'R', 'A']
    },
    {
        id: 11,
        title: "AR/VR Developer",
        description:
            "Creates immersive experiences with 3D engines, interaction design, and real-time performance optimization.",
        hollandCodes: ['A', 'I', 'R']
    },
    {
        id: 12,
        title: "Environmental Engineer",
        description:
            "Designs sustainable systems to address water, air, and waste challenges with data-driven engineering.",
        hollandCodes: ['R', 'I', 'S']
    },
    {
        id: 13,
        title: "Embedded Systems Engineer",
        description:
            "Develops firmware and low-level software on constrained devices with real-time guarantees.",
        hollandCodes: ['R', 'I', 'K']
    },
    {
        id: 14,
        title: "Game Developer",
        description:
            "Builds interactive games combining systems programming, gameplay, tooling, and performance tuning.",
        hollandCodes: ['A', 'I', 'R']
    },
    {
        id: 15,
        title: "Data Engineer",
        description:
            "Designs and maintains data pipelines, warehouses, and tooling for reliable, high-quality data.",
        hollandCodes: ['K', 'I', 'R']
    },
    {
        id: 16,
        title: "Business Intelligence Analyst",
        description:
            "Transforms data into dashboards and insights that support decisions across teams and stakeholders.",
        hollandCodes: ['K', 'E', 'I']
    },
    {
        id: 17,
        title: "Quality Assurance Engineer",
        description:
            "Prevents defects with test strategy, automation, and tooling across the SDLC, focusing on reliability.",
        hollandCodes: ['K', 'R', 'I']
    },
    {
        id: 18,
        title: "Network Engineer",
        description:
            "Designs and maintains secure, performant networks, troubleshooting connectivity and scaling challenges.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 19,
        title: "AI Product Manager",
        description:
            "Aligns ML capabilities with user needs and business outcomes, balancing feasibility, ethics, and risk.",
        hollandCodes: ['E', 'I', 'S']
    },
    {
        id: 20,
        title: "Technical Writer",
        description:
            "Creates clear documentation, tutorials, and reference guides that empower developers and users.",
        hollandCodes: ['A', 'S', 'K']
    },
    {
        id: 21,
        title: "Biomedical Engineer",
        description:
            "Applies engineering principles to healthcare technology, designing medical devices, imaging systems, and prosthetics.",
        hollandCodes: ['R', 'I', 'S']
    },
    {
        id: 22,
        title: "Astrophysicist",
        description:
            "Studies the physical properties of celestial bodies and phenomena using theoretical models and data from observatories.",
        hollandCodes: ['I', 'R', 'A']
    },
    {
        id: 23,
        title: "Agricultural Data Analyst",
        description:
            "Optimizes farming systems and food production using sensors, geospatial tools, and machine learning.",
        hollandCodes: ['I', 'E', 'K']
    },
    {
        id: 24,
        title: "Industrial Designer",
        description:
            "Combines aesthetics, user needs, and engineering to design consumer products from electronics to furniture.",
        hollandCodes: ['A', 'E', 'R']
    },
    {
        id: 25,
        title: "STEM Educator",
        description:
            "Inspires the next generation through hands-on learning, curriculum development, and inclusive classroom strategies.",
        hollandCodes: ['S', 'A', 'K']
    },
    {
        id: 26,
        title: "Ecologist",
        description:
            "Studies ecosystems and biodiversity, analyzing data and modeling environmental impacts to guide conservation.",
        hollandCodes: ['I', 'R', 'S']
    },
    {
        id: 27,
        title: "3D Printing Specialist",
        description:
            "Operates and calibrates additive manufacturing equipment to prototype functional parts across industries.",
        hollandCodes: ['R', 'K', 'A']
    },
    {
        id: 28,
        title: "Pharmaceutical Chemist",
        description:
            "Researches and formulates new drugs through chemical synthesis, testing, and regulatory analysis.",
        hollandCodes: ['I', 'K', 'S']
    },
    {
        id: 29,
        title: "Space Systems Engineer",
        description:
            "Designs spacecraft subsystems and integrates flight hardware and software for orbital missions.",
        hollandCodes: ['R', 'I', 'E']
    },
    {
        id: 30,
        title: "Human Factors Engineer",
        description:
            "Improves safety and usability of products and systems by studying user behavior, ergonomics, and interface design.",
        hollandCodes: ['A', 'S', 'K']
    },
    {
        id: 31,
        title: "Renewable Energy Technician",
        description: "Installs and maintains solar, wind, and geothermal energy systems, optimizing performance and sustainability.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 32,
        title: "Marine Biologist",
        description: "Studies ocean life and ecosystems using fieldwork, lab analysis, and data modeling.",
        hollandCodes: ['I', 'R', 'S']
    },
    {
        id: 33,
        title: "AI Ethics Researcher",
        description: "Explores fairness, accountability, and social impact of artificial intelligence systems.",
        hollandCodes: ['S', 'I', 'E']
    },
    {
        id: 34,
        title: "Civil Engineer",
        description: "Designs infrastructure like roads, bridges, and water systems while ensuring structural integrity and safety.",
        hollandCodes: ['R', 'K', 'E']
    },
    {
        id: 35,
        title: "Cognitive Scientist",
        description: "Studies human cognition and brain processes through experimentation, modeling, and interdisciplinary theory.",
        hollandCodes: ['I', 'S', 'A']
    },
    {
        id: 36,
        title: "Aerospace Technician",
        description: "Builds, tests, and calibrates aircraft and spacecraft components under strict compliance standards.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 37,
        title: "Genetic Counselor",
        description: "Advises individuals and families on inherited conditions, using genomics and interpersonal communication.",
        hollandCodes: ['S', 'I', 'K']
    },
    {
        id: 38,
        title: "Geospatial Analyst",
        description: "Visualizes and interprets geographic data for urban planning, environmental monitoring, or disaster response.",
        hollandCodes: ['I', 'K', 'R']
    },
    {
        id: 39,
        title: "Materials Scientist",
        description: "Develops new materials with unique properties for manufacturing, electronics, or medicine.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 40,
        title: "Medical Imaging Technologist",
        description: "Operates MRI, CT, and ultrasound equipment to assist diagnosis and treatment planning.",
        hollandCodes: ['R', 'S', 'K']
    },
    {
        id: 41,
        title: "Transportation Systems Analyst",
        description: "Improves mobility networks and public transit using data modeling and simulation tools.",
        hollandCodes: ['K', 'I', 'E']
    },
    {
        id: 42,
        title: "Chemistry Lab Technician",
        description: "Prepares samples, runs tests, and records results to support chemical research or manufacturing.",
        hollandCodes: ['K', 'R', 'I']
    },
    {
        id: 43,
        title: "STEM Curriculum Developer",
        description: "Designs engaging learning experiences and resources for science, tech, and math education.",
        hollandCodes: ['A', 'S', 'K']
    },
    {
        id: 44,
        title: "Blockchain Developer",
        description: "Creates secure decentralized applications and smart contracts for finance, logistics, or identity.",
        hollandCodes: ['K', 'I', 'R']
    },
    {
        id: 45,
        title: "Environmental Scientist",
        description: "Conducts field studies and lab tests to address pollution, climate, and ecosystem health.",
        hollandCodes: ['I', 'R', 'S']
    },
    {
        id: 46,
        title: "Design Engineer",
        description: "Solves engineering problems by blending technical function with aesthetic form and user context.",
        hollandCodes: ['A', 'R', 'K']
    },
    {
        id: 47,
        title: "Medical Roboticist",
        description: "Designs and programs robotic systems for surgery, rehabilitation, and patient care.",
        hollandCodes: ['R', 'I', 'S']
    },
    {
        id: 48,
        title: "AI Prompt Engineer",
        description: "Optimizes natural language interactions and model outputs using data tuning and tooling.",
        hollandCodes: ['I', 'K', 'A']
    },
    {
        id: 49,
        title: "Hydrologist",
        description: "Analyzes water movement, quality, and distribution to support sustainable environmental planning.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 50,
        title: "Packaging Engineer",
        description: "Designs product packaging to meet logistical, aesthetic, and sustainability constraints.",
        hollandCodes: ['A', 'R', 'K']
    },
    {
        id: 51,
        title: "Health Informatics Specialist",
        description: "Manages medical data systems and electronic health records to improve patient care workflows.",
        hollandCodes: ['K', 'S', 'I']
    },
    {
        id: 52,
        title: "Quantum Computing Researcher",
        description: "Explores quantum algorithms and error correction methods for next-gen computation.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 53,
        title: "Forensic Analyst",
        description: "Processes evidence using lab tools and investigative logic to assist criminal investigations.",
        hollandCodes: ['R', 'I', 'S']
    },
    {
        id: 54,
        title: "Product Manager (Tech)",
        description: "Defines roadmap, coordinates cross-functional teams, and ensures product-market fit.",
        hollandCodes: ['E', 'K', 'A']
    },
    {
        id: 55,
        title: "Bioengineer",
        description: "Applies biology and engineering to design tissue scaffolds, drug delivery systems, and biosensors.",
        hollandCodes: ['R', 'I', 'S']
    },
    {
        id: 56,
        title: "Manufacturing Process Engineer",
        description: "Improves efficiency, quality, and safety in factory workflows using lean principles and automation.",
        hollandCodes: ['K', 'R', 'I']
    },
    {
        id: 57,
        title: "AI Research Scientist",
        description: "Explores foundational algorithms, model architectures, and optimization techniques in machine intelligence.",
        hollandCodes: ['I', 'K', 'A']
    },
    {
        id: 58,
        title: "Climate Data Analyst",
        description: "Models environmental trends and forecasts using satellite and sensor datasets.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 59,
        title: "Industrial Automation Engineer",
        description: "Designs systems that control manufacturing equipment and robotic processes with precision.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 60,
        title: "Educational Technologist",
        description: "Integrates tech into learning environments and supports teachers with platforms and training.",
        hollandCodes: ['S', 'K', 'A']
    },
    {
        id: 61,
        title: "Nuclear Engineer",
        description: "Designs and maintains systems for nuclear energy generation and safety protocols.",
        hollandCodes: ['R', 'K', 'I']
    },
    {
        id: 62,
        title: "Lab Manager",
        description: "Oversees research operations, compliance, and team coordination in technical labs.",
        hollandCodes: ['K', 'E', 'S']
    },
    {
        id: 63,
        title: "Computational Linguist",
        description: "Develops algorithms that parse, translate, and generate natural language using AI.",
        hollandCodes: ['I', 'A', 'K']
    },
    {
        id: 64,
        title: "Food Technologist",
        description: "Applies chemistry and biology to develop safe, nutritious, and shelf-stable food products.",
        hollandCodes: ['K', 'R', 'I']
    },
    {
        id: 65,
        title: "Optical Engineer",
        description: "Designs lenses and light systems for devices from cameras to microscopes to laser tech.",
        hollandCodes: ['R', 'I', 'K']
    },
    {
        id: 66,
        title: "STEM Policy Analyst",
        description: "Advises on public funding, education reform, and innovation strategies based on research data.",
        hollandCodes: ['E', 'K', 'I']
    },
    {
        id: 67,
        title: "Digital Accessibility Specialist",
        description: "Improves UX design for users with disabilities through standards, audits, and inclusive tooling.",
        hollandCodes: ['S', 'A', 'K']
    },
    {
        id: 68,
        title: "Nanotechnologist",
        description: "Manipulates materials at the atomic scale to build devices and enhance chemical processes.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 69,
        title: "Augmented Reality Experience Designer",
        description: "Creates immersive interactions for mobile and headset-based AR platforms.",
        hollandCodes: ['A', 'I', 'E']
    },
    {
        id: 70,
        title: "GIS Developer",
        description: "Builds geospatial applications and mapping tools for environmental, logistics, or civic use.",
        hollandCodes: ['K', 'I', 'R']
    },
    {
        id: 71,
        title: "Tech Policy Advisor",
        description: "Shapes legislation around emerging technologies by blending data analysis, legal insights, and ethics.",
        hollandCodes: ['E', 'S', 'I']
    },
    {
        id: 72,
        title: "Drone Systems Engineer",
        description: "Designs unmanned aerial vehicles and automates navigation and sensing systems.",
        hollandCodes: ['R', 'I', 'K']
    },
    {
        id: 73,
        title: "Computational Biologist",
        description: "Analyzes biological systems using algorithms, simulations, and big data techniques.",
        hollandCodes: ['I', 'K', 'A']
    },
    {
        id: 74,
        title: "Visual Data Journalist",
        description: "Creates compelling stories by merging investigative writing with interactive data visualizations.",
        hollandCodes: ['A', 'S', 'I']
    },
    {
        id: 75,
        title: "Water Resources Engineer",
        description: "Develops sustainable water supply systems, drainage, and flood mitigation infrastructure.",
        hollandCodes: ['R', 'I', 'K']
    },
    {
        id: 76,
        title: "Digital Twin Engineer",
        description: "Creates virtual replicas of systems for testing, simulation, and predictive maintenance.",
        hollandCodes: ['I', 'R', 'K']
    },
    {
        id: 77,
        title: "Biostatistician",
        description: "Applies statistical models to interpret medical and biological research data.",
        hollandCodes: ['K', 'I', 'S']
    },
    {
        id: 78,
        title: "Technical Illustrator",
        description: "Draws detailed diagrams and graphics to communicate complex concepts in science and engineering.",
        hollandCodes: ['A', 'K', 'R']
    },
    {
        id: 79,
        title: "Clean Tech Consultant",
        description: "Advises on sustainable technologies and energy systems for business or government.",
        hollandCodes: ['E', 'I', 'R']
    },
    {
        id: 80,
        title: "Neuroscience Lab Technician",
        description: "Supports experiments and data collection on brain function using lab equipment and protocols.",
        hollandCodes: ['I', 'K', 'R']
    }


]

export default stemJobs
