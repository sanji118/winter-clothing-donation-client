import { FiUsers } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa'

const TeamCTASection = () => {
  return (
    <div className="mt-24 text-center bg-gray-50 p-12 rounded-xl border border-gray-100">
      <h3 className="text-2xl font-light text-gray-900 mb-4">Join Our Growing Team</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        We're always looking for passionate individuals to help us expand our impact.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="flex items-center bg-gray-900 text-white font-medium py-2.5 px-8 rounded hover:bg-gray-800 transition-colors">
          <FiUsers className="mr-2" size={16} />
          View Open Positions
        </button>
        <button className="flex items-center border border-gray-300 text-gray-700 font-medium py-2.5 px-8 rounded hover:bg-gray-50 transition-colors">
          <FaRegEnvelope className="mr-2" size={16} />
          Contact HR
        </button>
      </div>
    </div>
  )
}

export default TeamCTASection;