# Categorize

A simple personal app for categorizing images.

Built with Express, it allows you to organize images into categories and compress them into ZIP files. Uncategorized files are ignored.

The app configuration is done in [`main.js`](https://github.com/perrofaaias/categorize/blob/main/public/main.js).

> This project is considered complete and will be archived. No further updates are planned.

## Installation

Clone the repository, install dependencies, configure, and run the app.

1. Clone and install dependencies:
   ```bash
   # Clone the repository.
   git clone https://github.com/perrofaaias/categorize.git
   cd  categorize/
   
   # Install the NPM dependencies.
   npm install
   ```

2. Configuration:
   ```bash
   # Copy your images to the public/files directory
   cp file1.jpg file2.png file3.jpeg public/files/
   
   # From the project root directory,
   # run the script to generate data.json entries
   ./parse-data.sh
   ```

3. Run the app:
   ```bash
   # Make sure you have an internet connection
   node index.js
   ```
