# Gunakan image dasar Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Salin package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Salin seluruh file ke container
COPY . .

# Jalankan build (jika ada)
# RUN npm run build

# Jalankan aplikasi
CMD ["npm", "start"]

# Container berjalan di port 8080 (Cloud Run default)
EXPOSE 8080