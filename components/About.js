export default function About() {
  return (
    <section id="about" className="py-20 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg mb-6">
          I'm an AI/ML enthusiast passionate about building intelligent systems
          and sleek web experiences. Skilled in Python, JavaScript, and cloud
          technologies, I enjoy blending creativity with problem-solving to
          deliver impactful projects.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {["Python", "JavaScript", "React", "Three.js", "Tailwind CSS", "AI/ML"].map((skill) => (
            <div key={skill} className="p-4 bg-gray-100 rounded-lg shadow">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
