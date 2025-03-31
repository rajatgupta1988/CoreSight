// src/constants/apiConfig.ts

const apiConfig = {
    history_api: '/api/mock/conversations',
    upload_api: '',
    allowed_extensions_api: '/api/allowedExtensions',
  
    data_sources_api: '/api/mock/databases',
    connect_db_api: (slug: string) => `/api/mock/databases/${slug}/connect`,
    fields_api: (slug: string, method: string) => `/api/mock/databases/${slug}/fields?method=${method}`,
  
    chat_api: '/api/mock/chat', // ✅ added for chat simulation
  }
  
  export default apiConfig
  