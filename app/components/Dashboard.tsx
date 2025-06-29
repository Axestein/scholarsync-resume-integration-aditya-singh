'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import ResumeUpload from './ResumeUpload';
import ScholarProfile from './ScholarProfile';
import ProjectSuggestions from './ProjectSuggestions';

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const resumeData = useSelector((state: RootState) => state.resume.data);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const renderSkillBadge = (skill, index, category) => {
        const colors = {
            technical: 'from-blue-500 to-purple-600',
            programming: 'from-green-500 to-teal-600',
            tools: 'from-orange-500 to-red-600',
            soft: 'from-pink-500 to-rose-600'
        };
        
        return (
            <div
                key={index}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${colors[category] || 'from-gray-500 to-gray-600'} text-white text-sm font-medium shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
            >
                {skill}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
                <div className="flex space-x-6">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'resume', label: 'Resume' },
                        { id: 'scholar', label: 'Scholar' },
                        { id: 'projects', label: 'Projects' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                activeSection === item.id
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <section id="overview" className="relative min-h-screen flex items-center justify-center px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-8 inline-block">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-2xl">
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                ScholarSync
                            </h1>
                        </div>
                    </div>
                    
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        A premium web application that intelligently analyzes your resume and Google Scholar profile 
                        to suggest personalized research projects. Our AI-powered platform identifies your unique skills, 
                        academic background, and research interests to recommend projects that align with your expertise.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Smart Resume Analysis</h3>
                            <p className="text-gray-400 text-sm">AI-powered parsing extracts skills, education, and experience from your resume</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Scholar Integration</h3>
                            <p className="text-gray-400 text-sm">Seamlessly connects with Google Scholar to analyze your research profile</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Project Recommendations</h3>
                            <p className="text-gray-400 text-sm">Personalized project suggestions based on your unique academic profile</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="resume" className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Resume Intelligence
                        </h2>
                        <p className="text-gray-400 text-lg">Upload and analyze your professional background</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <ResumeUpload />
                        </div>
                        
                        {resumeData && (
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                    <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"></div>
                                    {resumeData.name}
                                </h3>
                                <div className="space-y-4">
                                    {resumeData.contact?.email && (
                                        <div className="flex items-center text-gray-300">
                                            <span className="w-20 text-purple-400">Email:</span>
                                            <span>{resumeData.contact.email}</span>
                                        </div>
                                    )}
                                    {resumeData.contact?.phone && (
                                        <div className="flex items-center text-gray-300">
                                            <span className="w-20 text-purple-400">Phone:</span>
                                            <span>{resumeData.contact.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {resumeData?.skills && (
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
                            <h3 className="text-2xl font-semibold mb-6 text-center">Skills Matrix</h3>
                            <div className="space-y-6">
                                {Object.entries(resumeData.skills).map(([category, skills]) => (
                                    skills.length > 0 && (
                                        <div key={category}>
                                            <h4 className="text-lg font-medium capitalize mb-3 text-purple-300">{category}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {skills.map((skill, index) => renderSkillBadge(skill, index, category))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {resumeData?.experience && resumeData.experience.length > 0 && (
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
                            <h3 className="text-2xl font-semibold mb-6 text-center">Professional Journey</h3>
                            <div className="space-y-6">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-8 border-l-2 border-gradient-to-b from-purple-500 to-blue-500">
                                        <div className="absolute -left-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-lg">{exp.role}</h4>
                                            <p className="text-purple-300 mb-2">{exp.company}</p>
                                            {exp.duration && <p className="text-gray-400 text-sm mb-3">{exp.duration}</p>}
                                            {exp.description && (
                                                <ul className="text-gray-300 text-sm space-y-1">
                                                    {exp.description.map((desc, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="text-purple-400 mr-2">•</span>
                                                            {desc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section id="scholar" className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                            Academic Profile
                        </h2>
                        <p className="text-gray-400 text-lg">Connect your research and scholarly achievements</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                        <ScholarProfile />
                    </div>
                </div>
            </section>

            <section id="projects" className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Personalized Recommendations
                        </h2>
                        <p className="text-gray-400 text-lg">AI-curated projects tailored to your expertise</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
                        <ProjectSuggestions />
                    </div>

                    {resumeData?.projects && resumeData.projects.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {resumeData.projects.map((project, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                                    <h4 className="text-xl font-semibold mb-3 text-purple-300">{project.name}</h4>
                                    <p className="text-gray-300 mb-4">{project.description}</p>
                                    
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full text-xs font-medium border border-purple-500/30">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {project.achievements && project.achievements.length > 0 && (
                                        <div>
                                            <h5 className="font-medium text-blue-300 mb-2">Key Achievements:</h5>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                {project.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-green-400 mr-2">✓</span>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

\            <footer className="relative py-12 px-6 border-t border-white/10">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded-2xl inline-block mb-4">
                        <div className="bg-slate-900 rounded-xl px-6 py-3">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                ScholarSync
                            </h3>
                        </div>
                    </div>
                    <p className="text-gray-400">
                        Empowering researchers and professionals with AI-driven project recommendations
                    </p>
                    <p className="text-gray-400">
                        Made by Aditya
                    </p>
                </div>
            </footer>
        </div>
    );
}