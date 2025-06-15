/**
 * Represents the payload for creating a Discord invite.
 * This class encapsulates all parameters needed to create an invite.
 */
export class InvitePayload {
    private _maxAge?: number;
    private _maxUses?: number;
    private _temporary?: boolean;
    private _unique?: boolean;
    private _targetType?: number;
    private _targetUserId?: string;
    private _targetApplicationId?: string;

    /**
     * Creates a new `InvitePayload` instance.
     * @param data Optional initial data to set in the payload.
     */
    constructor(data?: {
        max_age?: number;
        max_uses?: number;
        temporary?: boolean;
        unique?: boolean;
        target_type?: number;
        target_user_id?: string;
        target_application_id?: string;
    }) {
        if (data) {
            this.maxAge = data.max_age;
            this.maxUses = data.max_uses;
            this.temporary = data.temporary;
            this.unique = data.unique;
            this.targetType = data.target_type;
            this.targetUserId = data.target_user_id;
            this.targetApplicationId = data.target_application_id;
        }
    }

    /**
     * Gets the duration (in seconds) before the invite expires.
     * 0 means the invite never expires.
     * Must be between 0 and 604800 (7 days).
     * @returns The invite expiration duration in seconds.
     */
    get maxAge() {
        return this._maxAge;
    }

    /**
     * Sets the duration (in seconds) before the invite expires.
     * @param value Duration in seconds (0 to 604800).
     * @throws Error if the value is out of range.
     */
    set maxAge(value: number | undefined) {
        if (value !== undefined && (value < 0 || value > 604800)) {
            throw new Error("max_age must be between 0 and 604800 seconds.");
        }
        this._maxAge = value;
    }

    /**
     * Gets the maximum number of uses for the invite.
     * 0 means unlimited uses.
     * Must be between 0 and 100.
     * @returns The maximum number of uses.
     */
    get maxUses() {
        return this._maxUses;
    }

    /**
     * Sets the maximum number of uses for the invite.
     * @param value Maximum uses (0 to 100).
     * @throws Error if the value is out of range.
     */
    set maxUses(value: number | undefined) {
        if (value !== undefined && (value < 0 || value > 100)) {
            throw new Error("max_uses must be between 0 and 100.");
        }
        this._maxUses = value;
    }

    /**
     * Gets whether the invite grants temporary membership.
     * @returns True if temporary membership is granted.
     */
    get temporary() {
        return this._temporary;
    }

    /**
     * Sets whether the invite grants temporary membership.
     * @param value True to grant temporary membership.
     */
    set temporary(value: boolean | undefined) {
        this._temporary = value;
    }

    /**
     * Gets whether the invite should always create a new unique invite.
     * Useful for generating one-time-use invites.
     * @returns True if invite is unique.
     */
    get unique() {
        return this._unique;
    }

    /**
     * Sets whether the invite should always create a new unique invite.
     * @param value True to create a unique invite.
     */
    set unique(value: boolean | undefined) {
        this._unique = value;
    }

    /**
     * Gets the target type of the voice channel invite.
     * 1 = Stream, 2 = Embedded Application.
     * @returns The target type number.
     */
    get targetType() {
        return this._targetType;
    }

    /**
     * Sets the target type of the voice channel invite.
     * @param value Target type (1 for Stream, 2 for Embedded Application).
     * @throws Error if the value is not 1 or 2.
     */
    set targetType(value: number | undefined) {
        if (value !== undefined && value !== 1 && value !== 2) {
            throw new Error("target_type must be either 1 (Stream) or 2 (Embedded Application).");
        }
        this._targetType = value;
    }

    /**
     * Gets the user ID whose stream should be displayed.
     * Required if target_type is 1 (Stream).
     * @returns The target user ID.
     */
    get targetUserId() {
        return this._targetUserId;
    }

    /**
     * Sets the user ID whose stream should be displayed.
     * @param value Target user ID.
     */
    set targetUserId(value: string | undefined) {
        this._targetUserId = value;
    }

    /**
     * Gets the ID of the embedded application to launch.
     * Required if target_type is 2 (Embedded Application).
     * @returns The target application ID.
     */
    get targetApplicationId() {
        return this._targetApplicationId;
    }

    /**
     * Sets the ID of the embedded application to launch.
     * @param value Target application ID.
     */
    set targetApplicationId(value: string | undefined) {
        this._targetApplicationId = value;
    }

    /**
     * Converts the payload to a JSON-serializable object.
     * @returns A JSON object representation of the invite payload.
     */
    toJSON() {
        const result: any = {};
        if (this._maxAge !== undefined) result.max_age = this._maxAge;
        if (this._maxUses !== undefined) result.max_uses = this._maxUses;
        if (this._temporary !== undefined) result.temporary = this._temporary;
        if (this._unique !== undefined) result.unique = this._unique;
        if (this._targetType !== undefined) result.target_type = this._targetType;
        if (this._targetUserId !== undefined) result.target_user_id = this._targetUserId;
        if (this._targetApplicationId !== undefined) result.target_application_id = this._targetApplicationId;
        return result;
    }
}
