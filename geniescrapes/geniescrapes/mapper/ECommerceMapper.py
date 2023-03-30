from ..DBConn.MongoDBConn import MongoDBConn


class ECommerceMapper(MongoDBConn):

    def __init__(self, dbref) -> None:
        super().__init__(dbref=dbref)

    def get_ecommerce_id(self, name):
        try:
            ecom_data = self.ecommerce.find_one({"name": name})
            if ecom_data is None:
                return self.create_ecommerce(name=name)
            return ecom_data["_id"]
        except Exception as error:
            print("ECommerceMapper: error fetching ECommerce id", error)
            raise Exception(
                "ECommerceMapper: error fetching ECommerce id")

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
            print("ECommerceMapper: Failed to create new ECommerce", error)
            raise Exception(
                "ECommerceMapper: Failed to create new ECommerce")

    def update_scrap_list_add(self, ecom_id, prod_id):
        try:
            self.ecommerce.update_one(
                {"_id": ecom_id}, {"$push": {"products_scrapped": prod_id}}
            )
        except Exception as error:
            print("Failed to add product in scrap list", error)
            raise Exception(
                "ECommerceMapper: Failed to add product in scrap list")
