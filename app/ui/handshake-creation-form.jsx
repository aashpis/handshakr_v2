'use client'

import { useActionState } from 'react'
import { createHandshake } from '@/lib/dto'

export default function HandshakeCreationForm() {
  const [state, action, pending] = useActionState(createHandshake, undefined)

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
      <form
        action={action}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Create a Handshake</h2>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium  mb-2" htmlFor="initiatorUsername">
            Initiator Username
          </label>
          <input
            id="initiatorUsername"
            name="initiatorUsername"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2" htmlFor="acceptorUsername">
            Agreerer Username
          </label>
          <input
            id="acceptorUsername"
            name="acceptorUsername"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2" htmlFor="compensation">
            Compensation
          </label>
          <textarea
            id="compensation"
            name="compensation"
            placeholder="Enter details..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium  mb-2" htmlFor="encryptedDetails">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            placeholder="Enter details..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Creating Handshake...' : 'Create Handshake'}
        </button>

        {state?.error && <p className="text-red-500 text-center mt-4">{state.error}</p>}
      </form>
    </div>
  )
}
