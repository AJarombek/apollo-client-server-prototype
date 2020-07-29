/**
 * Model for the Flower table in the database.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { Model } from "objection";
import knex from "./knex";

Model.knex(knex);

class Flower extends Model {
    static get tableName() {
        return 'shop.flower';
    }
}

export default Flower;
