# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar dependencias
RUN npm install -g pnpm && pnpm install

# Copiar el resto del código
COPY . .

# Puerto que expone la API
EXPOSE 3000

# Correr la API
CMD ["pnpm", "start:dev"]
