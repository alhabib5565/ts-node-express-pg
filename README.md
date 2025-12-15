Express.js + TypeScript + PostgreSQL REST API
A production-ready REST API backend built with Express.js, TypeScript, and PostgreSQL.

🚀 Quick Start
bash# Clone repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Install dependencies

npm install

# Setup environment variables

cp .env.example .env

# Edit .env with your database credentials

# Create database and tables in PostgreSQL

psql -U postgres
CREATE DATABASE your_database_name;
\c your_database_name

# Run your table creation SQL

# Start development server

npm run dev

📦 Tech Stack

Node.js + Express.js - Web framework
TypeScript - Type safety
PostgreSQL + node-postgres (pg) - Database
ESLint + Prettier - Code quality & formatting
dotenv - Environment variables

🎓 Interview Preparation Guide

1. TypeScript কেন ব্যবহার করলাম?
   Answer:

Type safety - compile time এ errors catch করে
Better IDE support (autocomplete, refactoring)
Large codebase maintain করা সহজ
Self-documenting code

Example:
typescript// ❌ JavaScript - Runtime error
function add(a, b) { return a + b; }
add("5", 10); // "510" 😱

// ✅ TypeScript - Compile error
function add(a: number, b: number): number { return a + b; }
add("5", 10); // Error! ✅

2. ESLint এবং Prettier কি? পার্থক্য কি?
   Answer:

ESLint = Code quality check করে (logic errors, bad practices)
Prettier = Code formatting করে (spaces, quotes, semicolons)

কেন দরকার?

Team এ consistent code style maintain করার জন্য
Bugs খুঁজে বের করার জন্য
Git conflicts কমানোর জন্য

Example:
typescript// ESLint catches:
const unusedVar = 10; // Error: unused variable

// Prettier fixes:
const name="John" // Formats to: const name = "John";

3. PostgreSQL এর সাথে connect করার process?
   Answer:
   Step 1: Install packages
   bashnpm install pg dotenv
   npm install -D @types/pg
   Step 2: Environment variables (.env)
   envDB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mydb
   DB_USER=postgres
   DB_PASSWORD=password
   Step 3: Connection Pool তৈরি
   typescriptimport { Pool } from 'pg';
   import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
host: process.env.DB_HOST,
port: parseInt(process.env.DB_PORT || '5432'),
database: process.env.DB_NAME,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
});

export default pool;
Step 4: Query করা
typescriptconst result = await pool.query('SELECT \* FROM users WHERE id = $1', [userId]);

4. Connection Pool কি? কেন ব্যবহার করি?
   Answer:
   Connection Pool = একাধিক database connections একসাথে manage করে এবং reuse করে।
   কেন ব্যবহার করি?

Performance - নতুন connection তৈরি করা expensive (slow)
Reusability - Existing connections reuse করে
Scalability - Multiple concurrent requests handle করে
Resource Management - Automatic connection lifecycle management

Without Pool:
typescript// প্রতিবার নতুন connection (Slow ❌)
Request 1 → New Connection → Query → Close
Request 2 → New Connection → Query → Close
Request 3 → New Connection → Query → Close
With Pool:
typescript// Connections reuse হয় (Fast ✅)
Request 1 → Connection 1 (reused) → Query
Request 2 → Connection 2 (reused) → Query
Request 3 → Connection 1 (reused) → Query
Configuration:
typescriptconst pool = new Pool({
max: 20, // Maximum 20 connections
idleTimeoutMillis: 30000, // Close idle after 30s
connectionTimeoutMillis: 2000, // Timeout after 2s
});

5. MVC Architecture কি? কেন ব্যবহার করি?
   Answer:
   MVC = Model-View-Controller pattern যা code organize করে।
   Data Flow:
   Request → Routes → Controller → Model → Database
   ↓
   Response ← Controller ← Model ← Database
   প্রতিটি Layer এর কাজ:
1. Routes - URL mapping
   typescriptrouter.get('/users', UserController.getAllUsers);
   router.post('/users', UserController.createUser);
1. Controllers - Business logic, validation
   typescriptstatic async createUser(req: Request, res: Response) {
   const { name, email } = req.body;

// Validation
if (!name || !email) {
return res.status(400).json({ error: 'Required fields missing' });
}

// Call model
const user = await UserModel.create({ name, email });

// Send response
res.status(201).json({ data: user });
} 3. Models - Database queries
typescriptstatic async create(userData: User) {
const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING \*';
const result = await pool.query(query, [userData.name, userData.email]);
return result.rows[0];
}
কেন MVC?

Separation of Concerns - প্রতিটি layer এর নির্দিষ্ট responsibility
Maintainability - Code maintain করা সহজ
Testability - প্রতিটি component আলাদাভাবে test করা যায়
Scalability - নতুন features add করা সহজ
Team Collaboration - Multiple developers একসাথে কাজ করতে পারে

6. SQL Injection কি? কিভাবে prevent করি?
   Answer:
   SQL Injection = Malicious SQL code inject করে database hack করা।
   ❌ Vulnerable Code:
   typescript// User input সরাসরি query তে - DANGEROUS!
   const email = req.body.email; // user input: "'; DROP TABLE users; --"
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   await pool.query(query);

// Executed: SELECT _ FROM users WHERE email = ''; DROP TABLE users; --'
// Table deleted! 😱
✅ Safe Code (Parameterized Queries):
typescript// Parameterized query - SAFE!
const email = req.body.email;
const query = 'SELECT _ FROM users WHERE email = $1';
await pool.query(query, [email]);

// PostgreSQL automatically escapes the input
// Safe from SQL injection ✅
কেন Parameterized Queries safe?

User input automatically escaped হয়
SQL এবং data আলাদা থাকে
Database driver input sanitize করে

7. Environment Variables কি? কেন ব্যবহার করি?
   Answer:
   Environment Variables = Configuration এবং sensitive data store করার secure উপায়।
   কেন ব্যবহার করি?

Security - Passwords, API keys code এ hardcode করা যাবে না
Flexibility - Different environments এ different values (dev, prod)
Version Control - .env file git এ commit করা হয় না

Example:
❌ Bad Practice:
typescript// Hardcoded credentials - NEVER DO THIS!
const pool = new Pool({
password: 'mySecretPassword123',
database: 'production_db'
});
✅ Good Practice:
typescript// .env file
DB_PASSWORD=mySecretPassword123
DB_NAME=production_db

// code
const pool = new Pool({
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});
Setup:
bashnpm install dotenv
typescriptimport dotenv from 'dotenv';
dotenv.config(); // Loads .env file

// Now use: process.env.VARIABLE_NAME

8. node-postgres (pg) কি? কেন ব্যবহার করি?
   Answer:
   node-postgres (pg) = Node.js এর জন্য official PostgreSQL client library।
   কেন এটা ব্যবহার করি?

PostgreSQL এর সাথে communicate করার জন্য
SQL queries execute করার জন্য
Connection pooling support করে
Most popular এবং well-maintained

Basic Usage:
typescriptimport { Pool } from 'pg';

const pool = new Pool({ /_ config _/ });

// Query
const result = await pool.query('SELECT \* FROM users');
console.log(result.rows); // Array of objects

// With parameters
const user = await pool.query(
'SELECT \* FROM users WHERE id = $1',
[userId]
);
Alternatives:

Sequelize - ORM (Object-Relational Mapping)
TypeORM - TypeScript-first ORM
Prisma - Modern ORM
Knex.js - Query builder

কখন node-postgres ব্যবহার করবো?

Raw SQL control চাইলে
Lightweight solution চাইলে
Maximum performance চাইলে

9. Development vs Production এ পার্থক্য?
   Answer:
   AspectDevelopmentProductionEnvironmentNODE_ENV=developmentNODE_ENV=productionServernodemon (auto-reload)node (stable)Error MessagesDetailed stack tracesGeneric messagesLoggingConsole logsFile/Service logsDatabaseLocal DBProduction DBCodeTypeScript (.ts)JavaScript (.js)
   Development:
   bashnpm run dev # nodemon src/server.ts
   Production:
   bashnpm run build # Compile TypeScript
   npm start # node dist/server.js

10. TypeScript Compile করার process?
    Answer:
    TypeScript → Compiler (tsc) → JavaScript
    Configuration (tsconfig.json):
    json{
    "compilerOptions": {
    "target": "ES2020", // Output JS version
    "module": "commonjs", // Node.js compatible
    "outDir": "./dist", // Compiled files যাবে
    "rootDir": "./src", // Source files
    "strict": true // Strict type checking
    }
    }
    Compile Process:
    bash# Compile করুন
    npm run build # runs: tsc

# Check errors without compiling

npm run test:types # runs: tsc --noEmit

# What happens:

src/server.ts → tsc → dist/server.js
src/app.ts → tsc → dist/app.js

11. API Testing কিভাবে করবো?
    Answer:
    Tools:

Postman
Thunder Client (VS Code extension)
cURL (command line)
Insomnia

Example Requests:

1. Create User (POST):
   bashcurl -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name":"John","email":"john@example.com"}'
2. Get All Users (GET):
   bashcurl http://localhost:3000/api/users
3. Get User by ID (GET):
   bashcurl http://localhost:3000/api/users/1
4. Update User (PUT):
   bashcurl -X PUT http://localhost:3000/api/users/1 \
    -H "Content-Type: application/json" \
    -d '{"name":"John Smith"}'
5. Delete User (DELETE):
   bashcurl -X DELETE http://localhost:3000/api/users/1

6. Error Handling কিভাবে করবো?
   Answer:
   Three Levels:
7. Try-Catch (Controller level):
   typescriptstatic async getUsers(req: Request, res: Response) {
   try {
   const users = await UserModel.findAll();
   res.json({ data: users });
   } catch (error) {
   res.status(500).json({
   error: 'Failed to fetch users',
   message: error.message
   });
   }
   }
8. Validation (Before database):
   typescriptif (!email || !name) {
   return res.status(400).json({ error: 'Required fields missing' });
   }
9. Global Error Handler (App level):
   typescriptapp.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   console.error(err);
   res.status(500).json({ error: 'Internal server error' });
   });

10. নতুন Feature Add করার process?
    Answer:
    Example: Add "Posts" feature
    Step 1: Create Table
    sqlCREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    Step 2: Create Model (models/post.model.ts)
    typescriptexport class PostModel {
    static async findAll() {
    const result = await pool.query('SELECT \* FROM posts');
    return result.rows;
    }

static async create(postData: Post) {
const query = 'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING \*';
const result = await pool.query(query, [postData.title, postData.content]);
return result.rows[0];
}
}
Step 3: Create Controller (controllers/post.controller.ts)
typescriptexport class PostController {
static async getAllPosts(req: Request, res: Response) {
try {
const posts = await PostModel.findAll();
res.json({ data: posts });
} catch (error) {
res.status(500).json({ error: error.message });
}
}
}
Step 4: Create Routes (routes/post.routes.ts)
typescriptconst router = Router();
router.get('/', PostController.getAllPosts);
router.post('/', PostController.createPost);
export default router;
Step 5: Register Routes (app.ts)
typescriptimport postRoutes from './routes/post.routes';
app.use('/api/posts', postRoutes);

🎯 Quick Reference
Key Technologies & Their Purpose
TechPurposeWhy?TypeScriptType safetyCatch errors earlyExpress.jsWeb frameworkSimple & popularPostgreSQLDatabaseReliable & powerfulnode-postgresDB clientConnect to PostgreSQLESLintCode qualityFind bugsPrettierFormattingConsistent styleConnection PoolDB optimizationReuse connectionsMVC PatternArchitectureOrganize codedotenvConfigSecure credentialsParameterized QueriesSecurityPrevent SQL injection

Common Commands
bash# Development
npm run dev # Start dev server
npm run build # Compile TypeScript
npm start # Start production

# Code Quality

npm run lint # Check issues
npm run lint:fix # Fix issues
npm run format # Format code

# Testing

npm run test:types # Check TypeScript
npm run test:db # Test database
npm run test:all # Run all tests

Interview One-Liners
QuestionAnswerWhy TypeScript?Type safety, catches errors at compile-timeWhy Connection Pool?Reuses connections, better performanceWhy MVC?Separation of concerns, maintainable codeESLint vs Prettier?ESLint = quality, Prettier = formattingSQL Injection Prevention?Parameterized queries ($1, $2)Why dotenv?Secure credentials, environment-specific confignode-postgres?PostgreSQL client for Node.js
