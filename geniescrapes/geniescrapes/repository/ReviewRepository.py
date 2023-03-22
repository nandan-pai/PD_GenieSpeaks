from ..DBConn.MongoDBConn import MongoDBConn


class ReviewRepository(MongoDBConn):

    def __init__(self, dbref) -> None:
        super().__init__(dbref=dbref)

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
            print("ReviewRepository: Failed to create new Review", error)
            raise Exception("ReviewRepository: Failed to create new Review")

    def update_product_id(self, review_id, prod_id):
        try:
            self.review.update_one(
                {"_id": review_id}, {"$set": {"product": prod_id}}
            )
        except Exception as error:
            print("ReviewRepository: Failed to update product id", error)
            raise Exception("ReviewRepository: Failed to update product id")
