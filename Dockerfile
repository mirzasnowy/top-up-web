# Gunakan base image Node.js versi LTS
FROM node:20-slim
# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json tsconfig*.json ./

# Instal hanya dependensi produksi untuk membuat image lebih kecil
RUN npm install --legacy-peer-deps

# Salin semua file proyek lainnya
COPY . .

# Jalankan proses build untuk mengubah TypeScript ke JavaScript
RUN npm run build:server

RUN npm prune --omit=dev
# Beritahu container port mana yang akan diekspos
EXPOSE 3001

# Perintah untuk menjalankan aplikasi saat container dimulai
# Kita jalankan dari folder dist hasil build
CMD [ "node", "dist/server/production.js" ]