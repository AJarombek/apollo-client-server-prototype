/**
 * GraphQL types used throughout the application.
 * @author Andrew Jarombek
 * @since 5/18/2020
 */

import { Context } from "./index";
import { GraphQLResolveInfo } from "graphql";

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
}

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;
