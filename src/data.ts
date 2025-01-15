import { Project, Skill } from './types';

export const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800',
    techStack: ['React', 'Firebase', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com'
  }
];

export const skills: Skill[] = [
  { name: 'HTML', icon: 'Code2' },
  { name: 'CSS', icon: 'Paintbrush' },
  { name: 'JavaScript', icon: 'FileCode' },
  { name: 'React', icon: 'Component' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'Express.js', icon: 'Router' },
  { name: 'MongoDB', icon: 'Database' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'Git', icon: 'GitBranch' },
  { name: 'Docker', icon: 'Box' }
];