sleep 30

cd /src
npm install

cd /src
npx knex migrate:latest

cd /src
npm run dev