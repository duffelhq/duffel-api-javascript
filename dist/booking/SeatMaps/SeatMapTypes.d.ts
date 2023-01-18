/**
 * Seat maps are used to build a rich experience for your customers so they can select a seat as part of an order.
 * A seat map includes the data for rendering seats in the relevant cabins, along with their total cost and other information such as disclosures.
 * @link https://duffel.com/docs/api/seat-maps/schema
 */
export interface SeatMap {
    /**
     * Duffel's unique identifier for the seat map
     */
    id: string;
    /**
     * Duffel's unique identifier for the slice. It identifies the slice of an offer (i.e. the same slice across offers will have different ids.)
     */
    slice_id: string;
    /**
     * Duffel's unique identifier for the segment. It identifies the segment of an offer (i.e. the same segment across offers will have different ids).
     */
    segment_id: string;
    /**
     * The list of cabins in this seat map.
     * Cabins are ordered by deck from lowest to highest, and then within each deck from the front to back of the aircraft.
     */
    cabins: SeatMapCabin[];
}
export interface SeatMapCabin {
    /**
     * Level 0 is the main deck and level 1 is the upper deck above that, which is found on some large aircraft.
     */
    deck: number;
    /**
     * The cabin class that the passenger will travel in on this segment
     */
    cabin_class: string;
    /**
     * Where the wings of the aircraft are in relation to rows in the cabin.
     * The numbers correspond to the indices of the first and the last row which are overwing. You can use this to draw a visual representation of the wings to help users get a better idea of what they will see outside their window.
     * The indices are 0 th-based and are for all rows, not just those that have seats.
     * This is null when no rows of the cabin are overwing.
     */
    wings: {
        /**
         * The index of the first row which is overwing, starting from the front of the aircraft.
         */
        first_row_index: number;
        /**
         * The index of the last row which is overwing, starting from the front of the aircraft.
         */
        last_row_index: number;
    } | null;
    /**
     * The number of aisles in this cabin.
     * If this is set to 1, each row of the cabin is split into two sections. If this is set to 2, each row of the cabin is split into three section.
     */
    aisles: number;
    /**
     * A list of rows in this cabin.
     * Row sections are broken up by aisles. Rows are ordered from front to back of the aircraft.
     */
    rows: SeatMapCabinRow[];
}
export interface SeatMapCabinRow {
    /**
     * A list of sections.
     * Each row is divided into sections by one or more aisles.
     */
    sections: SeatMapCabinRowSection[];
}
export interface SeatMapCabinRowSection {
    /**
     * The elements that make up this section.
     */
    elements: SeatMapCabinRowSectionElement[];
}
/**
 * A seat for a passenger. If the available_services list is empty (which will be represented as an empty list : []), the seat is unavailable.
 * For display, all seats should be displayed with the same static width.
 */
export interface SeatMapCabinRowSectionElementSeat {
    /**
     * The type of this element.
     */
    type: 'seat';
    /**
     * The designator used to uniquely identify the seat, usually made up of a row number and a column letter
     */
    designator: string;
    /**
     * A name which describes the type of seat, which you can display in your user interface to help customers to understand its features
     */
    name?: string;
    /**
     * Each disclosure is text, in English, provided by the airline that describes the terms and conditions of this seat. We recommend showing this in your user interface to make sure that customers understand any restrictions and limitations.
     */
    disclosures: string[];
    /**
     * Seats are considered a special kind of service. There will be at most one service per seat per passenger. A seat can only be booked for one passenger. If a seat has no available services (which will be represented as an empty list : []) then it's unavailable.
     */
    available_services: SeatMapCabinRowSectionAvailableService[];
}
export interface SeatMapCabinRowSectionAvailableService {
    /**
     * Duffel's unique identifier for the service
     */
    id: string;
    /**
     * The passenger that this seat is for
     */
    passenger_id: string;
    /**
     * The total price of the seat, including taxes
     */
    total_amount: string;
    /**
     * The currency of the total_amount, as an ISO 4217 currency code
     */
    total_currency: string;
}
/**
 * A bassinet is a child's cradle. This element will be aligned with the corresponding seat in the following row.
 * For display, this element should have the same width as a seat for proper alignment.
 */
export interface SeatMapCabinRowSectionElementBassinet {
    /**
     * The type of this element.
     */
    type: 'bassinet';
}
/**
 * An empty space used for padding in some non-standard seat arrangements.
 * For display, this element should have the same dimensions as a seat for proper alignment.
 */
export interface SeatMapCabinRowSectionElementEmpty {
    /**
     * The type of this element.
     */
    type: 'empty';
}
/**
 * An exit row represents the extra wide legroom used to reach aircraft exits. There is one exit_row element per row section.
 * Exit row elements only occur in their own row, so they can be displayed as one element across the whole row. Displaying an exit row element filling all available space in its section or using the same width as the seat is also reasonable.
 */
export interface SeatMapCabinRowSectionElementExitRow {
    /**
     * The type of this element.
     */
    type: 'exit_row';
}
/**
 * A lavatory for use by passengers.
 * For display, this element should ideally fill or shrink to available space in a row section. Displaying it with the same width as seat is also reasonable.
 */
export interface SeatMapCabinRowSectionElementLavatory {
    /**
     * The type of this element.
     */
    type: 'lavatory';
}
/**
 * A galley is the compartment where food is cooked or prepared. These are conventionally marked with a teacup symbol.
 * For display, this element should ideally fill or shrink to available space in a row section. Displaying it with the same width as seat is also reasonable.
 */
export interface SeatMapCabinRowSectionElementGalley {
    /**
     * The type of this element.
     */
    type: 'galley';
}
/**
 * A closet used for storage. These are conventionally marked with a clothes hanger symbol.
 * For display, this element should ideally fill or shrink to available space in a row section. Displaying it with the same width as seat is also reasonable.
 */
export interface SeatMapCabinRowSectionElementCloset {
    /**
     * The type of this element.
     */
    type: 'closet';
}
/**
 * A set of stairs to another deck.
 * For display, this element should ideally fill or shrink to available space in a row section. Displaying it with the same width as seat is also reasonable.
 */
export interface SeatMapCabinRowSectionElementStairs {
    /**
     * The type of this element.
     */
    type: 'stairs';
}
export declare type SeatMapCabinRowSectionElement = SeatMapCabinRowSectionElementSeat | SeatMapCabinRowSectionElementBassinet | SeatMapCabinRowSectionElementEmpty | SeatMapCabinRowSectionElementExitRow | SeatMapCabinRowSectionElementLavatory | SeatMapCabinRowSectionElementGalley | SeatMapCabinRowSectionElementCloset | SeatMapCabinRowSectionElementStairs;
export declare type SeatMapCabinRowSectionElementType = SeatMapCabinRowSectionElement['type'];
export declare type SeatMapCabinRowSectionElementAmenity = Exclude<SeatMapCabinRowSectionElementType, 'empty' | 'seat'>;
