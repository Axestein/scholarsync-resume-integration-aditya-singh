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
            toast.success('Research project suggestions generated successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate suggestions');
        }
    };

    return (
        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                    Research Project Recommendations
                </h3>
                <button
                    onClick={handleGenerate}
                    disabled={loading || !resumeData}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                        loading || !resumeData
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                >
                    {loading ? 'Generating Suggestions...' : 'Generate Recommendations'}
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 rounded-md border border-red-200">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {loading && (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-50 rounded-md p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                            <div className="flex gap-2 mb-4">
                                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {suggestions?.length > 0 && (
                <div className="grid gap-6">
                    {suggestions.map((project, i) => (
                        <div key={i} className="bg-white rounded-md p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-medium text-gray-900">{project.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    project.difficultyLevel === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                                    project.difficultyLevel === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                    {project.difficultyLevel}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, j) => (
                                    <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="mt-4">
                                <h5 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
                                    Expected Learning Outcomes
                                </h5>
                                <ul className="space-y-2 text-gray-600">
                                    {project.learningOutcomes.map((outcome, k) => (
                                        <li key={k} className="flex items-start">
                                            <span className="text-gray-400 mr-3 text-sm">•</span>
                                            <span className="leading-relaxed">{outcome}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {suggestions?.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No project recommendations available yet.</p>
                    <p className="text-sm text-gray-400">
                        Upload your resume and research profile to receive personalized project suggestions.
                    </p>
                </div>
            )}
        </div>
    );
}