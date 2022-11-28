import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification.js';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //napr. tu spustime http-request...hlavne nesmie byt v reduceri!
  //pri inicializacii do firebasu staci napisat put a urobi update, cize replace
  //inac by sme museli robit post...ale toto len pre firebase
  //cize vzdy ked sa zmeni kosik, urobime put/replace vo firebase
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      );
      const response = await fetch(
        'https://max-react-http-c7bbe-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data t database failed');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully',
        })
      );
    };

    //ak je to prvy raz, nevolam update-cart, lebo ho vzdy tak vynuluje
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
