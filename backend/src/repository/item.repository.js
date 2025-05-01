const db = require("../database/pg.database");

exports.createItem = async (item) => {
  const checkStore = await db.query("SELECT * FROM stores WHERE id = $1", [
    item.store_id,
  ]);

  if (checkStore.rows.length === 0) {
    throw new Error("Store doesn't exist");
  }

  const result = await db.query(
    "INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [item.name, item.price, item.store_id, item.image_url, item.stock]
  );
  return result.rows[0];
};

exports.getAllItems = async () => {
  const stores = await db.query("SELECT * FROM items");
  return stores.rows;
};

exports.getItemById = async (id) => {
  const stores = await db.query("SELECT * FROM items WHERE id = $1", [id]);
  return stores.rows[0] || null;
};

exports.getItemsByStoreId = async (storeId) => {
  const result = await db.query("SELECT * FROM items WHERE store_id = $1", [
    storeId,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Store doesn't exist");
  } else {
    return result.rows;
  }
};

exports.updateItem = async (id, item) => {
  // check if item exist
  let list = [
    [item.name, "The Item name is required"],
    [item.price, "The Item price is required"],
    [item.store_id, "The Store ID is required"],
    [item.stock, "The Item stock is required"],
    [item.image_url, "The Item image is required"],
  ];

  for (let i = 0; i < list.length; i++) {
    if (list[i][0].length === 0 || list[i][0] === null) {
      throw new Error(list[i][1]);
    }
  }

  const result = await db.query(
    "UPDATE items SET name = $1, price = $2, store_id = $3, stock = $4, image_url = $5 WHERE id = $6 RETURNING *",
    [item.name, item.price, item.store_id, item.stock, item.image_url, id]
  );
  return result.rows[0];
};

exports.updateStock = async (id, newStock) => {
  const query = `UPDATE items SET stock = $1 WHERE id = $2 RETURNING *`;
  const result = await pool.query(query, [newStock, id]);
  return result.rows[0];
};

exports.decreaseItemStock = async (id, quantity) => {
  await db.query("UPDATE items SET stock = stock - $1 WHERE id = $2", [
    quantity,
    id,
  ]);
};
