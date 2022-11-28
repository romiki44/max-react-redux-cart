import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My Kids Book',
    describe: 'Cute fairytaile book',
  },
  {
    id: 'p2',
    price: 10,
    title: 'Elektro Book',
    describe: 'Strong Ampere reveleated',
  },
  {
    id: 'p3',
    price: 16,
    title: 'An Animal Book',
    describe: 'Tigers, Lions, Appes and so...',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((book) => (
          <ProductItem
            key={book.id}
            id={book.id}
            title={book.title}
            price={book.price}
            description={book.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
