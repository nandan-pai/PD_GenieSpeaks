import time
from datetime import datetime
from urllib.parse import urlencode

import scrapy


class FlipkartSpider(scrapy.Spider):
    name = "Flipkart"
    total_scraped_items = 0
    curr_prod_no = 0
    query = None

    custom_settings = {
        'FEED_URI': f".\\logs\\{time.strftime('%d%m%y_%H%M%S', time.localtime())}_flipkart.csv"
    }

    def start_requests(self):
        self.logger.info("CurrProdNo\tTotalProdReq\tFromPage\tdataID")

        self.query = getattr(self, 'query', None)
        self.category = getattr(self, 'category', None)

        url = "https://www.flipkart.com/search?" + \
            urlencode({'q': self.query})
        yield scrapy.Request(url=url, callback=self.parse_keyword_response, cb_kwargs=dict(page=1))

    def parse_keyword_response(self, response, page):
        '''Parsing each page product list'''
        raw_products = response.xpath('//*[@data-id]')
        for product in raw_products:
            data_id = product.xpath('@data-id').extract_first()
            product_url = product.css('a::attr(href)').extract_first()
            if not data_id:
                continue
            product_url = f"https://www.flipkart.com{product_url}"
            self.curr_prod_no += 1
            yield scrapy.Request(
                url=product_url,
                callback=self.parse_product_response,
                cb_kwargs=dict(data_id=data_id,
                               page=page,
                               product_url=product_url,
                               curr_prod_no=self.curr_prod_no),
            )

        if page != 30:
            url = "https://www.flipkart.com/search?" + \
                urlencode({'q': self.query, 'page': page+1})
            yield scrapy.Request(
                url=url,
                callback=self.parse_keyword_response,
                cb_kwargs=dict(page=page+1))

    def parse_product_title_org(self, response):
        '''parse_product_title_org'''
        try:
            prod_title = response.xpath(
                '//*[@class="B_NuCI"]/text()').extract_first().split()
            title = " ".join(prod_title[1:])
            organization = prod_title[0]
            return title, organization
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: FlipkartSpider: Title Parse Error || {str(error)}")
            raise Exception("FlipkartSpider: Title Parse Error")

    def parse_product_image_list(self, response) -> list:
        '''parse_product_image_list'''
        images = []
        try:
            img = response.xpath(
                '//*[@class="CXW8mj _3nMexc"]/img/@src').extract_first()
            images.append(img)
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch images || {str(error)}")
        return images

    def parse_product_curr_price(self, response):
        '''parse_product_curr_price'''
        curr_price = 0
        try:
            curr_price = int(response.xpath(
                '//*[@class="_30jeq3 _16Jk6d"]/text()').extract_first()[1:].replace(',', ''))
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch curr price || {str(error)}")
        return curr_price

    def parse_product_init_price(self, response):
        '''parse_product_price'''
        init_price = 0
        try:
            init_price = int(response.xpath(
                '//*[@class="_3I9_wc _2p6lqe"]/text()').extract()[1].replace(',', ''))
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch init price || {str(error)}")
        return init_price

    def parse_product_review_list(self, response) -> list:
        '''parse_product_review_list'''

        reviews = []
        try:
            for raw_review in [*response.xpath('//div[@class="_16PBlm"]'), *response.xpath('//div[@class="_16PBlm _3_IKGE"]')]:
                # print("review time::", raw_review.xpath('.//p[@class="_2sc7ZR"]//text()').extract_first())

                reviews.append({
                    'title': raw_review.xpath('.//p[@class="_2-N8zT"]//text()').extract_first(),
                    'description': raw_review.xpath('.//div[@class="t-ZTKy"]//text()').extract_first(),
                    'stars': int(raw_review.xpath('.//div//div/div//div//text()').extract_first()),
                    'url': '',
                    'images': [],
                    'product': '',
                    'user': 'Flipkart Reviewer',
                    'ecommerce': 'Flipkart',
                    'reviewed_on': datetime.today(),
                    'scrapped_on': datetime.today(),
                    'verified': True
                })
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch review list || {str(error)}")
        return reviews

    def parse_product_attributes_identifiers(self, response):
        '''parse_product_org_attributes_identifiers'''
        identifiers = {}
        attributes = {}
        try:
            tables = response.xpath('//*[@class="_14cfVK"]//tbody/tr')
            for row in tables:
                key = row.xpath('td[1]//text()').extract_first()
                value = row.xpath('td[2]//ul//li//text()').extract_first()
                if key.lower() in ['model number', 'part number', 'model name', 'series']:
                    identifiers[key] = value
                else:
                    attributes[key] = value
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch productDetails || {str(error)}")

        return attributes, identifiers

    def parse_product_response(self, response, data_id, page, product_url, curr_prod_no):
        '''parsing each products by visiting the page'''

        try:
            title, organization = self.parse_product_title_org(
                response=response)
            ecommerce = {
                'ecommerceSite': 'Flipkart',
                'rating': 0,
                'last_scrapped': datetime.today(),
                'scrapped_times': 1,
                'curr_price': self.parse_product_curr_price(response=response),
                'init_price': self.parse_product_init_price(response=response),
                'identifiers': {},
                'product_url': product_url
            }

            images = self.parse_product_image_list(response=response)
            reviews = self.parse_product_review_list(response=response)

            (attributes,
             identifiers) = self.parse_product_attributes_identifiers(response=response)

            if not organization:
                return

            tags = [*list(set(identifiers.values())),
                    self.category, organization]

            self.logger.info(
                f"{curr_prod_no}\t\t{self.total_scraped_items+1}\t\t{page}\t\t{data_id}")
            yield {
                'title': title,
                'images': images,
                'organization': organization.lower(),
                'ecommerce': ecommerce,
                'reviews': reviews,
                'attributes': attributes,
                'identifiers': identifiers,
                'tags': tags
            }
            self.total_scraped_items += 1

        except Exception as error:
            self.logger.info(
                f"{self.total_scraped_items+1}: Skipped Scrapeing || {str(error)} || {product_url}")
            return
