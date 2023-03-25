import bcrypt
from datetime import datetime

from ..DBConn.MongoDBConn import MongoDBConn


class UserMapper(MongoDBConn):

    def __init__(self, dbref) -> None:
        super().__init__(dbref=dbref)

    def get_user_id(self, name):
        try:
            user_data = self.user.find_one({"name": name})
            if user_data is None:
                return self.create_user(name=name)
            return user_data["_id"]
        except Exception as error:
            print("UserMapper: Error fetching user id", error)
            raise Exception("UserMapper: Error fetching user id")

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
            print("UserMapper: Failed to create new user", error)
            raise Exception("UserMapper: Failed to create new user")

    def update_user_review_list_add(self, user_id, review_id):
        try:
            self.user.update_one(
                {"_id": user_id}, {"$push": {"reviews": review_id}}
            )
        except Exception as error:
            print("UserMapper: Failed to add review in review list", error)
            raise Exception(
                "UserMapper: Failed to add review in review list")
