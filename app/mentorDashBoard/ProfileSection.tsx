import React, { useState } from 'react';

export default function ProfileSection() {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        specialization: 'Full Stack Development, React, Node.js',
        bio: 'Experienced software developer with 5+ years in web development. Passionate about teaching and helping students achieve their coding goals.',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to save form data (e.g., API call)
        console.log('Form submitted:', formData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-2xl mb-4">
                            JD
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                            Change Photo
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        firstName: 'John',
                                        lastName: 'Doe',
                                        email: 'john.doe@example.com',
                                        specialization: 'Full Stack Development, React, Node.js',
                                        bio: 'Experienced software developer with 5+ years in web development. Passionate about teaching and helping students achieve their coding goals.',
                                    })
                                }
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML', 'MongoDB', 'Express.js', 'Git', 'AWS'].map(
                        (skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        )
                    )}
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Add More Skills
                </button>
            </div>
        </div>
    );
}