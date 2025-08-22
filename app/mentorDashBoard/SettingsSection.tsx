import React, { useState } from 'react';

export default function SettingsSection() {
    const [formData, setFormData] = useState({
        notifications: {
            emailDoubts: true,
            smsSessions: false,
            pushMessages: true,
            weeklyReports: true,
        },
        sessionDuration: '60 minutes',
        hourlyRate: 50,
        timeZone: 'UTC-8 (Pacific Time)',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prev) => ({
                ...prev,
                notifications: { ...prev.notifications, [name]: checked },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to save settings (e.g., API call)
        console.log('Settings saved:', formData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Email notifications for new student doubts', name: 'emailDoubts' },
                                { label: 'SMS notifications for upcoming sessions', name: 'smsSessions' },
                                { label: 'Push notifications for messages', name: 'pushMessages' },
                                { label: 'Weekly performance reports', name: 'weeklyReports' },
                            ].map((setting, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-700">{setting.label}</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name={setting.name}
                                            checked={formData.notifications[setting.name as keyof typeof formData.notifications]}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-10 h-6 rounded-full transition-colors ${formData.notifications[setting.name as keyof typeof formData.notifications]
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${formData.notifications[setting.name as keyof typeof formData.notifications]
                                                        ? 'translate-x-5'
                                                        : 'translate-x-1'
                                                    } mt-1`}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Default Session Duration
                                </label>
                                <select
                                    name="sessionDuration"
                                    value={formData.sessionDuration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>30 minutes</option>
                                    <option>45 minutes</option>
                                    <option>60 minutes</option>
                                    <option>90 minutes</option>
                                    <option>120 minutes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        name="hourlyRate"
                                        value={formData.hourlyRate}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                                <select
                                    name="timeZone"
                                    value={formData.timeZone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>UTC-8 (Pacific Time)</option>
                                    <option>UTC-5 (Eastern Time)</option>
                                    <option>UTC+0 (GMT)</option>
                                    <option>UTC+5:30 (India Standard Time)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}