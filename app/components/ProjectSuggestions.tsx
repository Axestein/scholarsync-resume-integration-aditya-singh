'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchSuggestions } from '@/app/store/slices/suggestionsSlice';
import toast from 'react-hot-toast';

export default function ProjectSuggestions() {
    const dispatch = useDispatch<AppDispatch>();
    const { suggestions, loading, error } = useSelector((state: RootState) => state.suggestions);
    const { data: resumeData } = useSelector((state: RootState) => state.resume);
    const { data: scholarData } = useSelector((state: RootState) => state.scholar);

    const handleGenerate = async () => {
        if (!resumeData?.skills) {
            toast.error('Upload your resume first');
            return;
        }

        try {
            const skills = Object.values(resumeData.skills).flat();
            const interests = scholarData?.researchInterests || [];
            await dispatch(fetchSuggestions({ skills, interests })).unwrap();
            toast.success('Suggestions generated!');
        } catch (error: any) {
            toast.error(error.message || 'Generation failed');
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Project Recommendations
                </h3>
                <button
                    onClick={handleGenerate}
                    disabled={loading || !resumeData}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        loading || !resumeData
                            ? 'bg-blue-600/50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                    }`}
                >
                    {loading ? 'Generating...' : 'Get Suggestions'}
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/20 rounded-lg border border-red-400/30">
                    <p className="text-red-300">{error}</p>
                </div>
            )}

            {loading && (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white/10 rounded-xl p-6 animate-pulse h-40"></div>
                    ))}
                </div>
            )}

            {suggestions?.length > 0 && (
                <div className="grid gap-6">
                    {suggestions.map((project, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    project.difficultyLevel === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                                    project.difficultyLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                }`}>
                                    {project.difficultyLevel}
                                </span>
                            </div>
                            
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, j) => (
                                    <span key={j} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="mt-4">
                                <h5 className="text-sm font-medium text-blue-300 mb-2">LEARNING OUTCOMES</h5>
                                <ul className="space-y-2 text-gray-300">
                                    {project.learningOutcomes.map((outcome, k) => (
                                        <li key={k} className="flex items-start">
                                            <span className="text-green-400 mr-2">✓</span>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}