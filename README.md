# vestis-ecommerce

![Vestis App](https://i.imgur.com/Xfvm4fA.png)

## Overview:

- Vestis is an eCommerce app using Stripe integration.
- Commerce.js is used to add variants to products based on size and color.
- Products can be filtered using the filter menu.
- Every product has an unique id and is accesible using routing.

## Stack

- **Framework**: [React](https://reactjs.org/)
- **Content Manager**: [Commerce.js](https://commercejs.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Material UI](https://mui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/)
- **Payment Gateway**: [Stripe](https://stripe.com/en-ro)
- **Deployment**: [Netlify](https://www.netlify.com/)

## Running Locally

![img](https://i.imgur.com/TSN1P1O.png[/img])

The products from Commerce.js need to have a **category**, **size** and **color** variant group for the filter menu to work.

```bash
$ git clone https://github.com/andrewdoro/vestis-ecommerce.git
$ cd vestis-ecommerce
$ npm install
$ npm start
```

Create a `.env` file similar to [`.env.example`](https://github.com/leerob/leerob.io/blob/main/.env.example).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_CHEC_PUBLIC_KEY` from Commerce.js

`REACT_APP_STRIPE_PUBLIC_KEY` from Stripe

## License

[MIT](https://choosealicense.com/licenses/mit/)
