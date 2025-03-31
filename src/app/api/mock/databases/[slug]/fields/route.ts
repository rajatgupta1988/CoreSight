// src/app/api/mock/databases/[slug]/fields/route.ts

export async function GET(_: Request, context: { params: { slug: string } }) {
    const { slug } = context.params
  
    const dbFieldsMap: Record<string, any[]> = {
      postgres: [
        { name: 'host', label: 'Host', type: 'text' },
        { name: 'port', label: 'Port', type: 'number' },
        { name: 'username', label: 'Username', type: 'text' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'dbname', label: 'Database Name', type: 'text' },
      ],
      mongo: [
        { name: 'url', label: 'Connection URL', type: 'text' },
        { name: 'useSRV', label: 'Use SRV Record?', type: 'checkbox' }
      ],
      mysql: [
        { name: 'host', label: 'Host', type: 'text' },
        { name: 'port', label: 'Port', type: 'number' },
        { name: 'user', label: 'User', type: 'text' },
        { name: 'pass', label: 'Password', type: 'password' },
        { name: 'schema', label: 'Schema', type: 'text' }
      ],
      snowflake: [
        { name: 'account', label: 'Account', type: 'text' },
        { name: 'user', label: 'Username', type: 'text' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'warehouse', label: 'Warehouse', type: 'text' },
      ]
    }
  
    return Response.json(dbFieldsMap[slug] ?? [])
  }
  