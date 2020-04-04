/**
 * Default type of blockquote.
 */
export const BLOCKQUOTE_TYPE = 'blockquote' as const;
export type BLOCKQUOTE_TYPE = typeof BLOCKQUOTE_TYPE;

/**
 * Default hotkey for toggling blockquote.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const BLOCKQUOTE_HOTKEY = 'ctrl+opt+q' as const;
export type BLOCKQUOTE_HOTKEY = typeof BLOCKQUOTE_HOTKEY;
