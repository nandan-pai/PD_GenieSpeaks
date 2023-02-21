# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
'''Pipeline to feed data into MongoDB'''
import os
import bcrypt
from datetime import datetime

import pymongo


class GeniescrapesPipeline:
    '''GeniescrapesPipeline'''

    def __init__(self) -> None:
        self.conn = pymongo.MongoClient(
            host=os.environ.get('MONGO_ATLAS_URI',
                                default='mongodb://localhost:27017'),
            # port=27017
        )
        print(os.environ.get('MONGO_ATLAS_URI',
              default='mongodb://localhost:27017'))
        dbref = self.conn[os.environ.get(
            'MONGO_DB_NAME', default='GenieSpeaks')]
        print(dbref)

        self.product = dbref['Product']
        self.review = dbref['Review']
        self.organization = dbref['Organization']
        self.ecommerce = dbref['ECommerce']
        self.user = dbref['User']

    def create_organization(self, name):
        '''creates organization in the database and returns the orgID'''
        try:
            new_organization = {}

            new_organization["name"] = name
            new_organization["products"] = []

            saved_organization = self.organization.insert_one(new_organization)
            return saved_organization.inserted_id
        except Exception as error:
            print("Failed to create the Organization", error)
            return None

    def create_ecommerce(self, name):
        '''creates ECommerce in the database and returns the ecomID'''
        try:
            new_ecommerce = {}

            new_ecommerce["name"] = name
            new_ecommerce["product_url"] = ""
            new_ecommerce["search_url"] = ""
            new_ecommerce["products_scrapped"] = []
            new_ecommerce["past_scrapes"] = []

            saved_ecommerce = self.ecommerce.insert_one(new_ecommerce)
            return saved_ecommerce.inserted_id
        except Exception as error:
            print("Failed to create the ECommerce", error)
            return None

    def create_review(self, review, product, ecommerce, user):
        '''creates review and stores it in database and returns the reviewID'''
        try:
            new_review = {}

            new_review["title"] = review['title']
            new_review["description"] = review['description']
            new_review["stars"] = review['stars']
            new_review["url"] = review['url']
            new_review["images"] = review['images']
            new_review["scrapped_on"] = review['scrapped_on']
            new_review["reviewed_on"] = review['reviewed_on']
            new_review["verified"] = review['verified']

            new_review["product"] = product
            new_review["user"] = user
            new_review["ecommerce"] = ecommerce

            saved_review = self.review.insert_one(new_review)
            return saved_review.inserted_id
        except Exception as error:
            print("Failed to create the Review", error)
            return None

    def create_user(self, name):
        '''creates users in the database and returns the userID'''
        try:
            # generating the salt
            salt = bcrypt.gensalt()

            new_user = {}

            new_user['name'] = name
            new_user['profilepic'] = 'defaults/defaultprofilepic.png'
            new_user['email'] = name.strip().replace(
                ' ', '').lower() + '@geniespeaks.inf'

            # password.encode('utf-8')
            new_user['hashedpassword'] = bcrypt.hashpw(
                password='login1234'.encode('utf-8'), salt=salt)
            new_user['reviews'] = []
            new_user['bookmarks'] = []
            new_user['created_on'] = datetime.today()

            saved_user = self.user.insert_one(new_user)
            return saved_user.inserted_id
        except Exception as error:
            print("Failed to create the user", error)
            return None

    def create_product(self, product, organization, ecommerce, review_id_list):
        '''creates product and stores it in database and returns the productID'''
        try:
            new_prod = {}

            new_prod['title'] = product['title']
            new_prod['images'] = product['images']
            new_prod['attributes'] = product['attributes']
            new_prod['identifiers'] = product['identifiers']
            new_prod['tags'] = product['tags']
            new_prod['rating_sum'] = product['rating_sum']

            new_prod['organization'] = organization
            new_prod['ecommerce'] = ecommerce
            new_prod['reviews'] = review_id_list

            saved_prod = self.product.insert_one(new_prod)
            return saved_prod.inserted_id
        except Exception as error:
            print("Failed to create the product", error)
            return None

    def update_product(self, prod_to_update, new_prod_detail, ecommerce_detail, new_review_id_list):
        '''updates product details to existing product and
        stores it in database and returns the productID'''
        try:
            updated_prod = self.product.find_one_and_update(
                {
                    '_id': prod_to_update
                },
                {
                    '$push': {
                        'ecommerce': ecommerce_detail,
                        'reviews': {
                            '$each': new_review_id_list
                        }
                    },
                    '$inc': {
                        'rating_sum': new_prod_detail['rating_sum']
                    }
                }
            )

            return prod_to_update
        except Exception as error:
            print("Failed to create the product", error)
            return None

    def get_organization_id(self, name):
        try:
            org_data = self.organization.find_one({"name": name})
            if org_data is None:
                return self.create_organization(name=name)
            return org_data["_id"]
        except Exception as error:
            print("Error Getting Organization id", error)
            return None

    def get_ecommerce_id(self, name):
        try:
            ecom_data = self.ecommerce.find_one({"name": name})
            if ecom_data is None:
                return self.create_ecommerce(name=name)
            return ecom_data["_id"]
        except Exception as error:
            print("Error Getting ECommerce id", error)
            return None

    def get_user_id(self, name):
        try:
            user_data = self.user.find_one({"name": name})
            if user_data is None:
                return self.create_user(name=name)
            return user_data["_id"]
        except Exception as error:
            print("Error Getting ECommerce id", error)
            return None

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

        org_id = self.get_organization_id(name=item['organization'])
        ecom_id = self.get_ecommerce_id(
            name=item['ecommerce']['ecommerceSite'])
        review_ids = []
        rating_sum = 0
        for review in item['reviews']:
            user_id = self.get_user_id(name=review['user'])
            review_id = self.create_review(
                review=review,
                product="",
                user=user_id,
                ecommerce=ecom_id,
            )
            rating_sum += review['stars']

            review_ids.append(
                review_id
            )

            self.user.update_one(
                {"_id": user_id}, {"$push": {"reviews": review_id}}
            )

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
            prod_id = self.update_product(
                prod_to_update=similar_finds,
                new_prod_detail=item,
                ecommerce_detail=ecommerce,
                new_review_id_list=review_ids)
        else:
            prod_id = self.create_product(
                product=item,
                organization=org_id,
                ecommerce=[ecommerce],
                review_id_list=review_ids
            )

            self.ecommerce.update_one(
                {"_id": ecom_id}, {"$push": {"products_scrapped": prod_id}}
            )
            self.organization.update_one(
                {"_id": org_id}, {"$push": {"products": prod_id}}
            )

        for review_id in review_ids:
            self.review.update_one(
                {"_id": review_id}, {"$set": {"product": prod_id}}
            )
        return item
