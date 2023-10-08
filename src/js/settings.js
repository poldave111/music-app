export  const select = {
    templateOf: {
      home: '#template-home',
      discover: '#template-discover', 
      search: '#template-search',
      player: '#template-player',
      categories: '#template-category-dropdown',
    },
    containerOf: {
      pages: '#pages',
      home: '#home-wrapper',
      discover: '#discover-wrapper',
      search: '#search-wrapper',
      player: '#player-wrapper',
      categories: '.categoriesDropdown'
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input.amount',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
      datePicker: {
        wrapper: '.date-picker',
        input: `input[name="date"]`,
      },
      hourPicker: {
        wrapper: '.hour-picker', 
        input: `input[type="range"]`,
        output: '.output',
      },
      starters: {
        input: `input[type="checkbox"]`,
      }
    },
    booking: {
        peopleAmount: '.people-amount',
        hoursAmount: '.hours-amount', 
        tables: '.floor-plan .table',
        tableWrapper: '.floor-plan',
        phone: '[name="phone"]',
        address: '[name="address"]',
        bookingSubmit: '.booking-form [type="submit"]',
    },
    nav: {
        links: '.nav-link',
    },
    cart: {
      productList: '.cart__order-summary',
      toggleTrigger: '.cart__summary',
      totalNumber: `.cart__total-number`,
      totalPrice: '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
      subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
      deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
      form: '.cart__order',
      formSubmit: '.cart__order [type="submit"]',
      phone: '[name="phone"]',
      address: '[name="address"]',
    },
    cartProduct: {
      amountWidget: '.widget-amount',
      price: '.cart__product-price',
      edit: '[href="#edit"]',
      remove: '[href="#remove"]',
    },
  };
  
  export const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
    cart: {
      wrapperActive: 'active',
    },
    booking: {
        loading: 'loading',
        tableBooked: 'booked',
    },
    nav: {
        active: 'active',
    },
    pages: {
        active: 'active',
    }
  };
  
  export const settings = {
    hours: {
        open: 12,
        close: 24,
    },
    datePicker: {
        maxDaysInFuture: 14,
    },
    booking: {
        tableIdAttribute: 'data-table',
    },
    db: {
      url: '//localhost:3131',
      songs: 'songs',
      search: 'search',
    }
  };
  
  export const templates = {
    home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
    discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
    search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
    player: Handlebars.compile(document.querySelector(select.templateOf.player).innerHTML), 
    categories: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML)
  };