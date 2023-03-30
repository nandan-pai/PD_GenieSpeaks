# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
'''Pipeline to feed data into MongoDB'''
import os
import pymongo
from .DBConn.MongoDBConn import MongoDBConn
from .mapper.ECommerceMapper import ECommerceMapper
from .mapper.OrganizationMapper import OrganizationMapper
from .mapper.ProductMapper import ProductMapper
from .mapper.ReviewMapper import ReviewMapper
from .mapper.UserMapper import UserMapper


class GeniescrapesPipeline(MongoDBConn):
    '''GeniescrapesPipeline'''

    def __init__(self) -> None:
        conn = pymongo.MongoClient(
            host=os.environ.get('MONGO_ATLAS_URI',
                                default='mongodb://localhost:27017'),
            # port=27017
        )
        dbref = conn[os.environ.get('MONGO_DB_NAME', default='GenieSpeaks')]
        print(dbref)
        super().__init__(dbref=dbref)

        self.userMapper = UserMapper(dbref=dbref)
        self.productMapper = ProductMapper(dbref=dbref)
        self.ecommerceMapper = ECommerceMapper(dbref=dbref)
        self.organizationMapper = OrganizationMapper(dbref=dbref)
        self.reviewMapper = ReviewMapper(dbref=dbref)

    def process_item(self, item, spider):
        '''pipeline to store data into mongodb'''
        similar_finds = ""
        for key, value in item["identifiers"].items():
            if key.lower() not in ['item model number',
                                   'model number',
                                   'part number']:
                continue
            similar_finds = self.product.find_one(
                {"tags": {"$in": [value]}})
            if similar_finds:
                similar_finds = similar_finds['_id']
                print(similar_finds)
                break
        # for tag in item["tags"]:
        #     if tag.lower() not in ['item model number', 'model number']:
        #         continue
        #     similar_finds = self.product.find_one(
        #         {"tags": {"$in": [tag]}})
        #     if similar_finds:
        #         similar_finds = similar_finds['_id']
        #         print(similar_finds)
        #         break

        org_id = self.organizationMapper.get_organization_id(
            name=item['organization'])
        ecom_id = self.ecommerceMapper.get_ecommerce_id(
            name=item['ecommerce']['ecommerceSite'])
        review_ids = []
        rating_sum = 0
        for review in item['reviews']:
            user_id = self.userMapper.get_user_id(name=review['user'])
            review_id = self.reviewMapper.create_review(
                review=review,
                product="",
                user=user_id,
                ecommerce=ecom_id,
            )
            rating_sum += review['stars']

            review_ids.append(
                review_id
            )

            self.userMapper.update_user_review_list_add(
                user_id=user_id, review_id=review_id)

        item['rating_sum'] = rating_sum

        ecommerce = {
            'ecommerceID': ecom_id,
            'rating': item['ecommerce']['rating'],
            'last_scrapped': item['ecommerce']['last_scrapped'],
            'scrapped_times': item['ecommerce']['scrapped_times'],
            'init_price': item['ecommerce']['init_price'],
            'curr_price': item['ecommerce']['curr_price'],
            'identifiers': item['ecommerce']['identifiers'],
            'product_url': item['ecommerce']['product_url'],
        }

        if similar_finds:
            prod_id = self.productMapper.update_add_ecommerce(
                prod_to_update=similar_finds,
                new_prod_detail=item,
                ecommerce_detail=ecommerce,
                new_review_id_list=review_ids)
        else:
            prod_id = self.productMapper.create_product(
                product=item,
                organization=org_id,
                ecommerce=[ecommerce],
                review_id_list=review_ids
            )

            self.ecommerceMapper.update_scrap_list_add(
                ecom_id=ecom_id, prod_id=prod_id)
            self.organizationMapper.update_product_list_add(
                org_id=org_id, prod_id=prod_id)

        for review_id in review_ids:
            self.reviewMapper.update_product_id(
                review_id=review_id, prod_id=prod_id)
        return item
