'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchScholarProfile } from '../store/slices/scholarSlice';
import toast from 'react-hot-toast';

interface Publication {
    title: string;
    authors: string;
    year: string;
    citations: number;
}

interface ScholarData {
    name: string;
    researchInterests: string[];
    citationCount: number;
    publications: Publication[];
}

export default function ScholarProfile() {
    const [url, setUrl] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { data: profileData, loading, error } = useSelector((state: RootState) => state.scholar);

    const validateScholarUrl = (url: string): boolean => {
        try {
            const urlObj = new URL(url);
            const validDomains = ['scholar.google.com', 'scholar.google.co.in'];
            return (
                validDomains.includes(urlObj.hostname) &&
                urlObj.pathname.startsWith('/citations') &&
                urlObj.searchParams.has('user')
            );
        } catch {
            return false;
        }
    };

    const normalizeScholarUrl = (url: string): string => {
        try {
            const urlObj = new URL(url);
            const userId = urlObj.searchParams.get('user');
            if (!userId) return url;
            return `https://scholar.google.com/citations?user=${userId}`;
        } catch {
            return url;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedUrl = url.trim().replace(/\/+$/, '');

        if (!trimmedUrl) {
            toast.error('Please enter a Google Scholar URL');
            return;
        }

        if (!validateScholarUrl(trimmedUrl)) {
            toast.error('Please enter a valid Google Scholar profile URL');
            return;
        }

        try {
            const normalizedUrl = normalizeScholarUrl(trimmedUrl);
            await dispatch(fetchScholarProfile(normalizedUrl)).unwrap();
            toast.success('Profile fetched successfully!');
        } catch (error: any) {
            console.error('Error fetching profile:', error);
            toast.error(error.message || 'Failed to fetch profile');
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-20">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Academic Profile
                    </h2>
                    <p className="text-gray-400 text-lg">Connect your research and scholarly achievements</p>
                </div>

                {/* Input Card */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="scholarUrl" className="block text-lg font-medium text-gray-300 mb-2">
                                Google Scholar Profile URL
                            </label>
                            <input
                                type="url"
                                id="scholarUrl"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://scholar.google.com/citations?user=..."
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                disabled={loading}
                            />
                            <p className="mt-2 text-sm text-gray-400">
                                Example: <span className="text-blue-300">https://scholar.google.com/citations?user=USER_ID</span>
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                loading
                                    ? 'bg-blue-600/50 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Fetching Profile...
                                </div>
                            ) : (
                                'Fetch Profile'
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-8 p-4 bg-red-500/20 backdrop-blur-lg rounded-lg border border-red-400/30 flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-300">{error}</span>
                    </div>
                )}

                {/* Loading State */}
                {loading && !profileData && (
                    <div className="space-y-8">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-white/10 rounded w-1/3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="animate-pulse space-y-4">
                                <div className="h-6 bg-white/10 rounded w-1/4"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-4 bg-white/10 rounded"></div>
                                    <div className="h-4 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Data Display */}
                {profileData && !loading && (
                    <div className="space-y-8">
                        {/* Profile Summary Card */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        {profileData.name}
                                    </h2>
                                    <div className="mt-2">
                                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                                            Google Scholar Profile
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 p-4 rounded-xl border border-blue-500/30">
                                    <p className="text-sm text-blue-300 mb-1">Total Citations</p>
                                    <p className="text-3xl font-bold text-white">
                                        {profileData.citationCount.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Research Interests */}
                            {profileData.researchInterests?.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4 text-white">Research Interests</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {profileData.researchInterests.map((interest, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white border border-purple-500/30"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Publications Card */}
                        {profileData.publications?.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                                    <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full mr-3"></div>
                                    Publications
                                </h3>
                                <div className="space-y-6">
                                    {profileData.publications.map((pub, index) => (
                                        <div key={index} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                                            <h4 className="text-xl font-medium text-white mb-2">{pub.title}</h4>
                                            <p className="text-gray-300 mb-3">{pub.authors}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-blue-300">{pub.year}</span>
                                                <span className="text-white/50">•</span>
                                                <span className="text-teal-300">
                                                    {pub.citations} citation{pub.citations !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}