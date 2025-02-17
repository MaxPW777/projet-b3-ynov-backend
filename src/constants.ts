export class Constants {
  public static readonly DATABASE_NAME = process.env.DATABASE_NAME;
  public static readonly DATABASE_PORT = 5432;
  public static readonly DATABASE_HOST = process.env.DATABASE_HOST;
  public static readonly DATABASE_USER =
    process.env.DATABASE_USER || 'postgres';
  public static readonly DATABASE_PASSWORD =
    process.env.DATABASE_PASSWORD || 'postgres';
}
