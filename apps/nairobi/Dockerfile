##########################
# Build Stage

FROM node:14-alpine

RUN apk --no-cache add --virtual builds-deps build-base python git

# Create app directory
WORKDIR /usr/src

# Install app dependencies

COPY ./package*.json ./
# COPY ./tools/build/. ./tools/build
COPY ./decorate-angular-cli.js .

RUN npm ci --no-progress --no-audit --prefer-offline

COPY ./nx.json ./
COPY ./angular.json ./
COPY ./tsconfig*.json ./
COPY ./.eslintrc.json ./

RUN npm run postinstall

# Bundle app source
COPY ./apps/nairobi/. ./apps/nairobi
COPY ./libs/. ./libs

# Run build
RUN npm run build -- nairobi --prod

##########################
# Run Stage

FROM nginx:1.19-alpine

WORKDIR /usr/src

# Copy compiled files
COPY --from=0 /usr/src/dist/apps/nairobi /usr/share/nginx/html
COPY /config/nairobi/default.conf /etc/nginx/conf.d/default.conf
# COPY ssl/. /etc/nginx/ssl

# Test nginx configuration
# RUN nginx -t

# Start process
CMD nginx -g 'daemon off;'
