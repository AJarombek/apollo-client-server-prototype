/**
 * GraphQL types used throughout the application.
 * @author Andrew Jarombek
 * @since 5/18/2020
 */

import { Context } from './index';
import { GraphQLResolveInfo } from 'graphql';

type Nothing = null;
export type Maybe<T> = T | Nothing;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ping = {
  time: Scalars['Int'];
};

export type Flower = {
  id: Scalars['ID'];
  name: Scalars['String'];
  image: Scalars['String'];
  type: PlantType;
  inStock: Maybe<Scalars['Boolean']>;
  onSale: Maybe<Scalars['Boolean']>;
  count: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['Float']>;
  salePrice: Maybe<Scalars['Float']>;
  description: Maybe<Scalars['String']>;
};

export type FlowerPurchase = {
  id: Scalars['ID'];
  count: Scalars['Int'];
};

export type PlantType = 'ANNUAL' | 'PERENNIAL' | 'SHRUB';

export type QueryFlowerArgs = {
  id: Flower['id'];
};

export type QueryFlowersInArgs = {
  in: Flower['id'][];
};

export type MutationPurchaseFlowersArgs = {
  purchases: FlowerPurchase[];
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolversTypes = {
  Query: {};
  Mutation: {};
  Int: number;
  Boolean: boolean;
  Flower: any;
  Ping: any;
};

export type QueryResolvers<ContextType = Context, ParentType = ResolversTypes['Query']> = {
  ping?: Resolver<Maybe<ResolversTypes['Ping']>, ParentType, ContextType>;
  flower?: Resolver<Maybe<ResolversTypes['Flower']>, ParentType, ContextType, QueryFlowerArgs>;
  flowers?: Resolver<Array<ResolversTypes['Flower']>, ParentType, ContextType>;
  flowersIn?: Resolver<Array<ResolversTypes['Flower']>, ParentType, ContextType, QueryFlowersInArgs>;
};

export type MutationResolvers<ContextType = Context, ParentType = ResolversTypes['Mutation']> = {
  purchaseFlowers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationPurchaseFlowersArgs>;
};

export type Resolvers<ContextType = Context> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
