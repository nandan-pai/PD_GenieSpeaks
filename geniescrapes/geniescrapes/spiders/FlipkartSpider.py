import time
from urllib.parse import urlencode
import scrapy


class FlipkartSpider(scrapy.Spider):
    name = "FlipkartScraper"
    page = 1
    total_scraped_items = 0
    curr_page_scraped_items = 0
    total_raw_products = 0

    custom_settings = {
        'FEED_URI': f".\\logs\\{time.strftime('%d%m%y_%H%M%S', time.localtime())}_flipkart.csv"
    }

    def start_requests(self):
        self.logger.info("page\trprod\ttprod\tcitem\ttitem")

        self.query = getattr(self, 'query', None)

        url = "https://www.flipkart.com/search?" + \
            urlencode({'q': self.query})
        yield scrapy.Request(url=url, callback=self.parse_keyword_response)

    def parse_keyword_response(self, response):
        raw_products = response.xpath('//*[@data-id]')
        for product in raw_products:
            data_id = product.xpath('@data-id').extract_first()
            product_url = product.css('a::attr(href)').extract_first()
            if not data_id:
                continue
            product_url = f"https://www.flipkart.com{product_url}"
            yield scrapy.Request(
                url=product_url,
                callback=self.parse_product_response
            )

        # next_page = response.xpath(
        #     '//li[@class="a-last"]/a/@href').extract_first()
        self.total_raw_products += len(raw_products)
        self.total_scraped_items += self.curr_page_scraped_items
        self.logger.info(
            f"{self.page}\t{len(raw_products)}\t{self.total_raw_products}\t{self.curr_page_scraped_items}\t{self.total_scraped_items}")
        self.curr_page_scraped_items = 0
        self.page += 1

        if self.page <= 30:
            # if self.curr_page_scraped_items == 0:
            #     outs.close()
            #     return
            url = "https://www.flipkart.com/search?" + \
                urlencode({'q': self.query, 'page': self.page})
            yield scrapy.Request(url=url, callback=self.parse_keyword_response)

    def parse_product_response(self, response):
        title = ''
        organization = ''
        scrapped_from = {
            'ecommerceSite': 'Flipkart',
            'rating': 0,
            'last_scrapped': int(time.time())*1000,
            'scrapped_times': 1,
            'init_price': 0,
            'curr_price': 0,
            'identifiers': []
        }
        images = []
        reviews = []
        attributes = {}
        identifiers = {}

        review = {
            'title': '',
            'description': '',
            'review_star': '',
            'images': [],
            'product': '',
            'user': 'Flipkart Reviewer',
            'scrapped_from': 'Flipkart',
            'reviewed_on': '',
            'scrapped_on': int(time.time())*1000,
            'verified': False
        }

        try:
            tables = response.xpath('//*[@class="_14cfVK"]//tbody/tr')
            for row in tables:
                key = row.xpath('td[1]//text()').extract_first()
                value = row.xpath('td[2]//ul//li//text()').extract_first()
                if key in ['Model Number', 'Part Number', 'Model Name', 'Series']:
                    identifiers[key] = value
                else:
                    attributes[key] = value
        except Exception:
            return

        try:
            prod_title = response.xpath(
                '//*[@class="B_NuCI"]/text()').extract_first().split()
            title = " ".join(prod_title[1:])
            organization = prod_title[0].title()
            if len(prod_title[0]) <= 2:
                organization = prod_title[0].upper()
            scrapped_from['curr_price'] = int(response.xpath(
                '//*[@class="_30jeq3"]/text()').extract_first()[1:].replace(',', ''))
            scrapped_from['init_price'] = int(response.xpath(
                '//*[@class="_3I9_wc"]/text()').extract()[1].replace(',', ''))
        except IndexError as indexerror:
            self.logger.warning(
                f"{self.total_scraped_items+self.curr_page_scraped_items+1}: Error fetching title and price || {str(indexerror)}")
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+self.curr_page_scraped_items+1}: Error fetching title and price | {str(error)}")

        self.curr_page_scraped_items += 1
        yield {
            'title': title,
            'images': images,
            'organization': organization,
            'scrapped_from': scrapped_from,
            'reviews': reviews,
            'attributes': attributes,
            'identifiers': identifiers
        }
