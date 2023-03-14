1. Install dotenv package with the following command:

```bash
npm install --save-dev dotenv
```

2. Create a `.env` file at the root of your project and add your environment variables with the format `VARIABLE_NAME=value`

3. Modify your `vite.config.ts` file to use the dotenv package and make the environment variables available to your application. Here's an example:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
// ...other configurations
build: {
outDir: join(process.cwd(), 'dist'),
},
define: {
// make the environment variables available to your application
'process.env': process.env,
},
});
```

4. Use the environment variable in your TypeScript code like this:

```typescript
// example.ts
console.log(process.env.VARIABLE_NAME);
```

That's it! Now you should be able to use environment variables in your Vite 4.0.0 project with TypeScript.