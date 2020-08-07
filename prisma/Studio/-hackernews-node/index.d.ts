import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.4.1
 * Query Engine version: 195d4bdc2d16132977f4ba7a8ca312f7906cb086
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Links
 * const links = await prisma.link.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Links
   * const links = await prisma.link.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  
  /**
   * Add a middleware
   */
  $use(cb: Middleware): void
  

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): LinkDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): VoteDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Link
 */

export type Link = {
  id: number
  createdAt: Date
  description: string
  url: string
  postedById: number | null
}



export type LinkSelect = {
  id?: boolean
  createdAt?: boolean
  description?: boolean
  url?: boolean
  postedBy?: boolean | UserArgs
  postedById?: boolean
  votes?: boolean | FindManyVoteArgs
}

export type LinkInclude = {
  postedBy?: boolean | UserArgs
  votes?: boolean | FindManyVoteArgs
}

export type LinkGetPayload<
  S extends boolean | null | undefined | LinkArgs,
  U = keyof S
> = S extends true
  ? Link
  : S extends undefined
  ? never
  : S extends LinkArgs | FindManyLinkArgs
  ? 'include' extends U
    ? Link  & {
      [P in TrueKeys<S['include']>]:
      P extends 'postedBy'
      ? UserGetPayload<S['include'][P]> | null :
      P extends 'votes'
      ? Array<VoteGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Link ? Link[P]
: 
      P extends 'postedBy'
      ? UserGetPayload<S['select'][P]> | null :
      P extends 'votes'
      ? Array<VoteGetPayload<S['select'][P]>> : never
    }
  : Link
: Link


export interface LinkDelegate {
  /**
   * Find zero or one Link.
   * @param {FindOneLinkArgs} args - Arguments to find a Link
   * @example
   * // Get one Link
   * const link = await prisma.link.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLinkArgs>(
    args: Subset<T, FindOneLinkArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link | null>, Prisma__LinkClient<LinkGetPayload<T> | null>>
  /**
   * Find zero or more Links.
   * @param {FindManyLinkArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Links
   * const links = await prisma.link.findMany()
   * 
   * // Get first 10 Links
   * const links = await prisma.link.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLinkArgs>(
    args?: Subset<T, FindManyLinkArgs>
  ): CheckSelect<T, Promise<Array<Link>>, Promise<Array<LinkGetPayload<T>>>>
  /**
   * Create a Link.
   * @param {LinkCreateArgs} args - Arguments to create a Link.
   * @example
   * // Create one Link
   * const Link = await prisma.link.create({
   *   data: {
   *     // ... data to create a Link
   *   }
   * })
   * 
  **/
  create<T extends LinkCreateArgs>(
    args: Subset<T, LinkCreateArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Delete a Link.
   * @param {LinkDeleteArgs} args - Arguments to delete one Link.
   * @example
   * // Delete one Link
   * const Link = await prisma.link.delete({
   *   where: {
   *     // ... filter to delete one Link
   *   }
   * })
   * 
  **/
  delete<T extends LinkDeleteArgs>(
    args: Subset<T, LinkDeleteArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Update one Link.
   * @param {LinkUpdateArgs} args - Arguments to update one Link.
   * @example
   * // Update one Link
   * const link = await prisma.link.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LinkUpdateArgs>(
    args: Subset<T, LinkUpdateArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Delete zero or more Links.
   * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
   * @example
   * // Delete a few Links
   * const { count } = await prisma.link.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LinkDeleteManyArgs>(
    args: Subset<T, LinkDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Links.
   * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Links
   * const link = await prisma.link.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LinkUpdateManyArgs>(
    args: Subset<T, LinkUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Link.
   * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
   * @example
   * // Update or create a Link
   * const link = await prisma.link.upsert({
   *   create: {
   *     // ... data to create a Link
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Link we want to update
   *   }
   * })
  **/
  upsert<T extends LinkUpsertArgs>(
    args: Subset<T, LinkUpsertArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLinkArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Link.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LinkClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  postedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  votes<T extends FindManyVoteArgs = {}>(args?: Subset<T, FindManyVoteArgs>): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Link findOne
 */
export type FindOneLinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter, which Link to fetch.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link findMany
 */
export type FindManyLinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter, which Links to fetch.
  **/
  where?: LinkWhereInput
  /**
   * Determine the order of the Links to fetch.
  **/
  orderBy?: Enumerable<LinkOrderByInput>
  /**
   * Sets the position for listing Links.
  **/
  cursor?: LinkWhereUniqueInput
  /**
   * The number of Links to fetch. If negative number, it will take Links before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Links.
  **/
  skip?: number
}


/**
 * Link create
 */
export type LinkCreateArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The data needed to create a Link.
  **/
  data: LinkCreateInput
}


/**
 * Link update
 */
export type LinkUpdateArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The data needed to update a Link.
  **/
  data: LinkUpdateInput
  /**
   * Choose, which Link to update.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link updateMany
 */
export type LinkUpdateManyArgs = {
  data: LinkUpdateManyMutationInput
  where?: LinkWhereInput
}


/**
 * Link upsert
 */
export type LinkUpsertArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The filter to search for the Link to update in case it exists.
  **/
  where: LinkWhereUniqueInput
  /**
   * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
  **/
  create: LinkCreateInput
  /**
   * In case the Link was found with the provided `where` argument, update it with this data.
  **/
  update: LinkUpdateInput
}


/**
 * Link delete
 */
export type LinkDeleteArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter which Link to delete.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link deleteMany
 */
export type LinkDeleteManyArgs = {
  where?: LinkWhereInput
}


/**
 * Link without action
 */
export type LinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string
  email: string
  password: string
}



export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  password?: boolean
  links?: boolean | FindManyLinkArgs
  votes?: boolean | FindManyVoteArgs
}

export type UserInclude = {
  links?: boolean | FindManyLinkArgs
  votes?: boolean | FindManyVoteArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'links'
      ? Array<LinkGetPayload<S['include'][P]>> :
      P extends 'votes'
      ? Array<VoteGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'links'
      ? Array<LinkGetPayload<S['select'][P]>> :
      P extends 'votes'
      ? Array<VoteGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  links<T extends FindManyLinkArgs = {}>(args?: Subset<T, FindManyLinkArgs>): CheckSelect<T, Promise<Array<Link>>, Promise<Array<LinkGetPayload<T>>>>;

  votes<T extends FindManyVoteArgs = {}>(args?: Subset<T, FindManyVoteArgs>): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Vote
 */

export type Vote = {
  id: number
  linkId: number
  userId: number
}



export type VoteSelect = {
  id?: boolean
  link?: boolean | LinkArgs
  linkId?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type VoteInclude = {
  link?: boolean | LinkArgs
  user?: boolean | UserArgs
}

export type VoteGetPayload<
  S extends boolean | null | undefined | VoteArgs,
  U = keyof S
> = S extends true
  ? Vote
  : S extends undefined
  ? never
  : S extends VoteArgs | FindManyVoteArgs
  ? 'include' extends U
    ? Vote  & {
      [P in TrueKeys<S['include']>]:
      P extends 'link'
      ? LinkGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Vote ? Vote[P]
: 
      P extends 'link'
      ? LinkGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Vote
: Vote


export interface VoteDelegate {
  /**
   * Find zero or one Vote.
   * @param {FindOneVoteArgs} args - Arguments to find a Vote
   * @example
   * // Get one Vote
   * const vote = await prisma.vote.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneVoteArgs>(
    args: Subset<T, FindOneVoteArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote | null>, Prisma__VoteClient<VoteGetPayload<T> | null>>
  /**
   * Find zero or more Votes.
   * @param {FindManyVoteArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Votes
   * const votes = await prisma.vote.findMany()
   * 
   * // Get first 10 Votes
   * const votes = await prisma.vote.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyVoteArgs>(
    args?: Subset<T, FindManyVoteArgs>
  ): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>
  /**
   * Create a Vote.
   * @param {VoteCreateArgs} args - Arguments to create a Vote.
   * @example
   * // Create one Vote
   * const Vote = await prisma.vote.create({
   *   data: {
   *     // ... data to create a Vote
   *   }
   * })
   * 
  **/
  create<T extends VoteCreateArgs>(
    args: Subset<T, VoteCreateArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Delete a Vote.
   * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
   * @example
   * // Delete one Vote
   * const Vote = await prisma.vote.delete({
   *   where: {
   *     // ... filter to delete one Vote
   *   }
   * })
   * 
  **/
  delete<T extends VoteDeleteArgs>(
    args: Subset<T, VoteDeleteArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Update one Vote.
   * @param {VoteUpdateArgs} args - Arguments to update one Vote.
   * @example
   * // Update one Vote
   * const vote = await prisma.vote.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends VoteUpdateArgs>(
    args: Subset<T, VoteUpdateArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Delete zero or more Votes.
   * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
   * @example
   * // Delete a few Votes
   * const { count } = await prisma.vote.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends VoteDeleteManyArgs>(
    args: Subset<T, VoteDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Votes.
   * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Votes
   * const vote = await prisma.vote.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends VoteUpdateManyArgs>(
    args: Subset<T, VoteUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Vote.
   * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
   * @example
   * // Update or create a Vote
   * const vote = await prisma.vote.upsert({
   *   create: {
   *     // ... data to create a Vote
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Vote we want to update
   *   }
   * })
  **/
  upsert<T extends VoteUpsertArgs>(
    args: Subset<T, VoteUpsertArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyVoteArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Vote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__VoteClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  link<T extends LinkArgs = {}>(args?: Subset<T, LinkArgs>): CheckSelect<T, Prisma__LinkClient<Link | null>, Prisma__LinkClient<LinkGetPayload<T> | null>>;

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Vote findOne
 */
export type FindOneVoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter, which Vote to fetch.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote findMany
 */
export type FindManyVoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter, which Votes to fetch.
  **/
  where?: VoteWhereInput
  /**
   * Determine the order of the Votes to fetch.
  **/
  orderBy?: Enumerable<VoteOrderByInput>
  /**
   * Sets the position for listing Votes.
  **/
  cursor?: VoteWhereUniqueInput
  /**
   * The number of Votes to fetch. If negative number, it will take Votes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Votes.
  **/
  skip?: number
}


/**
 * Vote create
 */
export type VoteCreateArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The data needed to create a Vote.
  **/
  data: VoteCreateInput
}


/**
 * Vote update
 */
export type VoteUpdateArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The data needed to update a Vote.
  **/
  data: VoteUpdateInput
  /**
   * Choose, which Vote to update.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote updateMany
 */
export type VoteUpdateManyArgs = {
  data: VoteUpdateManyMutationInput
  where?: VoteWhereInput
}


/**
 * Vote upsert
 */
export type VoteUpsertArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The filter to search for the Vote to update in case it exists.
  **/
  where: VoteWhereUniqueInput
  /**
   * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
  **/
  create: VoteCreateInput
  /**
   * In case the Vote was found with the provided `where` argument, update it with this data.
  **/
  update: VoteUpdateInput
}


/**
 * Vote delete
 */
export type VoteDeleteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter which Vote to delete.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote deleteMany
 */
export type VoteDeleteManyArgs = {
  where?: VoteWhereInput
}


/**
 * Vote without action
 */
export type VoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
}



/**
 * Deep Input Types
 */


export type VoteWhereInput = {
  id?: number | IntFilter
  linkId?: number | IntFilter
  userId?: number | IntFilter
  AND?: Enumerable<VoteWhereInput>
  OR?: Array<VoteWhereInput>
  NOT?: Enumerable<VoteWhereInput>
  link?: LinkWhereInput | null
  user?: UserWhereInput | null
}

export type UserWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  email?: string | StringFilter
  password?: string | StringFilter
  links?: LinkFilter | null
  votes?: VoteFilter | null
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
}

export type LinkWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  description?: string | StringFilter
  url?: string | StringFilter
  postedById?: number | NullableIntFilter | null
  votes?: VoteFilter | null
  AND?: Enumerable<LinkWhereInput>
  OR?: Array<LinkWhereInput>
  NOT?: Enumerable<LinkWhereInput>
  postedBy?: UserWhereInput | null
}

export type LinkOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  description?: SortOrder
  url?: SortOrder
  postedById?: SortOrder
}

export type LinkWhereUniqueInput = {
  id?: number
}

export type VoteOrderByInput = {
  id?: SortOrder
  linkId?: SortOrder
  userId?: SortOrder
}

export type LinkIdUserIdCompoundUniqueInput = {
  linkId: number
  userId: number
}

export type VoteWhereUniqueInput = {
  id?: number
  linkId_userId?: LinkIdUserIdCompoundUniqueInput
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type LinkCreateWithoutVotesInput = {
  createdAt?: Date | string
  description: string
  url: string
  postedBy?: UserCreateOneWithoutLinksInput
}

export type LinkCreateOneWithoutVotesInput = {
  create?: LinkCreateWithoutVotesInput
  connect?: LinkWhereUniqueInput
}

export type VoteCreateWithoutUserInput = {
  link: LinkCreateOneWithoutVotesInput
}

export type VoteCreateManyWithoutUserInput = {
  create?: Enumerable<VoteCreateWithoutUserInput>
  connect?: Enumerable<VoteWhereUniqueInput>
}

export type UserCreateWithoutLinksInput = {
  name: string
  email: string
  password: string
  votes?: VoteCreateManyWithoutUserInput
}

export type UserCreateOneWithoutLinksInput = {
  create?: UserCreateWithoutLinksInput
  connect?: UserWhereUniqueInput
}

export type LinkCreateWithoutPostedByInput = {
  createdAt?: Date | string
  description: string
  url: string
  votes?: VoteCreateManyWithoutLinkInput
}

export type LinkCreateManyWithoutPostedByInput = {
  create?: Enumerable<LinkCreateWithoutPostedByInput>
  connect?: Enumerable<LinkWhereUniqueInput>
}

export type UserCreateWithoutVotesInput = {
  name: string
  email: string
  password: string
  links?: LinkCreateManyWithoutPostedByInput
}

export type UserCreateOneWithoutVotesInput = {
  create?: UserCreateWithoutVotesInput
  connect?: UserWhereUniqueInput
}

export type VoteCreateWithoutLinkInput = {
  user: UserCreateOneWithoutVotesInput
}

export type VoteCreateManyWithoutLinkInput = {
  create?: Enumerable<VoteCreateWithoutLinkInput>
  connect?: Enumerable<VoteWhereUniqueInput>
}

export type LinkCreateInput = {
  createdAt?: Date | string
  description: string
  url: string
  postedBy?: UserCreateOneWithoutLinksInput
  votes?: VoteCreateManyWithoutLinkInput
}

export type LinkUpdateWithoutVotesDataInput = {
  createdAt?: Date | string
  description?: string
  url?: string
  postedBy?: UserUpdateOneWithoutLinksInput
}

export type LinkUpsertWithoutVotesInput = {
  update: LinkUpdateWithoutVotesDataInput
  create: LinkCreateWithoutVotesInput
}

export type LinkUpdateOneRequiredWithoutVotesInput = {
  create?: LinkCreateWithoutVotesInput
  connect?: LinkWhereUniqueInput
  update?: LinkUpdateWithoutVotesDataInput
  upsert?: LinkUpsertWithoutVotesInput
}

export type VoteUpdateWithoutUserDataInput = {
  link?: LinkUpdateOneRequiredWithoutVotesInput
}

export type VoteUpdateWithWhereUniqueWithoutUserInput = {
  where: VoteWhereUniqueInput
  data: VoteUpdateWithoutUserDataInput
}

export type VoteScalarWhereInput = {
  id?: number | IntFilter
  linkId?: number | IntFilter
  userId?: number | IntFilter
  AND?: Enumerable<VoteScalarWhereInput>
  OR?: Array<VoteScalarWhereInput>
  NOT?: Enumerable<VoteScalarWhereInput>
}

export type VoteUpdateManyDataInput = {

}

export type VoteUpdateManyWithWhereNestedInput = {
  where: VoteScalarWhereInput
  data: VoteUpdateManyDataInput
}

export type VoteUpsertWithWhereUniqueWithoutUserInput = {
  where: VoteWhereUniqueInput
  update: VoteUpdateWithoutUserDataInput
  create: VoteCreateWithoutUserInput
}

export type VoteUpdateManyWithoutUserInput = {
  create?: Enumerable<VoteCreateWithoutUserInput>
  connect?: Enumerable<VoteWhereUniqueInput>
  set?: Enumerable<VoteWhereUniqueInput>
  disconnect?: Enumerable<VoteWhereUniqueInput>
  delete?: Enumerable<VoteWhereUniqueInput>
  update?: Enumerable<VoteUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<VoteUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<VoteScalarWhereInput>
  upsert?: Enumerable<VoteUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateWithoutLinksDataInput = {
  name?: string
  email?: string
  password?: string
  votes?: VoteUpdateManyWithoutUserInput
}

export type UserUpsertWithoutLinksInput = {
  update: UserUpdateWithoutLinksDataInput
  create: UserCreateWithoutLinksInput
}

export type UserUpdateOneWithoutLinksInput = {
  create?: UserCreateWithoutLinksInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutLinksDataInput
  upsert?: UserUpsertWithoutLinksInput
}

export type LinkUpdateWithoutPostedByDataInput = {
  createdAt?: Date | string
  description?: string
  url?: string
  votes?: VoteUpdateManyWithoutLinkInput
}

export type LinkUpdateWithWhereUniqueWithoutPostedByInput = {
  where: LinkWhereUniqueInput
  data: LinkUpdateWithoutPostedByDataInput
}

export type LinkScalarWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  description?: string | StringFilter
  url?: string | StringFilter
  postedById?: number | NullableIntFilter | null
  votes?: VoteFilter | null
  AND?: Enumerable<LinkScalarWhereInput>
  OR?: Array<LinkScalarWhereInput>
  NOT?: Enumerable<LinkScalarWhereInput>
}

export type LinkUpdateManyDataInput = {
  createdAt?: Date | string
  description?: string
  url?: string
}

export type LinkUpdateManyWithWhereNestedInput = {
  where: LinkScalarWhereInput
  data: LinkUpdateManyDataInput
}

export type LinkUpsertWithWhereUniqueWithoutPostedByInput = {
  where: LinkWhereUniqueInput
  update: LinkUpdateWithoutPostedByDataInput
  create: LinkCreateWithoutPostedByInput
}

export type LinkUpdateManyWithoutPostedByInput = {
  create?: Enumerable<LinkCreateWithoutPostedByInput>
  connect?: Enumerable<LinkWhereUniqueInput>
  set?: Enumerable<LinkWhereUniqueInput>
  disconnect?: Enumerable<LinkWhereUniqueInput>
  delete?: Enumerable<LinkWhereUniqueInput>
  update?: Enumerable<LinkUpdateWithWhereUniqueWithoutPostedByInput>
  updateMany?: Enumerable<LinkUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<LinkScalarWhereInput>
  upsert?: Enumerable<LinkUpsertWithWhereUniqueWithoutPostedByInput>
}

export type UserUpdateWithoutVotesDataInput = {
  name?: string
  email?: string
  password?: string
  links?: LinkUpdateManyWithoutPostedByInput
}

export type UserUpsertWithoutVotesInput = {
  update: UserUpdateWithoutVotesDataInput
  create: UserCreateWithoutVotesInput
}

export type UserUpdateOneRequiredWithoutVotesInput = {
  create?: UserCreateWithoutVotesInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutVotesDataInput
  upsert?: UserUpsertWithoutVotesInput
}

export type VoteUpdateWithoutLinkDataInput = {
  user?: UserUpdateOneRequiredWithoutVotesInput
}

export type VoteUpdateWithWhereUniqueWithoutLinkInput = {
  where: VoteWhereUniqueInput
  data: VoteUpdateWithoutLinkDataInput
}

export type VoteUpsertWithWhereUniqueWithoutLinkInput = {
  where: VoteWhereUniqueInput
  update: VoteUpdateWithoutLinkDataInput
  create: VoteCreateWithoutLinkInput
}

export type VoteUpdateManyWithoutLinkInput = {
  create?: Enumerable<VoteCreateWithoutLinkInput>
  connect?: Enumerable<VoteWhereUniqueInput>
  set?: Enumerable<VoteWhereUniqueInput>
  disconnect?: Enumerable<VoteWhereUniqueInput>
  delete?: Enumerable<VoteWhereUniqueInput>
  update?: Enumerable<VoteUpdateWithWhereUniqueWithoutLinkInput>
  updateMany?: Enumerable<VoteUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<VoteScalarWhereInput>
  upsert?: Enumerable<VoteUpsertWithWhereUniqueWithoutLinkInput>
}

export type LinkUpdateInput = {
  createdAt?: Date | string
  description?: string
  url?: string
  postedBy?: UserUpdateOneWithoutLinksInput
  votes?: VoteUpdateManyWithoutLinkInput
}

export type LinkUpdateManyMutationInput = {
  createdAt?: Date | string
  description?: string
  url?: string
}

export type UserCreateInput = {
  name: string
  email: string
  password: string
  links?: LinkCreateManyWithoutPostedByInput
  votes?: VoteCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  name?: string
  email?: string
  password?: string
  links?: LinkUpdateManyWithoutPostedByInput
  votes?: VoteUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  name?: string
  email?: string
  password?: string
}

export type VoteCreateInput = {
  link: LinkCreateOneWithoutVotesInput
  user: UserCreateOneWithoutVotesInput
}

export type VoteUpdateInput = {
  link?: LinkUpdateOneRequiredWithoutVotesInput
  user?: UserUpdateOneRequiredWithoutVotesInput
}

export type VoteUpdateManyMutationInput = {

}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type LinkFilter = {
  every?: LinkWhereInput
  some?: LinkWhereInput
  none?: LinkWhereInput
}

export type VoteFilter = {
  every?: VoteWhereInput
  some?: VoteWhereInput
  none?: VoteWhereInput
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
