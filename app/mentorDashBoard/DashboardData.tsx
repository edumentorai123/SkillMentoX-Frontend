export const mentorStats = [
  { name: 'My Students', value: 28, change: '+3 this week', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { name: 'Pending Doubts', value: 12, change: '+5 today', color: 'text-orange-700', bgColor: 'bg-orange-50' },
  { name: 'Sessions This Month', value: 45, change: '+8 from last month', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  { name: 'Total Revenue', value: '$3,420', change: '+$240 this week', color: 'text-emerald-700', bgColor: 'bg-emerald-50' }
];

export const studentDoubts = [
  { id: 1, student: 'Alex Johnson', subject: 'React Hooks', time: '2 hours ago', priority: 'high', message: 'Having trouble with useEffect cleanup...' },
  { id: 2, student: 'Sarah Wilson', subject: 'JavaScript Promises', time: '4 hours ago', priority: 'medium', message: 'Can you explain async/await vs promises?' },
  { id: 3, student: 'Mike Chen', subject: 'CSS Grid Layout', time: '6 hours ago', priority: 'low', message: 'Grid template areas not working as expected...' },
  { id: 4, student: 'Emily Davis', subject: 'Node.js APIs', time: '1 day ago', priority: 'high', message: 'REST API authentication issues...' },
  { id: 5, student: 'John Smith', subject: 'Database Design', time: '1 day ago', priority: 'medium', message: 'Need help with MongoDB aggregation...' }
];

export const revenueBreakdown = [
  { month: 'Jan', individual: 1200, group: 800, workshops: 400 },
  { month: 'Feb', individual: 1400, group: 900, workshops: 500 },
  { month: 'Mar', individual: 1600, group: 850, workshops: 450 },
  { month: 'Apr', individual: 1800, group: 1100, workshops: 600 },
  { month: 'May', individual: 2000, group: 1200, workshops: 650 },
  { month: 'Jun', individual: 2200, group: 1300, workshops: 720 }
];

export const pieChartData = [
  { name: 'Individual Sessions', value: 2200, color: '#1887A1' },
  { name: 'Group Sessions', value: 1300, color: '#0D4C5B' },
  { name: 'Workshops', value: 720, color: '#4A90A4' }
];

export const myStudents = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    subject: 'Computer Science', 
    level: 'Advanced', 
    progress: 85, 
    lastSession: '2 days ago',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Sarah Wilson', 
    subject: 'Web Development', 
    level: 'Intermediate', 
    progress: 72, 
    lastSession: '1 day ago',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Mike Chen', 
    subject: 'UI/UX Design', 
    level: 'Beginner', 
    progress: 45, 
    lastSession: '3 days ago',
    status: 'Inactive'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    subject: 'Data Science', 
    level: 'Advanced', 
    progress: 91, 
    lastSession: 'Today',
    status: 'Active'
  }
];

export const sessionData = [
  { id: 1, student: 'Alex Johnson', subject: 'React Advanced Concepts', date: '2024-01-15', time: '10:00 AM', duration: '1 hour', status: 'Completed', rating: 5 },
  { id: 2, student: 'Sarah Wilson', subject: 'JavaScript ES6 Features', date: '2024-01-14', time: '2:00 PM', duration: '45 mins', status: 'Completed', rating: 4 },
  { id: 3, student: 'Mike Chen', subject: 'CSS Grid & Flexbox', date: '2024-01-13', time: '11:00 AM', duration: '1.5 hours', status: 'Completed', rating: 5 },
  { id: 4, student: 'Emily Davis', subject: 'Data Science Basics', date: '2024-01-16', time: '3:00 PM', duration: '1 hour', status: 'Scheduled', rating: null },
  { id: 5, student: 'John Smith', subject: 'Database Design', date: '2024-01-17', time: '9:00 AM', duration: '2 hours', status: 'Scheduled', rating: null }
];

export const performanceData = [
  { month: 'Jan', sessionCount: 32, rating: 4.6, earnings: 2400 },
  { month: 'Feb', sessionCount: 38, rating: 4.7, earnings: 2850 },
  { month: 'Mar', sessionCount: 35, rating: 4.5, earnings: 2625 },
  { month: 'Apr', sessionCount: 42, rating: 4.8, earnings: 3150 },
  { month: 'May', sessionCount: 45, rating: 4.9, earnings: 3375 },
  { month: 'Jun', sessionCount: 48, rating: 4.8, earnings: 3600 }
];