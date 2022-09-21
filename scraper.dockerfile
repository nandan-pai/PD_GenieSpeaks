FROM python:3.9.9
WORKDIR /usr/src
COPY /geniescrapes requirements.txt ./geniescrapes/
WORKDIR /usr/src/geniescrapes
RUN pip install -r /path/to/requirements.txt
CMD ["scrapy", "AmazonScraper", "-q=laptop"]