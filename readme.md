# Clean Architecture with TypeScript

## Initial configuration done by this project

### Initialize directory and TS/JEST configuration files
```ssh
yarn init
yarn add -D typescript ts-node @types/node @types/express supertest @types/supertest @types/node jest @types/jest ts-jest
yarn tsc --init
yarn ts-jest config:init
```

### Add some custome configuration in tsconfig.json
```md
"outDir": "./lib", 
"rootDir": "./src"
```
### Add some custome configuration in package.json
```json
  "scripts": {
    "test": "jest --watchAll --collectCoverage"
  },
```

### Initialize data source 
```ssh
yarn add mongodb 
yarn add -D @types/mongodb
```
