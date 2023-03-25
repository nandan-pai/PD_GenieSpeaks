from textblob import TextBlob


class ReviewFilter:
    '''Model to filter fake reviews'''

    def normalize_rating(self, stars):
        '''Normalizes the star rating given by the user to the scale of -1 to 1'''
        normalized = (2.0 * (stars - 1) / 4) - 1

        return normalized

    def analyze_sentiment(self, review):
        '''Analyzes the sentiment of the reviews'''
        try:
            blob = TextBlob(review)
            sentiment = blob.sentiment.polarity

            return sentiment
        except Exception as error:
            print(error)

        return False

    def authenticity_measure(self, anal_review, normies):
        '''Provides a measure of authenticity of a review'''

        if abs(anal_review - normies) > 0.5:
            return False
        else:
            return True


# review_list = ReviewFilter()

# db_reviews = ['Good product at this price range. But within a week after updating the system, encountered the problem of hanging and slow down of the system. If they fix the issue, it will become the good product',
#               'Useless product', "Excellent 'start' and 'shut down' response."]
# db_ratings = [4, 1, 1]
# analyzed_reviews = review_list.analyze_sentiment(db_reviews)
# norm_reviews = review_list.normalize_rating(db_ratings)
# authenticty = review_list.authenticity_measure(analyzed_reviews, norm_reviews)

# print(db_reviews)
# print(analyzed_reviews)
# print(norm_reviews)
# print(authenticty)
