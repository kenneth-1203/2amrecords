This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Features

- [x] **Authentication**: User profile to keep track of orders and profile information (Firebase authentication)
- [x] **Storage**: Store all product images and relevant files (Firebase storage)
- [x] **Database**: Store all relevant products, categories, users information (Firebase firestore)
- [x] **Payment**: Integrate payment gateway for purchasing products (Stripe)
- [x] **Hosting**: Deploy and host application on Vercel
- [x] **Design**: Mobile responsive UI design
- [ ] **Admin**: Create an admin panel for store configurations like adding new products or vice versa

## Todo

### Priority: HIGH
- [ ] Setup dynamic routes and handle non-existent routes
- [ ] Create UI for the rest of the pages
- [x] Create user registration form
- [x] Setup authentication with Firebase authentication
- [x] Handle user actions: add to cart, checkout, save cart, etc
- [x] Integrate Stripe payment gateway
- [x] Setup testing environment for Firebase collections and Firebase storage
- [x] Create user profile page with information (delivery status, track orders, pending orders, order history)
- [x] Create guest buy feature (no authentication)

### Priority: MEDIUM
- [x] Ensure all components and pages are mobile-friendly
- [x] Change current product list UI (create custom slider or wrapper for the list of products)
- [x] Show similar products based on the categories attached to the product from product details page
- [x] Create carousel for product lists
- [x] Add delivery fees for East Malaysia (RM 10) and West Malaysia (RM 15) and only charge below 3 products

### Priority: LOW
- [ ] Handle lazy loading for images (create a skeleton/placeholder for loading images)
- [ ] Create feedback section where users can rate products and write comments
- [x] Trigger an email to user upon completing a purchase
- [x] Change image load behavior to increase performance
- [ ] Add a subscribe to newsletter section in homepage
- [x] Remove uneccessary profile image upload and display