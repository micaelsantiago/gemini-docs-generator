const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function readSourceCode(directory) {
    let sourceFiles = [];

    function readDir(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                readDir(fullPath);
            } else if (fullPath.endsWith('.php') || fullPath.endsWith('.js') || fullPath.endsWith('.py') || fullPath.endsWith('.java')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                sourceFiles.push({ path: fullPath, content });
            }
        });
    }

    readDir(directory);
    return sourceFiles;
}

async function generateDocumentation(sourceFiles) {
    const docsDir = path.resolve(__dirname, 'docs');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    for (let file of sourceFiles) {
        try {
            const prompt = `Gere a documentação em português para o seguinte código:\n\n${file.content}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            const outputPath = path.join(docsDir, `${path.basename(file.path, path.extname(file.path))}.md`);

            fs.writeFileSync(outputPath, text);

            console.log(`Documentação gerada para ${file.path}`);
        } catch (error) {
            console.error(`Erro ao gerar documentação para ${file.path}:`, error.message);
        }
    }
}

async function main() {
    const sourceCodeDir = path.resolve(process.env.PROJECT_PATH);
    const sourceFiles = readSourceCode(sourceCodeDir);

    await generateDocumentation(sourceFiles);
}

main();
