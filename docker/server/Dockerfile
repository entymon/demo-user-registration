FROM php:8.3-apache

RUN a2enmod rewrite
RUN a2enmod headers

# Install necessary build tools
RUN apt-get update && apt-get install -y git unzip zip gcc make autoconf
RUN curl -sS https://get.symfony.com/cli/installer | bash

## RUN git config --global user.email "{GITHUB_EMAIL_ADDRESS}"
## RUN git config --global user.name "{GITHUB_USERNAME}"

WORKDIR /var/www/html
