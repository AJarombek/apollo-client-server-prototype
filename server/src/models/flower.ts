import { Model } from "objection";

class Flower extends Model {
    static get tableName() {
        return 'flower';
    }
}

export default Flower;
