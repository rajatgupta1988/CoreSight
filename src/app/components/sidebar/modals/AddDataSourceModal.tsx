

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import apiConfig from '../../../../constants/apiConfig'

interface DatabaseOption {
  name: string
  slug: string
  icon: string
  methods: string[]
}

interface Field {
  name: string
  label: string
  type: string
}

export default function AddDataSourceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState<'chooseDb' | 'chooseMethod' | 'form'>('chooseDb')
  const [loading, setLoading] = useState(false)
  const [databases, setDatabases] = useState<DatabaseOption[]>([])
  const [selectedDb, setSelectedDb] = useState<DatabaseOption | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [fields, setFields] = useState<Field[]>([])
  const [form, setForm] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      // reset everything
      setStep('chooseDb')
      setSelectedDb(null)
      setSelectedMethod(null)
      setFields([])
      setForm({})
      setLoading(true)
  
      // fetch database options
      fetch(apiConfig.data_sources_api)
        .then((res) => res.json())
        .then((data) => {
          setDatabases(data)
          setLoading(false)
        })
    }
  }, [isOpen])
  

  const handleDbSelect = (db: DatabaseOption) => {
    setSelectedDb(db)
    setStep('chooseMethod')
  }

  const handleMethodSelect = async (method: string) => {
    setSelectedMethod(method)
    setStep('form')
    setLoading(true)
    const res = await fetch(apiConfig.fields_api(selectedDb!.slug, method))
    const data = await res.json()
    setFields(data)
    const initialValues = Object.fromEntries(data.map((f: Field) => [f.name, '']))
    setForm(initialValues)
    setLoading(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    alert(`✅ Connected to ${selectedDb?.name} via ${selectedMethod}\n\n${JSON.stringify(form, null, 2)}`)
    onClose()
  }

  const reset = () => {
    setStep('chooseDb')
    setSelectedDb(null)
    setSelectedMethod(null)
    setFields([])
    setForm({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[450px] max-w-[95%] text-black shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {step === 'chooseDb'
            ? 'Select a Database'
            : step === 'chooseMethod'
            ? `Choose connection method for ${selectedDb?.name}`
            : `Connect to ${selectedDb?.name} (${selectedMethod})`}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : step === 'chooseDb' ? (
          <div className="grid grid-cols-3 gap-4">
            {databases.map((db) => (
              <div
                key={db.slug}
                onClick={() => handleDbSelect(db)}
                className="cursor-pointer hover:scale-105 transition flex flex-col items-center"
              >
                <Image src={db.icon} alt={db.name} width={40} height={40} />
                <span className="text-sm mt-1">{db.name}</span>
              </div>
            ))}
          </div>
        ) : step === 'chooseMethod' ? (
          <div className="flex flex-col gap-2">
            {selectedDb?.methods.map((method) => (
              <button
                key={method}
                onClick={() => handleMethodSelect(method)}
                className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 text-left"
              >
                {method}
              </button>
            ))}
            <button
              onClick={reset}
              className="text-sm text-gray-500 mt-4 hover:underline self-start"
            >
              ← Back to databases
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {fields.map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={form[field.name] ?? ''}
                  onChange={handleInput}
                  type={field.type}
                  placeholder={field.label}
                  className="w-full border px-3 py-2 rounded"
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep('chooseMethod')}
                className="text-sm text-gray-500"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Connect
              </button>
            </div>
          </>
        )}

        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-gray-500 text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
