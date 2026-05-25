const portfolioData = {
  projects: [
    {
      title: "Daily Commute Booking Platform",
      description: "A scalable ride-sharing platform for daily commutes with single and shared ride options. Features a ride-matching and routing algorithm to reduce rider wait times.",
      tags: ["Spring Boot", "Angular", "JWT", "REST API"],
      sourceUrl: "https://github.com/Satyasrisai15"
    },
    {
      title: "Web-Based Employee Management System",
      description: "Full-stack web application to manage employee records with role-based access and full CRUD functionality. Secure RESTful APIs with JWT-based authentication.",
      tags: ["Spring Boot", "Angular", "JWT", "PostgreSQL"],
      sourceUrl: "https://github.com/Satyasrisai15"
    },
    {
      title: "Predictive Ranking of Nifty50 Stocks",
      description: "Automated Python data pipeline with modular components for data extraction, feature engineering, and validation using a Hybrid Transformer model on 20 years of historical stock data.",
      tags: ["Python", "Pandas", "Yahoo Finance API", "Matplotlib"],
      sourceUrl: "https://github.com/Satyasrisai15"
    }
  ],

  skills: {
    "Languages": ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "HTML", "CSS"],
    "Frameworks & Libraries": ["Spring Boot", "Angular", "Tailwind CSS", "Hibernate"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
    "Cloud & Tools": ["AWS (EC2, S3)", "GCP", "Docker", "Git", "GitHub", "Postman", "Maven", "JWT", "Figma"]
  },

  social: {
    github: "https://github.com/Satyasrisai15",
    linkedin: "https://linkedin.com/in/vundavallisatyasrisai",
    email: "vundavallisatyasrisai@gmail.com"
  }
};

// Export for testing (Node.js / module environments)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioData };
}
