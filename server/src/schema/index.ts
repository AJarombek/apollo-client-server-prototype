import {importSchema} from "graphql-import";

const mainSchema = importSchema('schema.graphql');
const pingSchema = importSchema('ping.graphql');
const flowerSchema = importSchema('flower.graphql');

export default [mainSchema, pingSchema, flowerSchema];
