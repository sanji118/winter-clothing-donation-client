import { FiUsers } from 'react-icons/fi'
import TeamMemberCard from './TeamMemberCard';

const TeamSection = ({ department, members }) => {
  return (
    <section className="mb-20">
      <div className="flex items-center border-b border-gray-200 pb-6 mb-8">
        <FiUsers className="text-gray-400 mr-3" size={20} />
        <h2 className="text-3xl font-light tracking-wide text-gray-800 uppercase">
          {department}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members?.map((member) => (
          <TeamMemberCard key={member._id} member={member} />
        ))}
      </div>
    </section>
  )
}

export default TeamSection;