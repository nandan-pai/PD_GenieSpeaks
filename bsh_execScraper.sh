cd /usr/src
pip3 install -r requirements.txt
cd geniescrapes
scrapy crawl $1 -a query=$2
