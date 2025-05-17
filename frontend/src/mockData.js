// frontend/src/mockData.js
export const courses = [
    {
        id: 'mern-stack-masterclass',
        title: 'MERN Stack Masterclass: Build 3 Real-World Apps',
        instructor: 'Dr. Angela Yu',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg', // Replace with actual or placeholder
        description_short: 'Master the MERN stack (MongoDB, Express, React, Node) by building projects like a pro.',
        description_long: 'Dive deep into the MERN stack and build three impressive, real-world applications from scratch. This course covers everything from basic concepts to advanced techniques, including authentication, state management with Redux, deployment, and more. Perfect for aspiring full-stack developers.',
        price: '₹499',
        rating: 4.7,
        duration: '45.5 hours',
        level: 'All Levels',
        what_you_will_learn: [
            'Build full-stack applications with React, Node, Express & MongoDB.',
            'Understand and implement Authentication & Authorization.',
            'Master Redux for complex state management.',
            'Deploy MERN applications to the cloud.',
            'Work with APIs and asynchronous JavaScript.',
        ],
        modules: [
            { title: 'Introduction to MERN', lessons: ['What is MERN?', 'Setting up Dev Environment'] },
            { title: 'React Deep Dive', lessons: ['Components & Props', 'State & Lifecycle', 'Hooks', 'React Router'] },
            { title: 'Node.js & Express', lessons: ['Building a REST API', 'Middleware', 'Error Handling'] },
            { title: 'MongoDB Essentials', lessons: ['CRUD Operations', 'Data Modeling', 'Mongoose ODM'] },
            { title: 'Project 1: Social Media App', lessons: ['User Profiles', 'Posts & Comments', 'Likes & Follows'] },
        ],
        assessmentId: 'mern-assessment-1'
    },
    {
        id: 'python-for-everybody',
        title: 'Python for Everybody Specialization',
        instructor: 'Charles Severance (Dr. Chuck)',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg',
        description_short: 'Learn the fundamentals of programming using Python 3.',
        description_long: 'This specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you’ll use the technologies learned throughout the Specialization to design and create your own applications for data retrieval, processing, and visualization.',
        price: '₹799',
        rating: 4.8,
        duration: '80 hours',
        level: 'Beginner',
        what_you_will_learn: [
            'Install Python and write your first program.',
            'Describe the basics of the Python programming language.',
            'Use variables to store, retrieve and calculate information.',
            'Utilize core programming tools such as functions and loops.',
        ],
        modules: [
            { title: 'Getting Started with Python', lessons: ['Why Program?', 'Variables and Expressions'] },
            { title: 'Python Data Structures', lessons: ['Lists', 'Dictionaries', 'Tuples'] },
            { title: 'Using Python to Access Web Data', lessons: ['Regular Expressions', 'Networking', 'Web Scraping'] },
        ],
        assessmentId: 'python-assessment-1'
    },
    {
        id: 'javascript-algorithms',
        title: 'JavaScript Algorithms and Data Structures',
        instructor: 'Colt Steele',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg',
        description_short: 'The missing computer science lectures for JavaScript developers.',
        description_long: 'Learn data structures and algorithms with JavaScript. This course covers everything from Big O notation to common data structures like arrays, linked lists, trees, graphs, and sorting algorithms. Improve your problem-solving skills and prepare for technical interviews.',
        price: '₹649',
        rating: 4.6,
        duration: '21.5 hours',
        level: 'Intermediate',
        what_you_will_learn: [
            'Master common data structures.',
            'Implement various sorting algorithms.',
            'Understand Big O notation and algorithm efficiency.',
            'Solve challenging coding problems.',
        ],
        modules: [
            { title: 'Big O Notation', lessons: ['Analyzing Performance', 'Space Complexity'] },
            { title: 'Problem Solving Patterns', lessons: ['Frequency Counters', 'Multiple Pointers'] },
            { title: 'Data Structures', lessons: ['Singly Linked Lists', 'Hash Tables', 'Binary Heaps'] },
        ],
        assessmentId: 'js-assessment-1'
    },
];

export const assessments = {
    'mern-assessment-1': {
        courseId: 'mern-stack-masterclass',
        title: 'MERN Stack Fundamentals Quiz',
        questions: [
            { id: 'q1', text: 'What does MERN stand for?', options: ['MongoDB, Express, React, Node', 'MySQL, Ember, React, Node', 'MongoDB, EJS, Angular, Node'], correctAnswer: 0 },
            { id: 'q2', text: 'Which library is commonly used for routing in React?', options: ['React-Router-DOM', 'Express-Router', 'Node-Route'], correctAnswer: 0 },
            { id: 'q3', text: 'What is MongoDB?', options: ['A SQL database', 'A NoSQL document database', 'A templating engine'], correctAnswer: 1 },
        ]
    },
    'python-assessment-1': {
        courseId: 'python-for-everybody',
        title: 'Python Basics Quiz',
        questions: [
            { id: 'q1', text: 'Which keyword is used to define a function in Python?', options: ['func', 'define', 'def', 'function'], correctAnswer: 2 },
            { id: 'q2', text: 'What is the output of `print(2 ** 3)`?', options: ['6', '8', '5', '9'], correctAnswer: 1 },
        ]
    },
    'js-assessment-1': {
        courseId: 'javascript-algorithms',
        title: 'JavaScript Data Structures Quiz',
        questions: [
            { id: 'q1', text: 'Which of these is NOT a primitive data type in JavaScript?', options: ['String', 'Number', 'Object', 'Boolean'], correctAnswer: 2 },
            { id: 'q2', text: 'What method adds an element to the end of an array?', options: ['array.unshift()', 'array.pop()', 'array.push()', 'array.shift()'], correctAnswer: 2 },
        ]
    },
};