/**
 * Represents an embed object, typically used in rich media messages.
 * An embed is a message containing rich media, such as images, links, and videos.
 */
export class Embed {
  /**
   * The title of the embed.
   * @type {string | undefined}
   */

  /**
   * The type of the embed. Default is "rich", but other types include "image", "video", etc.
   * @type {string | undefined}
   */

  /**
   * The description text of the embed.
   * @type {string | undefined}
   */

  /**
   * The URL associated with the embed.
   * @type {string | undefined}
   */

  /**
   * The timestamp of the embed in ISO8601 format.
   * @type {string | undefined}
   */

  /**
   * The color code of the embed, usually represented as an integer.
   * @type {number | undefined}
   */

  /**
   * The footer section of the embed, typically containing text and an optional icon.
   * @type {EmbedFooter | undefined}
   */

  /**
   * The image section of the embed, typically containing a URL to an image.
   * @type {EmbedImage | undefined}
   */

  /**
   * The thumbnail section of the embed, typically a small image preview.
   * @type {EmbedThumbnail | undefined}
   */

  /**
   * The video section of the embed, containing video information (optional).
   * @type {EmbedVideo | undefined}
   */

  /**
   * The provider of the embed, which includes the name and URL of the service that generated the embed (optional).
   * @type {EmbedProvider | undefined}
   */

  /**
   * The author section of the embed, typically containing the author's name, URL, and an optional icon.
   * @type {EmbedAuthor | undefined}
   */

  /**
   * An array of field objects, which add custom structured data to the embed. Maximum of 25 fields.
   * @type {EmbedField[] | undefined}
   */

  /**
   * Constructs a new Embed object.
   * @param {Client} client - The client instance managing this embed.
   * @param {any} data - The raw data from the API representing the embed.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the embed properties with the provided data.
   * @param {Object} data - The data object containing embed information.
   */
  _update(data) {
    this.title = data.title;
    this.type = data.type || "rich";
    this.description = data.description;
    this.url = data.url;
    this.timestamp = data.timestamp;
    this.color = data.color;
    this.footer = data.footer ? new EmbedFooter(data.footer) : undefined;
    this.image = data.image ? new EmbedImage(data.image) : undefined;
    this.thumbnail = data.thumbnail ? new EmbedThumbnail(data.thumbnail) : undefined;
    this.video = data.video ? new EmbedVideo(data.video) : undefined;
    this.provider = data.provider ? new EmbedProvider(data.provider) : undefined;
    this.author = data.author ? new EmbedAuthor(data.author) : undefined;
    this.fields = data.fields ? data.fields.map(field => new EmbedField(field)) : [];
  }
}

/**
 * Represents the footer section of an embed.
 * The footer typically contains small, supplementary text and optionally an icon.
 */
export class EmbedFooter {
  /**
   * The footer text.
   * @type {string}
   */

  /**
   * The URL of the footer icon (optional).
   * @type {string | undefined}
   */

  /**
   * A proxied URL of the footer icon (optional).
   * @type {string | undefined}
   */

  /**
   * Constructs a new EmbedFooter object.
   * @param {Object} data - The data representing the footer.
   */
  constructor(data) {
    this.text = data.text;
    this.icon_url = data.icon_url;
    this.proxy_icon_url = data.proxy_icon_url;
  }
}

/**
 * Represents the image section of an embed.
 * Contains a URL to an image and optional dimensions.
 */
export class EmbedImage {
  /**
   * The URL of the image.
   * @type {string}
   */

  /**
   * A proxied URL of the image (optional).
   * @type {string | undefined}
   */

  /**
   * The height of the image in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * The width of the image in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * Constructs a new EmbedImage object.
   * @param {Object} data - The data representing the image.
   */
  constructor(data) {
    this.url = data.url;
    this.proxy_url = data.proxy_url;
    this.height = data.height;
    this.width = data.width;
  }
}

/**
 * Represents the thumbnail section of an embed.
 * Typically a small image preview at the top right of the embed.
 */
export class EmbedThumbnail {
  /**
   * The URL of the thumbnail image.
   * @type {string}
   */

  /**
   * A proxied URL of the thumbnail image (optional).
   * @type {string | undefined}
   */

  /**
   * The height of the thumbnail image in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * The width of the thumbnail image in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * Constructs a new EmbedThumbnail object.
   * @param {Object} data - The data representing the thumbnail.
   */
  constructor(data) {
    this.url = data.url;
    this.proxy_url = data.proxy_url;
    this.height = data.height;
    this.width = data.width;
  }
}

/**
 * Represents the video section of an embed.
 * Contains a URL to a video and optional dimensions.
 */
export class EmbedVideo {
  /**
   * The URL of the video (optional).
   * @type {string | undefined}
   */

  /**
   * A proxied URL of the video (optional).
   * @type {string | undefined}
   */

  /**
   * The height of the video in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * The width of the video in pixels (optional).
   * @type {number | undefined}
   */

  /**
   * Constructs a new EmbedVideo object.
   * @param {Object} data - The data representing the video.
   */
  constructor(data) {
    this.url = data.url;
    this.proxy_url = data.proxy_url;
    this.height = data.height;
    this.width = data.width;
  }
}

/**
 * Represents the provider section of an embed.
 * Typically contains the name and URL of the service that generated the embed.
 */
export class EmbedProvider {
  /**
   * The name of the provider (optional).
   * @type {string | undefined}
   */

  /**
   * The URL of the provider (optional).
   * @type {string | undefined}
   */

  /**
   * Constructs a new EmbedProvider object.
   * @param {Object} data - The data representing the provider.
   */
  constructor(data) {
    this.name = data.name;
    this.url = data.url;
  }
}

/**
 * Represents the author section of an embed.
 * Contains the author's name, URL, and an optional icon.
 */
export class EmbedAuthor {
  /**
   * The name of the author.
   * @type {string}
   */

  /**
   * The URL of the author (optional).
   * @type {string | undefined}
   */

  /**
   * The URL of the author's icon (optional).
   * @type {string | undefined}
   */

  /**
   * A proxied URL of the author's icon (optional).
   * @type {string | undefined}
   */

  /**
   * Constructs a new EmbedAuthor object.
   * @param {Object} data - The data representing the author.
   */
  constructor(data) {
    this.name = data.name;
    this.url = data.url;
    this.icon_url = data.icon_url;
    this.proxy_icon_url = data.proxy_icon_url;
  }
}

/**
 * Represents a field in an embed.
 * Each field contains a name, value, and an optional inline setting.
 */
export class EmbedField {
  /**
   * The name of the field.
   * @type {string}
   */

  /**
   * The value of the field.
   * @type {string}
   */

  /**
   * Whether the field should be displayed inline.
   * @type {boolean | undefined}
   */

  /**
   * Constructs a new EmbedField object.
   * @param {Object} data - The data representing the field.
   */
  constructor(data) {
    this.name = data.name;
    this.value = data.value;
    this.inline = data.inline;
  }
}