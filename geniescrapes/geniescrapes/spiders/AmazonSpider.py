import re
import time
from urllib.parse import urlencode
import scrapy


class AmazonSpider(scrapy.Spider):
    name = "AmazonScraper"
    page = 1
    total_scraped_items = 0
    curr_page_scraped_items = 0
    total_raw_products = 0

    custom_settings = {
        'FEED_URI': f".\\logs\\{time.strftime('%d%m%y_%H%M%S', time.localtime())}_amazon.csv"
    }

    def start_requests(self):
        self.logger.info("page\trprod\ttprod\tcitem\ttitem")

        self.query = getattr(self, 'query', None)

        url = "https://www.amazon.in/s?" + \
            urlencode({'k': self.query})
        yield scrapy.Request(url=url, callback=self.parse_keyword_response)

    def parse_keyword_response(self, response):
        raw_products = response.xpath('//*[@data-asin]')
        for product in raw_products:
            asin = product.xpath('@data-asin').extract_first()
            if not asin:
                continue
            product_url = f"https://www.amazon.in/dp/{asin}"
            yield scrapy.Request(
                url=product_url,
                callback=self.parse_product_response,
                meta={'asin': asin}
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
            url = "https://www.amazon.in/s?" + \
                urlencode({'k': self.query, 'page': self.page})
            yield scrapy.Request(url=url, callback=self.parse_keyword_response)

    def parse_product_response(self, response):
        title = ''
        organization = ''
        scrapped_from = {
            'ecommerceSite': 'Amazon',
            'rating': 0,
            'last_scrapped': int(time.time())*1000,
            'scrapped_times': 1,
            'init_price': 0,
            'curr_price': 0,
            'identifiers': {}
        }
        images = []
        reviews = []
        attributes = {}
        identifiers = {}

        try:
            raw_title = response.xpath(
                '//*[@id="productTitle"]/text()').extract_first().strip().strip("(Renewed)").strip()
            title = raw_title

            images = [re.search(
                '"large":"(.*?)"', response.text).groups()[0]]
            scrapped_from['curr_price'] = int(response.xpath(
                '//*[@class="a-price-whole"]/text()').extract_first().replace(',', ''))
            scrapped_from['identifiers']['asin'] = response.meta['asin']
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items + self.curr_page_scraped_items +1}: Error fetching title, images, asin and curr price || {str(error)}")

        for (review_title, description, review, date) in zip(
            response.xpath(
                '//a[@data-hook="review-title"]/span/text()').extract(),
            response.xpath(
                '//span[@data-hook="review-body"]/div/div/span/text()').extract(),
            response.xpath(
                '//i[@data-hook="review-star-rating"]/span[@class="a-icon-alt"]/text()').extract(),
            response.xpath(
                '//span[@data-hook="review-date"]/text()').extract()
        ):
            reviews.append({
                'title': review_title,
                'description': description,
                'review_star': review,
                'images': [],
                'product': '',
                'user': 'Amazon Reviewer',
                'scrapped_from': 'Amazon',
                'reviewed_on': date,
                'scrapped_on': int(time.time())*1000,
                'verified': False
            })

        try:
            tables = response.xpath(
                '//*[@id="productDetails_techSpec_section_1"]//tr')
            for row in tables:
                key = row.xpath('th//text()').extract_first().strip()
                value = row.xpath(
                    'td//text()').extract_first().strip().encode('ascii', 'ignore').decode()
                if key in ['Brand', 'Series', 'Item model number', 'Model Name']:
                    if key == 'Brand':
                        organization = value
                    identifiers[key] = value
                else:
                    attributes[key] = value
        except Exception:
            pass

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
