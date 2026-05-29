import graphene
from graphene_django import DjangoObjectType
from .models import DashboardCard, Stockcategory, Productcategory, Product, SellingItem


class DashboardCardType(DjangoObjectType):
    class Meta:
        model = DashboardCard
        fields = ('id', 'label', 'today_sale', 'icon')


class StockcategoryType(DjangoObjectType):
    class Meta:
        model = Stockcategory
        fields = ('id', 'stockcategory', 'icon_img')


class ProductcategoryType(DjangoObjectType):
    class Meta:
        model = Productcategory
        fields = ('id', 'stockcategory', 'productcategory', 'description', 'ico_img')


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = ('id', 'name', 'productcategory', 'brand', 'details', 'price', 'image')


class SellingItemType(DjangoObjectType):
    total_price = graphene.Float()

    class Meta:
        model = SellingItem
        fields = ('id', 'category', 'item_name', 'brand', 'quantity', 'unit_price', 'total_price')

    def resolve_total_price(self, info):
        return self.total_price


class Query(graphene.ObjectType):
    dashboard_cards = graphene.List(DashboardCardType)
    stock_categories = graphene.List(StockcategoryType)
    product_categories = graphene.List(ProductcategoryType)
    products = graphene.List(ProductType)
    product = graphene.Field(ProductType, id=graphene.ID(required=True))
    selling_items = graphene.List(SellingItemType)

    def resolve_dashboard_cards(self, info):
        return DashboardCard.objects.all()

    def resolve_stock_categories(self, info):
        return Stockcategory.objects.all()

    def resolve_product_categories(self, info):
        return Productcategory.objects.all()

    def resolve_products(self, info):
        return Product.objects.select_related('productcategory').all()

    def resolve_product(self, info, id):
        return Product.objects.filter(pk=id).first()

    def resolve_selling_items(self, info):
        return SellingItem.objects.all()


class CreateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        name = graphene.String(required=True)
        productcategory_id = graphene.ID(required=False)
        brand = graphene.String(required=False)
        details = graphene.String(required=False)
        price = graphene.Float(required=False)

    def mutate(self, info, name, productcategory_id=None, brand=None, details=None, price=0.0):
        productcategory = None
        if productcategory_id:
            productcategory = Productcategory.objects.filter(pk=productcategory_id).first()

        product = Product.objects.create(
            name=name,
            productcategory=productcategory,
            brand=brand,
            details=details,
            price=price,
        )
        return CreateProduct(product=product)


class Mutation(graphene.ObjectType):
    create_product = CreateProduct.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
