class MongoDBConn:
    def __init__(self, dbref) -> None:
        # self.conn = conn
        # print(os.environ.get('MONGO_ATLAS_URI',
        #       default='mongodb://localhost:27017'))
        # dbref = dbref
        # print(dbref)

        self.product = dbref['Product']
        self.review = dbref['Review']
        self.organization = dbref['Organization']
        self.ecommerce = dbref['ECommerce']
        self.user = dbref['User']
