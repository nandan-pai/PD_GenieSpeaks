import re
import time
from datetime import datetime
from urllib.parse import urlencode

import scrapy


class AmazonSpider(scrapy.Spider):
    name = "Amazon"
    total_scraped_items = 0
    curr_prod_no = 0
    query = None

    custom_settings = {
        'FEED_URI': f".\\logs\\{time.strftime('%d%m%y_%H%M%S', time.localtime())}_amazon.csv"
    }

    def start_requests(self):
        self.logger.info("CurrProdNo\tTotalProdReq\tFromPage\tASIN")

        self.query = getattr(self, 'query', None)
        self.category = getattr(self, 'category', None)

        url = "https://www.amazon.in/s?" + \
            urlencode({'k': self.query})
        yield scrapy.Request(url=url, callback=self.parse_keyword_response, cb_kwargs=dict(page=1))

    def parse_keyword_response(self, response, page):
        '''Parsing each page product list'''
        raw_products = response.xpath('//*[@data-asin]')
        for product in raw_products:
            asin = product.xpath('@data-asin').extract_first()
            if not asin:
                continue
            product_url = f"https://www.amazon.in/dp/{asin}"
            self.curr_prod_no += 1
            yield scrapy.Request(
                url=product_url,
                callback=self.parse_product_response,
                cb_kwargs=dict(asin=asin,
                               page=page,
                               product_url=product_url,
                               curr_prod_no=self.curr_prod_no),
            )

        if page != 30:
            url = "https://www.amazon.in/s?" + \
                urlencode({'k': self.query, 'page': page+1})
            yield scrapy.Request(
                url=url,
                callback=self.parse_keyword_response,
                cb_kwargs=dict(page=page+1))

    def parse_product_title(self, response) -> str:
        '''parse_product_title'''

        try:
            raw_title = response.xpath(
                '//*[@id="productTitle"]/text()').extract_first().strip().strip("(Renewed)").strip()
            return raw_title
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: AmazonSpider: Title Parse Error || {str(error)}")
            raise Exception("AmazonSpider: Title Parse Error")

    def parse_product_image_list(self, response) -> list:
        '''parse_product_image_list'''
        images = []
        try:
            images.append(re.search(
                '"large":"(.*?)"', response.text).groups()[0])
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch images || {str(error)}")
        return images

    def parse_product_curr_price(self, response) -> int:
        '''parse_product_curr_price'''
        curr_price = 0
        try:
            curr_price = int(response.xpath(
                '//*[@class="a-price-whole"]/text()').extract_first().replace(',', ''))
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch curr price || {str(error)}")

        return curr_price

    def parse_product_review_list(self, response) -> list:
        '''parse_product_review_list'''
        reviews = []
        try:
            for (review_id, review_title, description, review_star, date) in zip(
                response.xpath(
                    '//div[@data-hook="review"]/@id').extract(),
                response.xpath(
                    '//a[@data-hook="review-title"]/span/text()').extract(),
                response.xpath(
                    '//span[@data-hook="review-body"]/div/div/span/text()').extract(),
                response.xpath(
                    '//i[@data-hook="review-star-rating"]/span[@class="a-icon-alt"]/text()').extract(),
                response.xpath(
                    '//span[@data-hook="review-date"]/text()').extract()
            ):
                review_url = f"https://www.amazon.in/gp/customer-reviews/{review_id}"
                stars = int(review_star[0])
                try:
                    review_data = datetime.strptime(
                        " ".join(date.split()[-3:]), '%d %B %Y')
                except Exception:
                    review_data = datetime.today()
                reviews.append({
                    'title': review_title,
                    'description': description,
                    'stars': stars,
                    'url': review_url,
                    'images': [],
                    'product': '',
                    'user': 'Amazon Reviewer',
                    'ecommerce': 'Amazon',
                    'reviewed_on': review_data,
                    'scrapped_on': datetime.today(),
                    'verified': True
                })

        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch review list || {str(error)}")
        return reviews

    def parse_product_org_attributes_identifiers(self, response):
        '''parse_product_org_attributes_identifiers'''
        identifiers = {}
        attributes = {}
        organization = ""
        try:
            tables = response.xpath(
                '//*[@id="productDetails_techSpec_section_1"]//tr')
            for row in tables:
                key = row.xpath('th//text()').extract_first().strip()
                value = row.xpath(
                    'td//text()').extract_first().strip().encode('ascii', 'ignore').decode()
                if (key.lower() == 'brand'):
                    organization = value

                if key.lower() in ['series', 'item model number', 'model name', 'model']:
                    identifiers[key] = value
                else:
                    attributes[key] = value
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch productDetails || {str(error)}")

        return organization, attributes, identifiers

    def try_parse_feature(self, response):
        try:
            tables = response.xpath(
                '//*[@id="productOverview_feature_div"]//tr')
            for row in tables:
                key = row.xpath('td//span//text()').extract_first().strip()
                value = row.xpath(
                    'td[last()]//span//text()').extract_first().strip()
                if(key.lower() == "brand"):
                    return value
        except Exception as error:
            self.logger.warning(
                f"{self.total_scraped_items+1}: Couldnt fetch productDetails || {str(error)}")
            raise Exception("AmazonSpider: Got Organization as Null")
        raise Exception("AmazonSpider: Got Organization as Null")

    def parse_product_response(self, response, asin, page, product_url, curr_prod_no):
        '''parsing each products by visiting the page'''

        try:
            title = self.parse_product_title(response=response)
            ecommerce = {
                'ecommerceSite': 'Amazon',
                'rating': 0,
                'last_scrapped': datetime.today(),
                'scrapped_times': 1,
                'init_price': 0,
                'curr_price': self.parse_product_curr_price(response=response),
                'identifiers': {"asin": asin},
                'product_url': product_url
            }

            images = self.parse_product_image_list(response=response)
            reviews = self.parse_product_review_list(response=response)

            (organization,
             attributes,
             identifiers) = self.parse_product_org_attributes_identifiers(response=response)

            if not organization:
                organization = self.try_parse_feature(response=response)

            tags = [*list(set(identifiers.values())),
                    self.category, organization]

            self.logger.info(
                f"{curr_prod_no}\t\t{self.total_scraped_items+1}\t\t{page}\t\t{asin}")

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
                f"{self.total_scraped_items+1}: Skipped Scrapeing || {str(error)}")
            return
