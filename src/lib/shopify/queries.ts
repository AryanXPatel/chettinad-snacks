// GraphQL Fragments and Queries for Shopify Storefront API

// Fragments for reusable query parts
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    options {
      id
      name
      values
    }
  }
`;

export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
`;

// Product Queries
export const GET_ALL_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int = 50, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION = `
  ${PRODUCT_FRAGMENT}
  query GetProductsByCollection($handle: String!, $first: Int = 50) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
`;

// Collection Queries
export const GET_ALL_COLLECTIONS = `
  query GetAllCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

// Cart Mutations
export const CREATE_CART = `
  ${CART_FRAGMENT}
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART = `
  ${CART_FRAGMENT}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_LINES = `
  ${CART_FRAGMENT}
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_FROM_CART = `
  ${CART_FRAGMENT}
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_CART = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
`;
