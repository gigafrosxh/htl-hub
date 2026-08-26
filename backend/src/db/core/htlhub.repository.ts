import { QueryResult, QueryResultRow } from 'pg';

export interface HtlhubRepository {
  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<T>>;

  /** Executes several database operations atomically in one transaction. */
  withTransaction<T>(
    callback: (
      database: Pick<HtlhubRepository, 'query'>,
    ) => Promise<T>,
  ): Promise<T>;
}