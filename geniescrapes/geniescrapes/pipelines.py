# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
'''Pipeline to feed data into MongoDB'''
import os
import pymongo


class GeniescrapesPipeline:
    '''GeniescrapesPipeline'''
    def __init__(self) -> None:
        self.conn = pymongo.MongoClient(
            host=os.environ.get('MONGO_ATLAS_URI', default='mongodb://localhost:27017'),
            # port=27017
        )
        dbref = self.conn[os.environ.get('MONGO_DB_NAME', default='GenieSpeaks')]
        

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

    def create_review(self, title, description, images, reviewed_on, scrapped_on, review_star, verified, product, scrapped_from, user):
        '''creates review and stores it in database and returns the reviewID'''
        try:
            new_review = {}

            new_review["title"] = title
            new_review["description"] = description
            new_review["review_star"] = review_star
            new_review["images"] = images
            new_review["product"] = product
            new_review["user"] = user
            new_review["scrapped_on"] = scrapped_on
            new_review["reviewed_on"] = reviewed_on
            new_review["ecommerce"] = scrapped_from
            new_review["verified"] = verified

            saved_review = self.review.insert_one(new_review)
            return saved_review.inserted_id
        except Exception as error:
            print("Failed to create the Review", error)
            return None

    def create_user(self, name):
        '''creates users in the database and returns the userID'''
        try:
            new_user = {}

            new_user['name'] = name
            new_user['profilepic'] = 'defaults/defaultprofilepic.png'
            new_user['email'] = name.strip().replace(
                ' ', '').lower() + '@geniespeaks.inf'
            new_user['hashedpassword'] = ''
            new_user['reviews'] = []
            new_user['bookmarks'] = []

            saved_user = self.user.insert_one(new_user)
            return saved_user.inserted_id
        except Exception as error:
            print("Failed to create the user", error)
            return None

    def create_product(self, title, images, organization, scrapped_from, reviews, attributes, identifiers):
        '''creates product and stores it in database and returns the productID'''
        try:
            new_prod = {}

            new_prod['title'] = title
            new_prod['images'] = images
            new_prod['organization'] = organization
            new_prod['ecommerce'] = scrapped_from
            new_prod['reviews'] = reviews
            new_prod['attributes'] = attributes
            new_prod['identifiers'] = identifiers
            new_prod['tags'] = []

            saved_prod = self.product.insert_one(new_prod)
            return saved_prod.inserted_id
        except Exception as error:
            print("Failed to create the product", error)
            return None

    def getOrganizationID(self, name):
        try:
            org_data = self.organization.find_one({"name": name})
            if org_data is None:
                return self.create_organization(name=name)
            return org_data["_id"]
        except Exception as error:
            print("Error Getting Organization id", error)
            return None

    def getECommerceID(self, name):
        try:
            ecom_data = self.ecommerce.find_one({"name": name})
            if ecom_data is None:
                return self.create_ecommerce(name=name)
            return ecom_data["_id"]
        except Exception as error:
            print("Error Getting ECommerce id", error)
            return None

    def getUserID(self, name):
        try:
            user_data = self.user.find_one({"name": name})
            if user_data is None:
                return self.create_user(name=name)
            return user_data["_id"]
        except Exception as error:
            print("Error Getting ECommerce id", error)
            return None

    def process_item(self, item, spider):
        organizationID = self.getOrganizationID(name=item['organization'])
        ecomID = self.getECommerceID(
            name=item['scrapped_from']['ecommerceSite'])
        reviewIDs = []
        for review in item['reviews']:
            userID = self.getUserID(name=review['user'])
            reviewID = self.create_review(
                title=review['title'],
                description=review['description'],
                review_star=review['review_star'],
                images=review['images'],
                product="",
                user=userID,
                scrapped_from=ecomID,
                reviewed_on=review['reviewed_on'],
                scrapped_on=review['scrapped_on'],
                verified=review['verified']
            )

            reviewIDs.append(
                reviewID
            )

            self.user.update_one(
                {"_id": userID}, {"$push": {"reviews": reviewID}}
            )

        scrapped_from = {
            'ecommerceID': ecomID,
            'rating': item['scrapped_from']['rating'],
            'last_scrapped': item['scrapped_from']['last_scrapped'],
            'scrapped_times': item['scrapped_from']['scrapped_times'],
            'init_price': item['scrapped_from']['init_price'],
            'curr_price': item['scrapped_from']['curr_price'],
            'identifiers': item['scrapped_from']['identifiers']
        }

        new_prod_id = self.create_product(
            title=item['title'],
            images=item['images'],
            organization=organizationID,
            scrapped_from=[scrapped_from],
            reviews=reviewIDs,
            attributes=item['attributes'],
            identifiers=item['identifiers'])

        self.ecommerce.update_one(
            {"_id": ecomID}, {"$push": {"products_scrapped": new_prod_id}}
        )
        self.organization.update_one(
            {"_id": organizationID}, {"$push": {"products": new_prod_id}}
        )
        for reviewID in reviewIDs:
            self.review.update_one(
                {"_id": reviewID}, {"$set": {"product": new_prod_id}}
            )
        return item
