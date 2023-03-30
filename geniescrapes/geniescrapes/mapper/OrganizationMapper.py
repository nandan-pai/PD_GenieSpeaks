from ..DBConn.MongoDBConn import MongoDBConn


class OrganizationMapper(MongoDBConn):

    def __init__(self, dbref) -> None:
        super().__init__(dbref=dbref)

    def get_organization_id(self, name):
        try:
            org_data = self.organization.find_one({"name": name})
            if org_data is None:
                return self.create_organization(name=name)
            return org_data["_id"]
        except Exception as error:
            print("OrganizationMapper: Error fetching organization id", error)
            raise Exception(
                "OrganizationMapper: Error fetching organization id")

    def create_organization(self, name):
        '''creates organization in the database and returns the orgID'''
        try:
            new_organization = {}

            new_organization["name"] = name
            new_organization["products"] = []

            saved_organization = self.organization.insert_one(new_organization)
            return saved_organization.inserted_id
        except Exception as error:
            print("OrganizationMapper: Failed to create new Organization", error)
            raise Exception(
                "OrganizationMapper: Failed to create new Organization")

    def update_product_list_add(self, org_id, prod_id):
        try:
            self.organization.update_one(
                {"_id": org_id}, {"$push": {"products": prod_id}}
            )
        except Exception as error:
            print("OrganizationMapper: Failed to add product in product list", error)
            raise Exception(
                "OrganizationMapper: Failed to add product in product list")
