// /api/mock/databases/route.ts

export async function GET() {
  const dbs = [
    {
      name: 'PostgreSQL',
      slug: 'postgres',
      icon: '/icons/postgresql.svg',
      methods: ['Credentials', 'API', 'SSH Tunnel']
    },
    {
      name: 'MongoDB',
      slug: 'mongo',
      icon: '/icons/mongodb.svg',
      methods: ['API', 'Cloud Connect']
    },
    {
      name: 'MySQL',
      slug: 'mysql',
      icon: '/icons/mysql.svg',
      methods: ['Credentials', 'Marketplace App']
    },
    {
      name: 'Snowflake',
      slug: 'snowflake',
      icon: '/icons/snowflake.svg',
      methods: ['Credentials']
    }
  ];

  return Response.json(dbs);
}
