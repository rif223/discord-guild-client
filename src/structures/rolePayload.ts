/**
 * Represents the payload for creating or updating a role in a guild.
 * This class encapsulates all the parameters needed to define a role.
 */
export class RolePayload {
    private _name?: string;
    private _permissions?: string;
    private _color?: number;
    private _hoist?: boolean;
    private _icon?: string | null;
    private _unicodeEmoji?: string | null;
    private _mentionable?: boolean;

    /**
     * Creates a new `RolePayload` instance.
     * @param data Optional initial data to set in the payload.
     */
    constructor(data?: {
        name?: string;
        permissions?: string;
        color?: number;
        hoist?: boolean;
        icon?: string | null;
        unicode_emoji?: string | null;
        mentionable?: boolean;
    }) {
        if (data) {
            this._name = data.name;
            this._permissions = data.permissions;
            this._color = data.color;
            this._hoist = data.hoist;
            this._icon = data.icon;
            this._unicodeEmoji = data.unicode_emoji;
            this._mentionable = data.mentionable;
        }
    }

    /**
     * Gets the name of the role.
     * @returns The name of the role.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name of the role.
     * @param value The name of the role (max 100 characters).
     * @throws Error if the name exceeds 100 characters.
     */
    set name(value: string | undefined) {
        if (value && value.length > 100) {
            throw new Error("Role name must be up to 100 characters.");
        }
        this._name = value;
    }

    /**
     * Gets the permissions for the role.
     * @returns The permissions as a string.
     */
    get permissions() {
        return this._permissions;
    }

    /**
     * Sets the permissions for the role.
     * @param value The permissions as a bitwise string.
     */
    set permissions(value: string | undefined) {
        this._permissions = value;
    }

    /**
     * Gets the color of the role.
     * @returns The color as an integer.
     */
    get color() {
        return this._color;
    }

    /**
     * Sets the color of the role.
     * @param value The color as an integer (RGB value).
     */
    set color(value: number | undefined) {
        this._color = value;
    }

    /**
     * Gets the hoist status of the role.
     * @returns True if the role should be hoisted.
     */
    get hoist() {
        return this._hoist;
    }

    /**
     * Sets the hoist status of the role.
     * @param value True if the role should be displayed separately in the sidebar.
     */
    set hoist(value: boolean | undefined) {
        this._hoist = value;
    }

    /**
     * Gets the icon for the role.
     * @returns The icon as a string, or null if not set.
     */
    get icon() {
        return this._icon;
    }

    /**
     * Sets the icon for the role.
     * @param value The icon as a string, or null to remove it.
     */
    set icon(value: string | null | undefined) {
        this._icon = value;
    }

    /**
     * Gets the unicode emoji for the role.
     * @returns The unicode emoji as a string, or null if not set.
     */
    get unicodeEmoji() {
        return this._unicodeEmoji;
    }

    /**
     * Sets the unicode emoji for the role.
     * @param value The unicode emoji as a string, or null to remove it.
     */
    set unicodeEmoji(value: string | null | undefined) {
        this._unicodeEmoji = value;
    }

    /**
     * Gets the mentionable status of the role.
     * @returns True if the role is mentionable.
     */
    get mentionable() {
        return this._mentionable;
    }

    /**
     * Sets the mentionable status of the role.
     * @param value True if the role should be mentionable.
     */
    set mentionable(value: boolean | undefined) {
        this._mentionable = value;
    }

    /**
     * Converts the payload to a JSON-serializable object.
     * @returns A JSON-serializable representation of the payload.
     */
    toJSON() {
        const result: any = {};
        if (this._name !== undefined) result.name = this._name;
        if (this._permissions !== undefined) result.permissions = this._permissions;
        if (this._color !== undefined) result.color = this._color;
        if (this._hoist !== undefined) result.hoist = this._hoist;
        if (this._icon !== undefined) result.icon = this._icon;
        if (this._unicodeEmoji !== undefined) result.unicode_emoji = this._unicodeEmoji;
        if (this._mentionable !== undefined) result.mentionable = this._mentionable;
        return result;
    }
}