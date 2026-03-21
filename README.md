# Categorize

A simple personal app for categorizing images.

Built with Express, it allows you to organize images into categories and compress them into ZIP files. Uncategorized files are ignored.

The configuration is done manually via `categories.json` and `parse-data.sh`. See [Categorization](#categorization).

## Categorization

The app uses images within `public/files`, but from the frontend, it's not possible to list the files within the folder itself. Therefore, the frontend looks for `public/files/data.json` and, through it, identifies all the files that are expected to be there. Similarly, `public/categories.json` lists the categories.

Upon download, the categorized files are compressed into a ZIP file and separated according to the namespace of the category they were labeled with. See [Configuration](#configuration).

### Configuration

It's known that manually listing each file is laborious, so run `parse-data.sh`. Place all the desired image files inside `public/files` and run `parse-data.sh` (ensure you are in the project root when running).

For the categorization part, modify `public/categories.json` following this scheme:

```json
[
    ["#name", "#namespace"],
    ["#name", "#namespace"],
    ["#name", "#namespace"]
]
```

**#name** is how the category button is displayed. **#namespace** is how the category is identified. Example:

```json
[
    ["Category #1", "cat1"],
    ["Category #2", "cat2"],
    ["Category #3", "cat3"]
]
```

### Labeling

Images are displayed in a 9:16 preview by default. Double-tap the screen to view the image in full screen, and double-tap again to return to the preview.

To label an image, tap the appropriate category button. After a selection is made, the next image is displayed automatically, allowing for fast and continuous labeling.

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

   # Edit public/categories.json with your preferred text editor
   notepad.exe public/categories.json
   ```

3. Run the app:
   ```bash
   # Make sure you have an internet connection
   node index.js
   ```
