FROM harbor.prod.cpq.k8s.corp.clarobr/devops/nginx:1.23.1-alpine

#COPY nginx.conf /
COPY build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
