
# Gerador de Documentação para Código Fonte usando Google Generative AI

Este projeto é um gerador de documentação automatizado que utiliza a API do Google Generative AI para criar documentação em português para arquivos de código fonte de diferentes linguagens, como PHP, JavaScript, Python e Java. A documentação gerada é salva em arquivos Markdown (`.md`).

## Requisitos

- Node.js (versão 14 ou superior)
- Uma chave de API do Google Generative AI
- Dependências listadas no `package.json`

## Instalação

1. Clone este repositório para sua máquina local.

   ```javascript
   git clone https://github.com/your-username/gemini-docs-generator.git
   cd gemini-docs-generator
   ```

2. Instale as dependências necessárias.

   ```javascript
   npm install
   ```

3. Configure suas variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione a chave de API do Google Generative AI e o caminho do projeto que deseja documentar.

   ```javascript
   GEMINI_API_KEY=your-google-api-key
   PROJECT_PATH=/caminho/para/seu/projeto
   ```

## Uso

1. Execute o script para gerar a documentação:

   ```javascript
   npm start
   ```

2. A documentação gerada será salva na pasta `docs`, com um arquivo `.md` para cada arquivo de código-fonte processado.

## Estrutura do Projeto

- `app.js`: Contém o código principal que lê os arquivos de código fonte, envia o conteúdo para a API do Google Generative AI e salva a documentação gerada.
- `docs/`: Diretório onde a documentação gerada será armazenada.
- `.env`: Arquivo de configuração para armazenar variáveis de ambiente.
- `package.json`: Gerencia as dependências do projeto e os scripts npm.

## Suporte a Arquivos

Atualmente, o script suporta a documentação de arquivos com as seguintes extensões:

- `.php`
- `.js`
- `.py`
- `.java`

Você pode adicionar suporte para outras extensões de arquivo ajustando o código em `readSourceCode()`.

## Personalização

### Adicionar Suporte para Outras Linguagens

Para adicionar suporte para outras linguagens de programação, basta modificar o método `readSourceCode()` para incluir as extensões desejadas:

   ```javascript
   else if (fullPath.endsWith('.extensao')) {
       const content = fs.readFileSync(fullPath, 'utf-8');
       sourceFiles.push({ path: fullPath, content });
   }
   ```

### Ajustar o Prompt

Se você deseja alterar o comportamento do modelo de IA, pode personalizar o prompt que é enviado à API no método `generateDocumentation()`.

   ```javascript
   const prompt = `Gere a documentação em português para o seguinte código:

${file.content}`;
   ```

## Contribuição

Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou relatar problemas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Agradecimentos

Este projeto utiliza a [Google Generative AI](https://cloud.google.com/gen-ai) para gerar a documentação automaticamente.
