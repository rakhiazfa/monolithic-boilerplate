FROM rakhiazfa/php-8.3:latest

WORKDIR /var/www

COPY . .
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY default.conf /etc/nginx/http.d/

RUN composer install --optimize-autoloader --prefer-dist --no-dev -o

RUN chown -R www-data:www-data storage \
    && chown -R www-data:www-data bootstrap/cache \
    && chmod -R 775 storage \
    && chmod -R 775 bootstrap/cache

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]