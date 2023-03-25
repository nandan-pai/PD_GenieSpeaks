call cmd_setenv.cmd
cd geniescrapes
scrapy crawl %1 -a query=%2
