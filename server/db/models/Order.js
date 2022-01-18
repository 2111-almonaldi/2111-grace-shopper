const Sequelize = require("sequelize");
const { ENUM, ARRAY, VIRTUAL, STRING, INTEGER, LITERAL} = Sequelize;
const db = require("../db");
const { Product } = require("./Product");
const { User } = require("./User");
const { Op } = require("sequelize")

const Order = db.define("order", {
  status: {
    type: ENUM("CREATED", "PROCESSING", "CANCELLED", "FULFILLED"),
    allowNull: false,
    defaultValue: "CREATED",
  },
  items: {
    type: ARRAY(Sequelize.JSON),
    //allowNull: false
  },

  subtotal: {
		type: VIRTUAL,
		get() {
			if (this.items.length) {
				return this.items
					.map((item) => {
						item.quantity * this.item.priceAtCheckout()
					})
					.reduce((a, b) => a + b, 0);
			}
      else return 0
		},
	},
  orderQty: {
    type: VIRTUAL,
    get() {
      if (this.items.length) {
        return this.items.map((item) => {
          item.quantity
        })
        .reduce((a, b) => a + b, 0)
      }
      else return 0;
    }
  },
  customerName: {
    type: STRING,
  },
  customerEmail: {
    type: STRING,
  },
  customerAddress: {
    type: STRING,
  },
  customerCity: {
    type: STRING,
  },
  customerState: {
    type: STRING,
  },
  customerZip: {
    type: STRING,
  },
  customerPhone: {
    type: STRING,
  },

  orderNumber: {
    type: INTEGER,

  }
});

// add in skus -> product details / order details
// orderdetails


Order.prototype.priceAtCheckout = async (order) => {
  const items = await order.getItems();
  const itemPrice = items.reduce((a, c) => a + c.price * c.quantity, 0);
  const tax = itemPrice * 0.08;
  const totalPrice = itemPrice + tax;
  return totalPrice
}
Order.checkout = async (user) => {
  const order = (
    await user.getOrders({
      where: {
        status: "CREATED",
      }
    })
  )[0];
  await order.update({ status: "PROCESSING"});
  // await user.createOrder(); // for next order => { status: "CREATED"}
  const items = await order.getItems();
  for (let i = 0; i < items.length; i++) {
    await items[i].priceAtCheckout()
  }
  return items;
}

Order.guestCheckout = async (guestUser) => {
  if (guestUser.username === 'Guest') {
    const guestOrder = (

    await guestUser.getOrders({
      where: {
        status: "CREATED"
      }
    })
  )[0];
    await guestOrder.update({ status: "PROCESSING"});
    const items = await guestOrder.getItems();
    for (let i = 0; i < items.length; i++) {
      await items[i].priceAtCheckout()
    }
  }
}


Order.prototype.getUserOrderHistory = async function(userId){
  const user = await User.findByPk(userId)
  const orderHistory = await user.getOrders({
    where: { status: "PROCESSING" || "COMPLETED" || "CANCELLED" }

  })
  if (orderHistory.items.length > 0){
    return orderHistory.map(order => order.getUserItems())
  } else return []
}

Order.prototype.continueShopping = async function (userId) {
  const user = await User.findByPk(userId)
  const ordersInCartOnly = await user.getOrders({
    where: { status: "CREATED"}
    // only return orders that have items in cart otherwise return {}

  })
  if (ordersInCartOnly.items.length > 0) {
    return ordersInCartOnly.map(order => order.getUserItems())
  } else return []
}


/*
Sequelize helper functions
*/

const paginate = ({ page }, pageSize = 5) => {
  if (page) {
    return {
      limit: pageSize,
      offset: (page - 1) * pageSize
    }
  }
  return {}
};

const orderHistoryFilter = ({ orders }) => {
  if (orders.length)  {
    orders = orders.split("|");
    return {
      where: {
        status: {
          [Op.in]: orders.map(order => order.status)

        }
      }
    }
  }

  return {};
};




const orderSort = ({ sort, dir = "asc"}) => {
  if (sort && sort !== "none") {
    return {
      order: [[sort, dir.toUpperCase()]]
    }
  }
  return {};
}

/**
 * @@ Requires sequelize extension Trigram Text Indexes for db => to_tsvector
 *
 * enable pg_trgm extension on db "team-mockbuster" via <<CREATE EXTENSION pg_trgm;>>
**/

// https://about.gitlab.com/blog/2016/03/18/fast-search-using-postgresql-trigram-indexes/
const orderSearch = (table, field, { search }) => {
  if (search) {
    return {
      where:
      LITERAL(`similarity(${table}.${field}, '${search})' > 0.03`)
    }
  }
  return {}
};


/*----------------------------------------------------------------

CREATE TABLE AS SELECT word FROM ts_stat('SELECT to_tsvector(''simple'', orderNumber) FROM orders');
CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);
CREATE INDEX CONCURRENTLY trgm_index_order_orderNumbers ON orders USING gin (orderNumber gin_trgm_ops);

ALTER TABLE orders ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('number', orderNumber)) STORED;
CREATE INDEX ts_idx ON ORDERS USING GIN (ts gin_trgm_ops);

CREATE INDEX order_orderNumber_idx ON products USING gin (name gin_trgm_ops);

------------------------------------------------------------------
*/


module.exports = { Order, paginate, orderHistoryFilter, orderSort, orderSearch };
