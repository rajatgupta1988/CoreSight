'use client'

import { useEffect, useState } from 'react'
import apiConfig from '../../../constants/apiConfig'


export default function FileUploader() {
  const [allowedExtensions, setAllowedExtensions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiConfig.allowed_extensions_api)
      .then((res) => res.json())
      .then((data) => setAllowedExtensions(data))
      .catch(() => setAllowedExtensions([]))
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return

    const ext = '.' + file.name.split('.').pop()?.toLowerCase()

    if (!allowedExtensions.includes(ext)) {
      setError(`❌ File type "${ext}" is not allowed.`)
      return
    }

    alert(`✅ File accepted: ${file.name}`)
  }

  return (
    <div className="mt-4">
      <input
        type="file"
        accept={allowedExtensions.join(',')} // ✅ restrict at selection
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
