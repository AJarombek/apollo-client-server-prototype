/**
 * Types used throughout the front-end application
 * @author Andrew Jarombek
 * @since 7/30/2020
 */

export type PlantType = "ANNUAL" | "PERENNIAL" | "SHRUB";

export type Flower = {
    id: number;
    name: string;
    image: string;
    type: PlantType;
    inStock?: boolean;
    onSale?: boolean;
    count?: number;
    price?: number;
    salePrice?: number;
    description?: string;
}
