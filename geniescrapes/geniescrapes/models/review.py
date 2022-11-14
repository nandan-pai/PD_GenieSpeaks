'''Review Model'''
import time


class Review():
    '''Review Model'''
    product = None
    scrapped_on = int(time.time())*1000
    verified = False

    def __init__(self,
                 title,
                 description,
                 review_star,
                 image,
                 scrapped_from,
                 reviewed_on) -> None:

        self.title = title
        self.description = description
        self.review_star = review_star
        self.image = image
        self.user = f'{scrapped_from} Reviewer'
        self.scrapped_from = scrapped_from
        self.reviewed_on = reviewed_on

    def __repr__(self) -> str:
        rep = f'Review({self.title}, {self.description}, {self.image}, {self.product}, {self.reviewed_on}, {self.scrapped_from}, {self.user}, {self.verified}'
        return rep

    def __str__(self) -> str:
        return f'{self.title} | {self.description} | {self.review_star} | {self.reviewed_on}'
