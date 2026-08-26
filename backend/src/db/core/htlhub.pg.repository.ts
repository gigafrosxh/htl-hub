import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import type { HtlhubRepository } from './htlhub.repository';

export const HTLHUB_PG_POOL = 'HTLHUB_PG_POOL';

@Injectable()
export class HtlhubPgRepository implements HtlhubRepository, OnModuleDestroy {
  constructor(@Inject(HTLHUB_PG_POOL) private readonly pool: Pool) {}

  /**
   * Executes a SQL query through the shared PostgreSQL connection pool.
   *
   * Values are passed separately from the SQL statement and are forwarded to
   * PostgreSQL as bind parameters. This keeps user-provided data out of the
   * SQL string and protects callers from SQL injection when used correctly.
   *
   * @param text SQL statement to execute. Use `$1`, `$2`, and so on for values.
   * @param values Optional values matching the placeholders in `text`.
   * @returns The PostgreSQL query result, including rows and row count.
   * @throws PostgreSQL errors when the statement cannot be executed.
   */
  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, values ? [...values] : undefined);
  }

  /**
   * Runs the callback inside a PostgreSQL transaction.
   *
   * The transaction is committed only when the callback resolves. Any error
   * rolls all operations back before being passed to the caller.
   */
  async withTransaction<T>(
    callback: (
      database: Pick<HtlhubRepository, 'query'>,
    ) => Promise<T>,
  ): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(new TransactionRepository(client));
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Closes every connection in the pool when NestJS shuts down.
   *
   * This prevents open database handles from keeping the Node.js process alive
   * and ensures that the pool is not reused after application shutdown starts.
   */
  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}

class TransactionRepository implements Pick<HtlhubRepository, 'query'> {
  constructor(private readonly client: PoolClient) {}

  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<T>> {
    return this.client.query<T>(text, values ? [...values] : undefined);
  }
}