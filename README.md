# urlshortener

## Product Requirements:
- The front end should be a single page app that allows the user to:
- Input any URL to get a shortened version of it
- See a list of previously shortened URLs
- Expire/delete any previous URLs
- The user should optionally be able to provide a custom slug to be used as the path in the shortened URL.

## Technology Stack
- React 17 with TypeScript
- Vite for build tooling and development server
- Vitest for testing
- Axios for API calls

## Running the project

1. Download dependencies with npm or yarn
```bash
$ npm install
# or
$ yarn install
```

2. Make sure there is a .env file which includes api url and key with `VITE_` prefix
```
VITE_API_BASE_URL=https://api.bely.me
VITE_API_KEY=your_api_key_here
```

3. Run dev build
```bash
$ npm start
# or
$ npm run dev
```

4. Build for prod
```bash
$ npm run build
```

5. Preview production build
```bash
$ npm run preview
```

6. Run unit tests
```bash
$ npm run test
```
