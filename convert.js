const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertPngToWebp(inputDir, outputDir) {
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Input directory "${inputDir}" does not exist.`);
        return;
    }

    const outputDirPath = path.join(inputDir, outputDir);
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
        console.log(`Created output directory: ${outputDirPath}`);
    }

    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.png') {
                const inputFilePath = path.join(inputDir, file);
                const outputFileName = path.basename(file, '.png') + '.webp';
                const outputFilePath = path.join(outputDirPath, outputFileName);

                sharp(inputFilePath)
                    .webp()
                    .toFile(outputFilePath, (err, info) => {
                        if (err) {
                            console.error(`Error converting ${file}: ${err.message}`);
                        } else {
                            console.log(`Converted ${file} to ${outputFileName}`);
                        }
                    });
            }
        });
    });
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: node convert.js <input_directory> [output_folder_name]');
    console.log('  <input_directory>: The directory containing PNG images.');
    console.log('  [output_folder_name]: Optional. The name of the folder to create inside the input directory for WebP images. Defaults to "webp_images".');
    process.exit(1);
}

const inputDirectory = args[0];
const outputFolderName = args[1] || 'webp_images';

convertPngToWebp(inputDirectory, outputFolderName); 