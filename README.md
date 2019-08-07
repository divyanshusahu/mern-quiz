# Basic Quiz App

**[Live Demo](https://xyz-mern-stack.herokuapp.com/)**

#### Features

- Register
- Login
- Protected page only visible to logged in users
- Logout
- Authenticated user can add quiz
- Any user can attend the quiz

#### Start Development server

```bash
cd frontend
npm install
cd ..
npm install
npm run dev
```

#### Dependencies

An Account on [mLab](https://mlab.com/). Get your [MongoDB URI](https://docs.mlab.com/connecting/) then export it as an environment variable MLAB_URI.

```bash
export MLAB_URI="YOUR_URI_HERE"
export SECRET="a_very_long_secret"
```