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
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white text-gray-900">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.15) 1px, transparent 0)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">
                        Academic Profile Integration
                    </h2>
                    <p className="text-gray-600 text-lg">Connect your Google Scholar profile to analyze your research contributions</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mx-auto mt-4"></div>
                </div>

                {/* Input Card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg mb-8">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5.242 13.769L0.5 9.5 12 1l11.5 8.5-4.742 4.269C17.548 14.52 14.529 15.5 11.999 15.5c-2.547 0-5.583-.98-6.757-1.731zM12 3.188L2.5 9.5l3.5 3.5c.614.213 2.951.813 5.999.813s5.385-.6 6-.813L21.5 9.5 12 3.188z"/>
                                <path d="M12 15.5c-3.5 0-6.5-1-6.5-1l-.5 4.5c0 1 2 2 7 2s7-1 7-2L18.5 14.5s-3 1-6.5 1z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Google Scholar Integration</h3>
                            <p className="text-gray-600">Import your academic profile and research metrics</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="scholarUrl" className="block text-lg font-semibold text-gray-800 mb-3">
                                Scholar Profile URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="scholarUrl"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://scholar.google.com/citations?user=..."
                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300"
                                    disabled={loading}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700 flex items-start">
                                    <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                                    </svg>
                                    <span>
                                        <strong>Example:</strong> https://scholar.google.com/citations?user=USER_ID<br/>
                                        Find your profile URL by visiting Google Scholar and clicking on your profile.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-lg">Analyzing Academic Profile...</span>
                                </div>
                            ) : (
                                <span className="text-lg">Import Scholar Profile</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-8 p-4 bg-red-50 rounded-xl border-2 border-red-200 flex items-start shadow-md">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-800 mb-1">Profile Import Failed</h4>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && !profileData && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                            <div className="animate-pulse space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                            <div className="animate-pulse space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Data Display */}
                {profileData && !loading && (
                    <div className="space-y-8">
                        {/* Profile Summary Card */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V11H19V19H5V3H13V9H21Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                                {profileData.name}
                                            </h2>
                                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                                                Google Scholar Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-2xl border-2 border-blue-200 text-center min-w-[200px]">
                                    <p className="text-sm font-medium text-blue-600 mb-2">Total Citations</p>
                                    <p className="text-4xl font-bold text-gray-900 mb-1">
                                        {profileData.citationCount.toLocaleString()}
                                    </p>
                                    <div className="flex items-center justify-center text-emerald-600">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="text-sm font-medium">Academic Impact</span>
                                    </div>
                                </div>
                            </div>

                            {/* Research Interests */}
                            {profileData.researchInterests?.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        Research Interests & Expertise
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {profileData.researchInterests.map((interest: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200 font-medium hover:shadow-md transition-shadow duration-300"
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
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                                <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-4"></div>
                                    Recent Publications
                                    <span className="ml-3 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                        {profileData.publications.length} {profileData.publications.length === 1 ? 'Paper' : 'Papers'}
                                    </span>
                                </h3>
                                <div className="space-y-6">
                                    {profileData.publications.map((pub: Publication, index: number) => (
                                        <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50 rounded-lg p-4 -m-4 transition-colors duration-300">
                                            <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                                                {pub.title}
                                            </h4>
                                            <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                                                {pub.authors}
                                            </p>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center text-blue-600">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="font-semibold">{pub.year}</span>
                                                </div>
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                <div className="flex items-center text-emerald-600">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                    <span className="font-semibold">
                                                        {pub.citations.toLocaleString()} citation{pub.citations !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-emerald-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-emerald-800 mb-1">Profile Successfully Imported</h4>
                                    <p className="text-emerald-700">Your academic profile has been analyzed and is ready for project recommendations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}