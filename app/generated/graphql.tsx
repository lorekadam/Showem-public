import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdminCategory = {
  __typename?: 'AdminCategory';
  category?: Maybe<Category>;
  words?: Maybe<Array<Maybe<Word>>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  translate: Translate;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  basic?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Icons>;
};

export type CreateCategoryResponse = {
  __typename?: 'CreateCategoryResponse';
  ok?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
};

export enum Icons {
  Default = 'default',
  Movie = 'movie',
  Book = 'book',
  Place = 'place',
  Object = 'object',
  Animal = 'animal',
  Occupation = 'occupation',
  Food = 'food'
}

export type LogInUserResponse = {
  __typename?: 'LogInUserResponse';
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LogInUserResponse>;
  adminLogin?: Maybe<LogInUserResponse>;
  register?: Maybe<LogInUserResponse>;
  facebooklogin?: Maybe<LogInUserResponse>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  revokeRefreshToken?: Maybe<Scalars['Boolean']>;
  forgotPassword?: Maybe<Scalars['String']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  createCategory?: Maybe<Scalars['Boolean']>;
  adminUpdateCategory?: Maybe<Scalars['Boolean']>;
  adminTranslate?: Maybe<Translated>;
  adminCreateCategoryWithWords?: Maybe<Scalars['String']>;
  createWord?: Maybe<Scalars['String']>;
  adminUpdateWord?: Maybe<Scalars['Boolean']>;
  createUserWords?: Maybe<Scalars['Boolean']>;
  randomCategoryWords?: Maybe<Array<Maybe<Word>>>;
  createUserCategory?: Maybe<CreateCategoryResponse>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAdminLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationFacebookloginArgs = {
  fbUniqid: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationRevokeRefreshTokenArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  translate: TranslateInput;
};


export type MutationAdminUpdateCategoryArgs = {
  category: UpdateCategoryInput;
};


export type MutationAdminTranslateArgs = {
  text: Scalars['String'];
};


export type MutationAdminCreateCategoryWithWordsArgs = {
  category: UpdateCategoryInput;
  words: Array<TranslateInput>;
};


export type MutationCreateWordArgs = {
  category: Scalars['String'];
  translate: TranslateInput;
};


export type MutationAdminUpdateWordArgs = {
  word: UpdateWordInput;
};


export type MutationCreateUserWordsArgs = {
  user: Scalars['String'];
  category: Scalars['String'];
  word: Scalars['String'];
};


export type MutationRandomCategoryWordsArgs = {
  category: Scalars['String'];
};


export type MutationCreateUserCategoryArgs = {
  category: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getAllCategories?: Maybe<Array<Maybe<Category>>>;
  getCategoryWords?: Maybe<Array<Maybe<Word>>>;
  adminGetCategory?: Maybe<AdminCategory>;
  getAllWordsFromCategory?: Maybe<Array<Maybe<Word>>>;
  getUserCategoryWords?: Maybe<Array<Maybe<UserWord>>>;
  getSelectedCategoriesWords?: Maybe<Array<Maybe<Word>>>;
  getUserCategories?: Maybe<Array<Maybe<UserCategory>>>;
  getUserAvaliableCategories?: Maybe<Array<Maybe<UserAvaliableCategory>>>;
};


export type QueryGetCategoryWordsArgs = {
  category: Scalars['String'];
};


export type QueryAdminGetCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryGetAllWordsFromCategoryArgs = {
  category: Scalars['String'];
};


export type QueryGetUserCategoryWordsArgs = {
  category: Scalars['String'];
};


export type QueryGetSelectedCategoriesWordsArgs = {
  selected?: Maybe<Array<Scalars['String']>>;
};

export type Translate = {
  __typename?: 'Translate';
  id: Scalars['String'];
  PL: Scalars['String'];
  EN: Scalars['String'];
  GER: Scalars['String'];
  RU: Scalars['String'];
  ES: Scalars['String'];
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type Translated = {
  __typename?: 'Translated';
  PL?: Maybe<Scalars['String']>;
  EN?: Maybe<Scalars['String']>;
  GER?: Maybe<Scalars['String']>;
  RU?: Maybe<Scalars['String']>;
  ES?: Maybe<Scalars['String']>;
};

export type TranslateInput = {
  id?: Maybe<Scalars['String']>;
  PL?: Maybe<Scalars['String']>;
  EN?: Maybe<Scalars['String']>;
  GER?: Maybe<Scalars['String']>;
  RU?: Maybe<Scalars['String']>;
  ES?: Maybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  id: Scalars['String'];
  basic?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Icons>;
  translate: TranslateInput;
};

export type UpdateWordInput = {
  id: Scalars['String'];
  translate: TranslateInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  fbUniqid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type UserAvaliableCategory = {
  __typename?: 'UserAvaliableCategory';
  category: Category;
  words: Array<Maybe<Word>>;
  bought: Scalars['Boolean'];
  amount?: Maybe<Scalars['String']>;
};

export type UserCategories = {
  __typename?: 'UserCategories';
  id: Scalars['String'];
  user: User;
  category: Category;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type UserCategory = {
  __typename?: 'UserCategory';
  id: Scalars['String'];
  translate: Translate;
  basic: Scalars['Boolean'];
  bought: Scalars['Boolean'];
  icon: Scalars['String'];
};

export type UserWord = {
  __typename?: 'UserWord';
  id: Scalars['String'];
  user: User;
  category: Category;
  word: Word;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type Word = {
  __typename?: 'Word';
  id: Scalars['String'];
  category?: Maybe<Category>;
  translate: Translate;
  created_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  have?: Maybe<Scalars['Boolean']>;
};

export type CreateUserCategoryMutationVariables = Exact<{
  category: Scalars['String'];
}>;


export type CreateUserCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createUserCategory?: Maybe<(
    { __typename?: 'CreateCategoryResponse' }
    & Pick<CreateCategoryResponse, 'ok' | 'category'>
  )> }
);

export type FacebookloginMutationVariables = Exact<{
  fbUniqid: Scalars['String'];
  email: Scalars['String'];
}>;


export type FacebookloginMutation = (
  { __typename?: 'Mutation' }
  & { facebooklogin?: Maybe<(
    { __typename?: 'LogInUserResponse' }
    & Pick<LogInUserResponse, 'access_token' | 'refresh_token'>
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = (
  { __typename?: 'Query' }
  & { getAllCategories?: Maybe<Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'basic'>
    & { translate: (
      { __typename?: 'Translate' }
      & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
    ) }
  )>>> }
);

export type GetCategoryWordsQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetCategoryWordsQuery = (
  { __typename?: 'Query' }
  & { getCategoryWords?: Maybe<Array<Maybe<(
    { __typename?: 'Word' }
    & Pick<Word, 'id' | 'have'>
    & { translate: (
      { __typename?: 'Translate' }
      & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
    ), category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
      & { translate: (
        { __typename?: 'Translate' }
        & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
      ) }
    )> }
  )>>> }
);

export type GetSelectedCategoriesWordsQueryVariables = Exact<{
  selected?: Maybe<Array<Scalars['String']>>;
}>;


export type GetSelectedCategoriesWordsQuery = (
  { __typename?: 'Query' }
  & { getSelectedCategoriesWords?: Maybe<Array<Maybe<(
    { __typename?: 'Word' }
    & Pick<Word, 'id'>
    & { translate: (
      { __typename?: 'Translate' }
      & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
    ), category?: Maybe<(
      { __typename?: 'Category' }
      & { translate: (
        { __typename?: 'Translate' }
        & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
      ) }
    )> }
  )>>> }
);

export type GetUserAvaliableCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAvaliableCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserAvaliableCategories?: Maybe<Array<Maybe<(
    { __typename?: 'UserAvaliableCategory' }
    & Pick<UserAvaliableCategory, 'bought' | 'amount'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
      & { translate: (
        { __typename?: 'Translate' }
        & Pick<Translate, 'id' | 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
      ) }
    ), words: Array<Maybe<(
      { __typename?: 'Word' }
      & Pick<Word, 'id'>
      & { translate: (
        { __typename?: 'Translate' }
        & Pick<Translate, 'id' | 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
      ), category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id'>
        & { translate: (
          { __typename?: 'Translate' }
          & Pick<Translate, 'id' | 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
        ) }
      )> }
    )>> }
  )>>> }
);

export type GetUserCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserCategories?: Maybe<Array<Maybe<(
    { __typename?: 'UserCategory' }
    & Pick<UserCategory, 'id' | 'basic' | 'bought' | 'icon'>
    & { translate: (
      { __typename?: 'Translate' }
      & Pick<Translate, 'id' | 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
    ) }
  )>>> }
);

export type GetUserCategoryWordsQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetUserCategoryWordsQuery = (
  { __typename?: 'Query' }
  & { getUserCategoryWords?: Maybe<Array<Maybe<(
    { __typename?: 'UserWord' }
    & { word: (
      { __typename?: 'Word' }
      & Pick<Word, 'id'>
      & { translate: (
        { __typename?: 'Translate' }
        & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
      ) }
    ) }
  )>>> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LogInUserResponse' }
    & Pick<LogInUserResponse, 'access_token' | 'refresh_token'>
  )> }
);

export type RandomCategoryWordsMutationVariables = Exact<{
  category: Scalars['String'];
}>;


export type RandomCategoryWordsMutation = (
  { __typename?: 'Mutation' }
  & { randomCategoryWords?: Maybe<Array<Maybe<(
    { __typename?: 'Word' }
    & Pick<Word, 'id' | 'have'>
    & { translate: (
      { __typename?: 'Translate' }
      & Pick<Translate, 'PL' | 'EN' | 'GER' | 'RU' | 'ES'>
    ) }
  )>>> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'LogInUserResponse' }
    & Pick<LogInUserResponse, 'access_token' | 'refresh_token'>
  )> }
);


export const CreateUserCategoryDocument = gql`
    mutation createUserCategory($category: String!) {
  createUserCategory(category: $category) {
    ok
    category
  }
}
    `;
export type CreateUserCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>;

/**
 * __useCreateUserCategoryMutation__
 *
 * To run a mutation, you first call `useCreateUserCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserCategoryMutation, { data, loading, error }] = useCreateUserCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateUserCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>(CreateUserCategoryDocument, baseOptions);
      }
export type CreateUserCategoryMutationHookResult = ReturnType<typeof useCreateUserCategoryMutation>;
export type CreateUserCategoryMutationResult = ApolloReactCommon.MutationResult<CreateUserCategoryMutation>;
export type CreateUserCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>;
export const FacebookloginDocument = gql`
    mutation facebooklogin($fbUniqid: String!, $email: String!) {
  facebooklogin(fbUniqid: $fbUniqid, email: $email) {
    access_token
    refresh_token
  }
}
    `;
export type FacebookloginMutationFn = ApolloReactCommon.MutationFunction<FacebookloginMutation, FacebookloginMutationVariables>;

/**
 * __useFacebookloginMutation__
 *
 * To run a mutation, you first call `useFacebookloginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebookloginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookloginMutation, { data, loading, error }] = useFacebookloginMutation({
 *   variables: {
 *      fbUniqid: // value for 'fbUniqid'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFacebookloginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FacebookloginMutation, FacebookloginMutationVariables>) {
        return ApolloReactHooks.useMutation<FacebookloginMutation, FacebookloginMutationVariables>(FacebookloginDocument, baseOptions);
      }
export type FacebookloginMutationHookResult = ReturnType<typeof useFacebookloginMutation>;
export type FacebookloginMutationResult = ApolloReactCommon.MutationResult<FacebookloginMutation>;
export type FacebookloginMutationOptions = ApolloReactCommon.BaseMutationOptions<FacebookloginMutation, FacebookloginMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetAllCategoriesDocument = gql`
    query getAllCategories {
  getAllCategories {
    id
    basic
    translate {
      PL
      EN
      GER
      RU
      ES
    }
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, baseOptions);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, baseOptions);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesQueryResult = ApolloReactCommon.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetCategoryWordsDocument = gql`
    query getCategoryWords($category: String!) {
  getCategoryWords(category: $category) {
    id
    have
    translate {
      PL
      EN
      GER
      RU
      ES
    }
    category {
      id
      translate {
        PL
        EN
        GER
        RU
        ES
      }
    }
  }
}
    `;

/**
 * __useGetCategoryWordsQuery__
 *
 * To run a query within a React component, call `useGetCategoryWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWordsQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetCategoryWordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoryWordsQuery, GetCategoryWordsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoryWordsQuery, GetCategoryWordsQueryVariables>(GetCategoryWordsDocument, baseOptions);
      }
export function useGetCategoryWordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoryWordsQuery, GetCategoryWordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoryWordsQuery, GetCategoryWordsQueryVariables>(GetCategoryWordsDocument, baseOptions);
        }
export type GetCategoryWordsQueryHookResult = ReturnType<typeof useGetCategoryWordsQuery>;
export type GetCategoryWordsLazyQueryHookResult = ReturnType<typeof useGetCategoryWordsLazyQuery>;
export type GetCategoryWordsQueryResult = ApolloReactCommon.QueryResult<GetCategoryWordsQuery, GetCategoryWordsQueryVariables>;
export const GetSelectedCategoriesWordsDocument = gql`
    query getSelectedCategoriesWords($selected: [String!]) {
  getSelectedCategoriesWords(selected: $selected) {
    id
    translate {
      PL
      EN
      GER
      RU
      ES
    }
    category {
      translate {
        PL
        EN
        GER
        RU
        ES
      }
    }
  }
}
    `;

/**
 * __useGetSelectedCategoriesWordsQuery__
 *
 * To run a query within a React component, call `useGetSelectedCategoriesWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelectedCategoriesWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelectedCategoriesWordsQuery({
 *   variables: {
 *      selected: // value for 'selected'
 *   },
 * });
 */
export function useGetSelectedCategoriesWordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSelectedCategoriesWordsQuery, GetSelectedCategoriesWordsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSelectedCategoriesWordsQuery, GetSelectedCategoriesWordsQueryVariables>(GetSelectedCategoriesWordsDocument, baseOptions);
      }
export function useGetSelectedCategoriesWordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSelectedCategoriesWordsQuery, GetSelectedCategoriesWordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSelectedCategoriesWordsQuery, GetSelectedCategoriesWordsQueryVariables>(GetSelectedCategoriesWordsDocument, baseOptions);
        }
export type GetSelectedCategoriesWordsQueryHookResult = ReturnType<typeof useGetSelectedCategoriesWordsQuery>;
export type GetSelectedCategoriesWordsLazyQueryHookResult = ReturnType<typeof useGetSelectedCategoriesWordsLazyQuery>;
export type GetSelectedCategoriesWordsQueryResult = ApolloReactCommon.QueryResult<GetSelectedCategoriesWordsQuery, GetSelectedCategoriesWordsQueryVariables>;
export const GetUserAvaliableCategoriesDocument = gql`
    query getUserAvaliableCategories {
  getUserAvaliableCategories {
    category {
      id
      translate {
        id
        PL
        EN
        GER
        RU
        ES
      }
    }
    words {
      id
      translate {
        id
        PL
        EN
        GER
        RU
        ES
      }
      category {
        id
        translate {
          id
          PL
          EN
          GER
          RU
          ES
        }
      }
    }
    bought
    amount
  }
}
    `;

/**
 * __useGetUserAvaliableCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserAvaliableCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAvaliableCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAvaliableCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserAvaliableCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserAvaliableCategoriesQuery, GetUserAvaliableCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserAvaliableCategoriesQuery, GetUserAvaliableCategoriesQueryVariables>(GetUserAvaliableCategoriesDocument, baseOptions);
      }
export function useGetUserAvaliableCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserAvaliableCategoriesQuery, GetUserAvaliableCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserAvaliableCategoriesQuery, GetUserAvaliableCategoriesQueryVariables>(GetUserAvaliableCategoriesDocument, baseOptions);
        }
export type GetUserAvaliableCategoriesQueryHookResult = ReturnType<typeof useGetUserAvaliableCategoriesQuery>;
export type GetUserAvaliableCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserAvaliableCategoriesLazyQuery>;
export type GetUserAvaliableCategoriesQueryResult = ApolloReactCommon.QueryResult<GetUserAvaliableCategoriesQuery, GetUserAvaliableCategoriesQueryVariables>;
export const GetUserCategoriesDocument = gql`
    query getUserCategories {
  getUserCategories {
    id
    basic
    bought
    translate {
      id
      PL
      EN
      GER
      RU
      ES
    }
    icon
  }
}
    `;

/**
 * __useGetUserCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
      }
export function useGetUserCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
        }
export type GetUserCategoriesQueryHookResult = ReturnType<typeof useGetUserCategoriesQuery>;
export type GetUserCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserCategoriesLazyQuery>;
export type GetUserCategoriesQueryResult = ApolloReactCommon.QueryResult<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>;
export const GetUserCategoryWordsDocument = gql`
    query getUserCategoryWords($category: String!) {
  getUserCategoryWords(category: $category) {
    word {
      id
      translate {
        PL
        EN
        GER
        RU
        ES
      }
    }
  }
}
    `;

/**
 * __useGetUserCategoryWordsQuery__
 *
 * To run a query within a React component, call `useGetUserCategoryWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCategoryWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCategoryWordsQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetUserCategoryWordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserCategoryWordsQuery, GetUserCategoryWordsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserCategoryWordsQuery, GetUserCategoryWordsQueryVariables>(GetUserCategoryWordsDocument, baseOptions);
      }
export function useGetUserCategoryWordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserCategoryWordsQuery, GetUserCategoryWordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserCategoryWordsQuery, GetUserCategoryWordsQueryVariables>(GetUserCategoryWordsDocument, baseOptions);
        }
export type GetUserCategoryWordsQueryHookResult = ReturnType<typeof useGetUserCategoryWordsQuery>;
export type GetUserCategoryWordsLazyQueryHookResult = ReturnType<typeof useGetUserCategoryWordsLazyQuery>;
export type GetUserCategoryWordsQueryResult = ApolloReactCommon.QueryResult<GetUserCategoryWordsQuery, GetUserCategoryWordsQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    refresh_token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RandomCategoryWordsDocument = gql`
    mutation randomCategoryWords($category: String!) {
  randomCategoryWords(category: $category) {
    id
    have
    translate {
      PL
      EN
      GER
      RU
      ES
    }
  }
}
    `;
export type RandomCategoryWordsMutationFn = ApolloReactCommon.MutationFunction<RandomCategoryWordsMutation, RandomCategoryWordsMutationVariables>;

/**
 * __useRandomCategoryWordsMutation__
 *
 * To run a mutation, you first call `useRandomCategoryWordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRandomCategoryWordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [randomCategoryWordsMutation, { data, loading, error }] = useRandomCategoryWordsMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useRandomCategoryWordsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RandomCategoryWordsMutation, RandomCategoryWordsMutationVariables>) {
        return ApolloReactHooks.useMutation<RandomCategoryWordsMutation, RandomCategoryWordsMutationVariables>(RandomCategoryWordsDocument, baseOptions);
      }
export type RandomCategoryWordsMutationHookResult = ReturnType<typeof useRandomCategoryWordsMutation>;
export type RandomCategoryWordsMutationResult = ApolloReactCommon.MutationResult<RandomCategoryWordsMutation>;
export type RandomCategoryWordsMutationOptions = ApolloReactCommon.BaseMutationOptions<RandomCategoryWordsMutation, RandomCategoryWordsMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    access_token
    refresh_token
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;