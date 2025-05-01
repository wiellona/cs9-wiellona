const itemRepository = require("../repository/item.repository");
const baseResponses = require("../util/baseResponse.util");
const cloudinary = require("cloudinary").v2;
const { streamUpload } = require("../util/cloudinary.util");

// Create new item
exports.createItem = async (req, res) => {
  try {
    const { name, price, store_id, stock } = req.body;

    if (!name || !price || !store_id || !stock || !req.file) {
      return baseResponses(res, false, 400, "All fields are required", null);
    }

    const uploadResult = await streamUpload(req.file.buffer);
    const imageUrl = uploadResult.secure_url;

    const item = await itemRepository.createItem({
      name,
      price,
      store_id,
      stock,
      image_url: imageUrl,
    });

    return baseResponses(res, true, 201, "Item created successfully", item);
  } catch (error) {
    baseResponses(res, false, 500, error.message || "Server error", null);
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await itemRepository.getAllItems();
    return baseResponses(res, true, 200, "Items retrieved successfully", items);
  } catch (error) {
    console.error("Error getting items", error);
    return baseResponses(res, false, 500, "Error getting items", null);
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await itemRepository.getItemById(req.params.id);
    if (!item || item.length === 0) {
      return baseResponses(res, false, 404, "Item not found", null);
    }
    baseResponses(res, true, 200, "Item found", item);
  } catch (error) {
    console.error("Error getting item", error);
    baseResponses(res, false, 500, error.message || "Server error", null);
  }
};

// Get items by store ID
exports.getItemsByStoreId = async (req, res) => {
  try {
    const storeId = req.params.store_id;
    const items = await itemRepository.getItemsByStoreId(storeId);
    return baseResponses(res, true, 200, "Items retrieved successfully", items);
  } catch (error) {
    console.error("Error getting items by store error", error);
    baseResponses(res, false, 500, error.message || "Server error", null);
  }
};

// Update item by ID
exports.updateItem = async (req, res) => {
  try {
    const { id, name, price, store_id, stock } = req.body;

    // check if item exist
    const existingItem = await itemRepository.getItemById(id);

    if (!existingItem) {
      return baseResponses(res, false, 404, "Item not found", null);
    }

    let imageUrl = existingItem.image_url;

    // if there's an image in the request, upload it to Cloudinary
    if (req.file) {
      const publicId = imageUrl?.split("/").pop().split(".")[0];

      if (publicId && /^[\w-]+$/.test(publicId)) {
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResult = await streamUpload(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // Update item in the database
    const updatedItem = await itemRepository.updateItem(id, {
      name,
      price,
      store_id,
      stock,
      image_url: imageUrl,
    });

    return baseResponses(
      res,
      true,
      200,
      "Item updated successfully",
      updatedItem
    );
  } catch (error) {
    console.error("Error updating item", error);
    baseResponses(res, false, 500, error.message || "Server error", null);
  }
};

// Delete item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await itemRepository.getItemById(id);
    if (!item) {
      return baseResponses(res, false, 404, "Item not found", null);
    }

    const publicId = item.image_url?.split("/").pop().split(".")[0];
    if (publicId) await cloudinary.uploader.destroy(publicId);

    await itemRepository.deleteItemById(id);
    return baseResponses(res, true, 200, "Item deleted", item);
  } catch (error) {
    console.error("Error deleting item", error);
    baseResponses(res, false, 500, error.message || "Server error", null);
  }
};
