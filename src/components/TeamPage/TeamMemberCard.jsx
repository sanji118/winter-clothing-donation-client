import { FaLinkedin, FaFacebook, FaRegEnvelope } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import badge from '../../assets/images/badge.gif'

const TeamMemberCard = ({ member }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-w-3 aspect-h-4 relative">
        <div className='absolute -top-8 -right-8 w-24 h-24 z-10'><img src={badge} alt="" /></div>
        <img 
          src={member.photo} 
          alt={member.name}
          className="w-full h-80 object-cover object-top grayscale-[20%] group-hover:grayscale-80 transition-all duration-500 rounded-2xl"
        />
      </div>
      
      <div className="p-6 bg-orange-50">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-orange-600 font-medium">{member.position}</p>
            
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <FiClock className="mr-1.5" size={14} />
              <span>
                {member.years_with_org} {member.years_with_org === 1 ? 'year' : 'years'} with us
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {member.social?.linkedin && (
              <a 
                href={member.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-700 transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {member.social?.facebook && (
              <a 
                href={member.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors"
                aria-label={`${member.name}'s Facebook`}
              >
                <FaFacebook size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          {member.bio}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a 
            href={`mailto:${member.email}`} 
            className="inline-flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
          >
            <FaRegEnvelope className="mr-2" size={14} />
            Contact {member.name.split(' ')[0]}
          </a>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberCard