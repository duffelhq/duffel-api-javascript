export interface SelectedPartialOffersParams {
    /**
     * Whether to filter orders that are awaiting payment or not. If not specified, all orders regardless of their payment state will be returned.
     */
    'selected_partial_offer[]'?: string[];
}
