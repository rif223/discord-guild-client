/**
 * A generic collection class that extends Map to store objects with their IDs.
 * @template T - The type of objects stored in the collection.
 */
export class Collection extends Map {
  /**
   * Constructs a new Collection object.
   * @param {Client} client - The client instance to be used for creating items.
   * @param {new (client: Client, data: any) => T} obj - The constructor function for items in the collection.
   * @param {number} [limit] - The maximum number of items allowed in the collection.
   */
  constructor(client, obj, limit) {
    super();
    this._client = client;
    this._obj = obj;
    this._limit = limit;
  }

  /**
   * Adds an item to the collection.
   * @param {string} id - The ID of the item.
   * @param {any} data - The data of the item.
   */
  add(id, data) {
    if (this._limit && this.size >= this._limit) {
      // Optionally handle exceeding the limit (e.g., remove the oldest item)
      // This example just throws an error, but you could implement different behavior
      throw new Error("Collection limit exceeded");
    }
    super.set(id, new this._obj(this._client, data));
  }

  /**
   * Retrieves an item from the collection by its ID.
   * @param {string} id - The ID of the item.
   * @returns {T | undefined} The item if found, otherwise undefined.
   */
  get(id) {
    return super.get(id);
  }

  /**
   * Removes an item from the collection by its ID.
   * @param {string} id - The ID of the item.
   * @returns {boolean} True if the item was removed, otherwise false.
   */
  remove(id) {
    return super.delete(id);
  }

  /**
   * Clears all items from the collection.
   */
  clear() {
    super.clear();
  }

  /**
   * Checks if an item exists in the collection by its ID.
   * @param {string} id - The ID of the item.
   * @returns {boolean} True if the item exists, otherwise false.
   */
  has(id) {
    return super.has(id);
  }

  /**
   * Returns an array of all items in the collection.
   * @returns {T[]} An array of all items.
   */
  toArray() {
    return Array.from(this.values());
  }
}