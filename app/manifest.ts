import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SkillMentorX',
    short_name: 'SkillMentorX',
    description: 'Learn Smarter with AI + Human Mentorship',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/skillmentorX.tm.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
