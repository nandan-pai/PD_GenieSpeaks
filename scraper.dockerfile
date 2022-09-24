FROM python:3.9.9
WORKDIR /usr/src

# Copy file to container
COPY /geniescrapes ./geniescrapes/
COPY requirements.txt bsh_execScraper.sh bsh_setenv.sh ./
# COPY cronjobfile /etc/cron.d/container_cronjob

# Download requirements
RUN apt-get update
RUN apt-get -y install cron
RUN pip install -r requirements.txt

# Give perms to shell executable
RUN chmod 0644 bsh_execScraper.sh

# Add the cron job
RUN crontab -l | { cat; echo "55 14 * * * bash /bsh_execScraper.sh AmazonScraper laptop"; } | crontab -

# Run the command on container startup
# CMD ["bash", "bsh_execScraper.sh", "AmazonScraper", "laptop"]
CMD cron
