import { QueryResult, QueryResultRow } from 'pg';

export interface HtlhubRepository {
  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<T>>;
}