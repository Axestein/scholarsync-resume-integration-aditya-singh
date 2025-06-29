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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const renderSkillBadge = (
        skill: string,
        index: number,
        category: 'technical' | 'programming' | 'tools' | 'soft'
    ) => {
        const colors = {
            technical: 'bg-blue-50 text-blue-700 border-blue-200',
            programming: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            tools: 'bg-orange-50 text-orange-700 border-orange-200',
            soft: 'bg-purple-50 text-purple-700 border-purple-200'
        };
        
        return (
            <div
                key={index}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium shadow-sm transform hover:scale-105 transition-all duration-300 hover:shadow-md ${
                    colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
            >
                {skill}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 relative">
\            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-xl rounded-full px-8 py-4 border border-gray-200 shadow-lg">
                <div className="flex space-x-8">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'resume', label: 'Resume' },
                        { id: 'scholar', label: 'Scholar' },
                        { id: 'projects', label: 'Projects' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-5 py-2 rounded-full transition-all duration-300 font-medium ${
                                activeSection === item.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <section id="overview" className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white via-blue-50 to-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-4 inline-block">
                            <h1 className="text-6xl font-bold text-gray-900">
                                ScholarSync
                            </h1>
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        A premium academic platform that intelligently analyzes your resume and Google Scholar profile 
                        to suggest personalized research projects based on your skills, education, and scholarly achievements.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Resume Analysis</h3>
                            <p className="text-gray-600 leading-relaxed">Advanced AI parsing extracts skills, education, and experience from your academic resume with precision</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mb-6 flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Scholar Integration</h3>
                            <p className="text-gray-600 leading-relaxed">Seamlessly connects with Google Scholar to analyze your research profile and academic contributions</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl mb-6 flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Project Recommendations</h3>
                            <p className="text-gray-600 leading-relaxed">AI-curated research project suggestions tailored to your unique academic and professional profile</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="resume" className="relative py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Resume Intelligence
                        </h2>
                        <p className="text-gray-600 text-lg">Your complete professional and academic profile</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-4"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <ResumeUpload />
                        </div>
                        
                        {resumeData && (
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                                    {resumeData.name}
                                </h3>
                                <div className="space-y-4">
                                    {resumeData.contact?.email && (
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-20 text-blue-600 font-medium">Email:</span>
                                            <span>{resumeData.contact.email}</span>
                                        </div>
                                    )}
                                    {resumeData.contact?.phone && (
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-20 text-blue-600 font-medium">Phone:</span>
                                            <span>{resumeData.contact.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {resumeData?.skills && (
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg mb-8">
                            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Skills & Expertise</h3>
                            <div className="space-y-8">
                                {Object.entries(resumeData.skills).map(([category, skills]) => (
                                    skills.length > 0 && (
                                        <div key={category}>
                                            <h4 className="text-lg font-semibold capitalize mb-4 text-gray-800 border-b border-gray-100 pb-2">
                                                {category} Skills
                                            </h4>
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
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg mb-8">
                            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Professional Journey</h3>
                            <div className="space-y-8">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-8 border-l-2 border-blue-200">
                                        <div className="absolute -left-2 w-4 h-4 bg-blue-600 rounded-full shadow-md"></div>
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                            <h4 className="font-bold text-xl text-gray-900 mb-1">{exp.role}</h4>
                                            <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                                            {exp.duration && <p className="text-gray-500 text-sm mb-4">{exp.duration}</p>}
                                            {exp.description && (
                                                <ul className="text-gray-700 space-y-2">
                                                    {exp.description.map((desc, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="text-blue-500 mr-3 mt-1">•</span>
                                                            <span className="leading-relaxed">{desc}</span>
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

                    {resumeData?.projects && resumeData.projects.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg mb-8">
                            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Projects & Achievements</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {resumeData.projects.map((project, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                        <h4 className="text-xl font-bold mb-3 text-blue-700">{project.name}</h4>
                                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                                        
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="mb-4">
                                                <h5 className="font-semibold text-gray-800 mb-3">Technologies:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, i) => (
                                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {project.achievements && project.achievements.length > 0 && (
                                            <div>
                                                <h5 className="font-semibold text-gray-800 mb-3">Key Achievements:</h5>
                                                <ul className="text-gray-700 space-y-2">
                                                    {project.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <span className="text-emerald-500 mr-3 mt-1">✓</span>
                                                            <span className="text-sm leading-relaxed">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section id="scholar" className="relative py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto">

                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <ScholarProfile />
                    </div>
                </div>
            </section>

            <section id="projects" className="relative py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Research Recommendations
                        </h2>
                        <p className="text-gray-600 text-lg">AI-curated projects tailored to your academic expertise</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mt-4"></div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <ProjectSuggestions />
                    </div>
                </div>
            </section>

            <footer className="relative py-12 px-6 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="bg-white p-1 rounded-2xl inline-block mb-6">
                        <div className="bg-gray-900 rounded-xl px-8 py-4">
                            <h3 className="text-2xl font-bold text-white">
                                ScholarSync
                            </h3>
                        </div>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Empowering researchers and scholars with AI-driven project recommendations
                    </p>
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <p className="text-gray-400 text-sm">
                            Made By Aditya
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}