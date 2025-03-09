import { Copy, MoreVertical, Trash2 } from "lucide-react"

export default function AgentsDetails() {
  // Placeholder data (replace with actual API call in a real implementation)
  const apiData = {
    name: "Dania",
    start_first: true,
    first_sentence: "Hello, how can I assist you today?",
    agent_type: "basic",
    who_are_you: "I am Ava, an AI assistant.",
    goal: "To provide helpful information and assistance.",
    steps: "1. Listen to user query 2. Process information 3. Respond accurately",
    allow_interruptions: true,
    voice: "dania",
    support_data: "Additional support information",
    agent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    project_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    created_by_email: "creator@example.com",
    created_at: "2025-03-07T12:44:09.210Z",
    last_update: "2025-03-07T12:44:09.210Z",
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff] text-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{apiData.name}</h1>
          <div className="flex items-center gap-2">
            {/* <button className="bg-[#5BA89D] hover:bg-[#4A9589] text-white rounded-md px-4 py-2 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                  fill="white"
                />
              </svg>
              Talk with Assistant
            </button> */}
            <MoreVertical className="text-gray-600" />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-2">Assistant ID</p>
          <div className="flex items-center">
            <div className="bg-white/30 rounded-md py-2 px-3 flex items-center gap-2 text-gray-700">
              <span>{apiData.agent_id}</span>
              <button className="text-gray-500">
                <Copy size={16} />
              </button>
              <button className="text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M15 3H21V9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 14L21 3" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white/30 rounded-lg p-4 shadow">
            <h2 className="text-xl font-medium mb-2">Assistant Details</h2>
            <p>
              <strong>Type:</strong> {apiData.agent_type}
            </p>
            <p>
              <strong>Voice:</strong> {apiData.voice}
            </p>
            <p>
              <strong>Allows Interruptions:</strong> {apiData.allow_interruptions ? "Yes" : "No"}
            </p>
            <p>
              <strong>First Sentence:</strong> {apiData.first_sentence}
            </p>
          </div>

          <div className="bg-white/30 rounded-lg p-4 shadow">
            <h2 className="text-xl font-medium mb-2">Assistant Purpose</h2>
            <p>
              <strong>Who:</strong> {apiData.who_are_you}
            </p>
            <p>
              <strong>Goal:</strong> {apiData.goal}
            </p>
            <p>
              <strong>Steps:</strong> {apiData.steps}
            </p>
          </div>
        </div>

        <div className="bg-white/30 rounded-lg p-4 mb-8 shadow">
          <h2 className="text-xl font-medium mb-2">Additional Information</h2>
          <p>
            <strong>Project ID:</strong> {apiData.project_id}
          </p>
          <p>
            <strong>Created By:</strong> {apiData.created_by_email}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(apiData.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong> {new Date(apiData.last_update).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white/30 rounded-md px-4 py-2 text-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#5BA89D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#5BA89D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#5BA89D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Model</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Transcriber</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10v2a7 7 0 0 1-14 0v-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="19"
                  x2="12"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="23"
                  x2="16"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Voice</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-[#5BA89D] hover:bg-[#4A9589] text-white rounded-md px-4 py-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Update
            </button>
            <button className="text-gray-600">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <div className="text-gray-600 text-sm p-4 pt-0">
          Last updated {new Date(apiData.last_update).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

