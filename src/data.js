import movie from './imges/movieApp.png'
import lms from './imges/Lms.png'
import Xox from './imges/XoxGame.png'

export const projects = [
  {
    title: 'Movie Trailer App',
    description: 'The Movie Trailer Application lets users easily discover and watch trailers for the latest movies and TV shows. With a simple, user-friendly interface, you can search for titles, explore trending content, and enjoy high-quality previews—all in one place. Stay updated on the newest blockbusters and find your next favorite film quickly',
    image: movie,
    techStack: ['React', 'Css','Javascript','RestApi'],
    githubUrl: 'https://github.com/Aadithyanas/MovieTrailerApp',
    liveUrl: 'https://sensational-centaur-321178.netlify.app/'
  },
  {
    title: 'Library Management System',
    description: 'The Library Management System is a web-based application designed to streamline the management of library resources. It allows users to easily search, borrow, and return books, while administrators can manage book inventory, track transactions, and monitor user activity. This system helps improve efficiency and organization within a library.',
    image: lms,
    techStack: ['React', 'Firebase', 'Tailwind','Css','JavaScript'],
    githubUrl: 'https://github.com/Aadithyanas/LibarayMangementSysytem',
    liveUrl: 'https://curious-chaja-48876c.netlify.app/'
  },
  {
    title: 'TicTacToe',
    description: 'The Tic-Tac-Toe Game is a simple, interactive web application where two players take turns marking spaces on a 3x3 grid. The goal is to be the first to get three marks in a row, either horizontally, vertically, or diagonally. The game detects the winner or a tie and includes a reset option to start a new game. Designed with a clean and responsive interface, this classic game is perfect for quick, fun gameplay!.',
    image:Xox,
    techStack: ['React', 'Firebase', 'Tailwind','Css','JavaScript'],
    githubUrl: 'https://github.com/Aadithyanas/TictactoeGame',
    liveUrl: 'https://famous-liger-36e87a.netlify.app/'
  }
];

export const skills = [
  { 
    name: 'HTML', 
    icon: 'FileCode2',
    proficiency: 95,
    color: 'from-orange-400 to-red-500'
  },
  { 
    name: 'CSS', 
    icon: 'Palette',
    proficiency: 90,
    color: 'from-blue-400 to-indigo-500'
  },
  { 
    name: 'JavaScript', 
    icon: 'Sparkles',
    proficiency: 92,
    color: 'from-yellow-400 to-orange-500'
  },
  { 
    name: 'React', 
    icon: 'Atom',
    proficiency: 88,
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    name: 'Node.js', 
    icon: 'Cpu',
    proficiency: 85,
    color: 'from-green-400 to-emerald-500'
  },
  { 
    name: 'Express.js', 
    icon: 'Workflow',
    proficiency: 82,
    color: 'from-gray-400 to-gray-600'
  },
  { 
    name: 'MongoDB', 
    icon: 'Database',
    proficiency: 80,
    color: 'from-green-500 to-emerald-600'
  },
  { 
    name: 'PostgreSQL', 
    icon: 'TableProperties',
    proficiency: 78,
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    name: 'Git', 
    icon: 'GitFork',
    proficiency: 88,
    color: 'from-orange-500 to-red-600'
  },
  { 
    name: 'Docker', 
    icon: 'Container',
    proficiency: 75,
    color: 'from-blue-400 to-blue-600'
  }
];