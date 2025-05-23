const fs = require("fs");
const path = require("path");

const postsDir = path.resolve(process.cwd(), "posts");
const attachmentsDir = "C:\\Users\\3adas\\OneDrive\\Notes\\files"; // adjust if your images are here
const staticImagesDir = path.resolve(process.cwd(),"public", "images");
console.log("staticImagesDir:", staticImagesDir);

async function processMarkdownFiles() {
  try {
    const filenames = await fs.promises.readdir(postsDir);
    console.log(
      "Detected markdown files:",
      filenames.filter((f) => f.endsWith(".md"))
    );

    for (const filename of filenames) {
      if (!filename.endsWith(".md")) continue;

      console.log("Processing file:", filename);

      const filePath = path.join(postsDir, filename);
      let content = await fs.promises.readFile(filePath, "utf-8");

      // Match Obsidian style image links ![[image.extension]]
      const imageRegex =
        /!\[\[([^|\]]+\.(?:png|jpe?g|gif|bmp|webp|svg))(?:\|.*?)?\]\]/gi;
      const images = [...content.matchAll(imageRegex)];

      if (images.length === 0) {
        console.log("No images found in", filename);
      } else {
        console.log(
          `Found ${images.length} images in ${filename}:`,
          images.map((m) => m[1])
        );
      }

      for (const match of images) {
        const originalSyntax = match[0];
        const imageName = match[1];

        console.log(
          `Processing image link '${originalSyntax}' in file '${filename}'`
        );

        // Create markdown image syntax with URL encoded spaces
        const markdownImage =
          "![](/my-new-blog/images/" + imageName.replace(/ /g, "%20") + ")";

        // Replace Obsidian syntax with markdown image
        content = content.replaceAll(originalSyntax, markdownImage);

        // Copy image file if exists
        const imageSourcePath = path.join(attachmentsDir, imageName);
        const imageDestPath = path.join(staticImagesDir, imageName);

        try {
          await fs.promises.mkdir(path.dirname(imageDestPath), {
            recursive: true,
          });
          if (fs.existsSync(imageSourcePath)) {
            await fs.promises.copyFile(imageSourcePath, imageDestPath);
            console.log(
              `Copied image from ${imageSourcePath} to ${imageDestPath}`
            );
          } else {
            console.warn("Image not found: " + imageSourcePath);
          }
        } catch (copyError) {
          console.error("Error copying image " + imageName + ":", copyError);
        }
      }

      // Write updated content back to file
      await fs.promises.writeFile(filePath, content, "utf-8");
      console.log(`Updated file written: ${filePath}`);
    }

    console.log("Markdown files processed and images copied successfully.");
  } catch (err) {
    console.error("Error processing markdown files:", err);
  }
}

processMarkdownFiles();
