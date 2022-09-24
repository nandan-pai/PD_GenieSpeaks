. bsh_setenv.sh
sudo pip install -r requirements.txt
cd geniescrapes/
# scrapy crawl $1 -a query=$2
scrapy crawl AmazonScraper -a query=laptop
