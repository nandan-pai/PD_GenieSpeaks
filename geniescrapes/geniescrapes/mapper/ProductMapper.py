from ..DBConn.MongoDBConn import MongoDBConn


class ProductMapper(MongoDBConn):

    def __init__(self, dbref) -> None:
        super().__init__(dbref=dbref)

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
            print("ProductMapper: Failed to create new product", error)
            raise Exception("ProductMapper: Failed to create new product")

    def add_ecommerce(self, prod_to_update, new_prod_detail, new_prod_tags, ecommerce_detail, new_review_id_list):
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
                    },
                    '$addToSet': {
                        'tags': {
                            '$each': new_prod_tags
                        }
                    }
                }
            )

            return prod_to_update
        except Exception as error:
            print("ProductMapper: Failed to add new ecommerce details", error)
            raise Exception("ProductMapper: Failed to add new ecommerce details")

    def update_ecommerce(self, prod_to_update, new_prod_detail, ecommerce_detail, new_review_id_list):
        '''updates product details to existing product and
        stores it in database and returns the productID'''
        try:
            return
        except Exception as error:
            print("ProductMapper: Failed to add new ecommerce details", error)
            raise Exception("ProductMapper: Failed to add new ecommerce details")
