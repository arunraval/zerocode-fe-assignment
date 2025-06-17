# Project Setup

To set up and run this project, follow these steps:

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd zerocode-fe-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Development Server

To run the project in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

## Running in Production

To start the production server:

```bash
npm run start
# or
yarn start
```

## Linting and Formatting

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

# Architecture Diagram

graph TD
A[User] --> B(Browser);
B --> C{Next.js App};

    C --> D[app/layout.tsx];
    C --> E[app/page.tsx];

    E --> F[app/login/page.tsx];
    E --> G[app/register/page.tsx];

    F --> H[app/components/auth/LoginForm.tsx];
    G --> I[app/components/auth/RegisterForm.tsx];

    H --> J(app/api/auth/login/route.ts);
    I --> K(app/api/auth/register/route.ts);

    J --> L[app/context/AuthContext.tsx];
    K --> L;
    L --> M[app/utils/jwt.ts];
    L --> N[app/utils/userStore.ts];
    J --> O[data/users.json];
    K --> O;

    C --> P[app/components/ThemeProvider.tsx];
    P --> Q[app/context/ThemeContext.tsx];

    C --> R[app/components/Chat.tsx];
    R --> S(app/api/chat/route.ts);
