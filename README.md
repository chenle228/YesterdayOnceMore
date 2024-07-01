Yesterday Once More
Overview
This project is an android mobile application developed using React Native. The app features journaling, task management, calendar integration, and a Pomodoro timer. It aims to help users manage their time and tasks efficiently.

Tech Stack
Frontend Framework: React Native
Backend: Node.js
Database: Supabase
Version Control: Git and GitHub
UI Components: React Native Elements

Features
Journaling: Create and manage daily journal entries.
To-do List: Add, edit, and delete tasks.
Calendar Integration: View tasks and journal entries on a calendar.
Pomodoro Timer: Manage focused work sessions.

Environment Setup
Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from here.
npm or Yarn: Node package manager (npm) is installed with Node.js. Alternatively, you can use Yarn.
Git: Install Git from here.
React Native CLI: Install React Native CLI globally using the following command:
sh
Copy code
npm install -g react-native-cli
Android Studio: Required for Android development. Download it from here.

Cloning the Repository
sh
Copy code
git clone https://github.com/chenleeee/YesterdayOnceMore.git
cd YesterdayOnceMore
Installing Dependencies
Install project dependencies using npm or Yarn:

sh
Copy code
npm install
# or
yarn install
Setting Up Supabase
Create an account at Supabase.
Create a new project and note down the URL and anon key.
Create a .env file in the root of your project and add the following:
env
Copy code
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Running the Application
For Android
Start Android Studio and open the AVD Manager.
Create a new Virtual Device if you don’t have one.
Start the emulator.
In the project directory, run:
sh
Copy code
npx react-native run-android
