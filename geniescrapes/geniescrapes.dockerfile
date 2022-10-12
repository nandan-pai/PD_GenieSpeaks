# FROM ubuntu:latest
FROM python:3.9.9
WORKDIR /usr/src

# Update System
RUN apt-get update
RUN apt-get -y install cron

# Copy file to container
COPY /geniescrapes ./geniescrapes

COPY requirements.txt bsh_execScraper.sh ./
RUN chmod 0644 bsh_execScraper.sh

# COPY scraper.cronjob /etc/cron.d/scraper
# RUN chmod 0644 /etc/cron.d/scraper

# RUN touch /var/log/cron.log

# Download requirements
RUN pip install -r requirements.txt

# Add the cron job
RUN { cat; echo "39 11 * * * root /bin/bash /usr/src/bsh_execScraper.sh Amazon laptop"; } | crontab -

# Run the command on container startup
# CMD cron && tail -f /var/log/cron.log
# CMD ["bash", "bsh_execScraper.sh", "Amazon", "laptop"]
CMD ["cron", "-f"]
