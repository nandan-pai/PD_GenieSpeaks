'''Product Model'''


class Product():
    '''Product Model'''
    tags = []

    def __init__(self,
                 title,
                 scrapped_from,
                 organization,
                 images,
                 reviews,
                 attributes,
                 identifiers) -> None:

        self.title = title
        self.scrapped_from = scrapped_from
        self.organization = organization
        self.images = images
        self.reviews = reviews
        self.attributes = attributes
        self.identifiers = identifiers

    def __repr__(self) -> str:
        rep = f'Product({self.title}, {self.scrapped_from}, {self.images}, {self.organization}, {self.reviews}, {self.attributes}, {self.identifiers}'
        return rep

    def __str__(self) -> str:
        return f'{self.title} | {self.scrapped_from} | {self.attributes} | {self.identifiers}'
