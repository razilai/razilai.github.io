export const profile = {
    name: 'Ilai Raz',
    role: 'Data Science & Engineering',
    school: 'Technion',
    location: 'Tel Aviv, Israel',
    summary:
        'Honors student in Data Science & Engineering @ Technion. I like applying data science and statistic to solve real-world problems',
    links: {
        github: 'https://github.com/razilai',
        linkedin: 'https://www.linkedin.com/in/ilai-raz',
        email: 'ilairaz120@gmail.com',
    },
};

export const education = {
    degree: 'B.Sc., Data Science & Engineering',
    school: 'Technion – Israel Institute of Technology',
    date: 'Expected 10/2027',
    highlights: ['GPA 92.9/100'],
};

export type Group = { label: string; items: string[] };

// `icon`: a Simple Icons slug (https://simpleicons.org) or a key of `fallbackTechIcons` in ./icons.ts
export type Tech = { name: string; icon: string };

export const techStack: { label: string; items: Tech[] }[] = [
    {
        label: 'Programming',
        items: [
            { name: 'Python', icon: 'python' },
            { name: 'SQL', icon: 'sql' },
            { name: 'R', icon: 'r' },
            { name: 'Java', icon: 'openjdk' },
            { name: 'C', icon: 'c' },
        ],
    },
    {
        label: 'Data & ML',
        items: [
            { name: 'pandas', icon: 'pandas' },
            { name: 'NumPy', icon: 'numpy' },
            { name: 'SciPy', icon: 'scipy' },
            { name: 'Matplotlib', icon: 'chart' },
            { name: 'PyTorch', icon: 'pytorch' },
            { name: 'PySpark', icon: 'apachespark' },
            { name: 'Databricks', icon: 'databricks' },
        ],
    },
    {
        label: 'Engineering',
        items: [
            { name: 'Git', icon: 'git' },
            { name: 'Docker', icon: 'docker' },
            { name: 'Linux', icon: 'linux' },
            { name: 'Bash', icon: 'gnubash' },
            { name: 'FastAPI', icon: 'fastapi' },
        ],
    },
];
