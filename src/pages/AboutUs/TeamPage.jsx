import { useQuery } from '@tanstack/react-query'
import teamBanner from '../../../public/pageBanners/team-banner.jpg'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import PageBanner from '../../components/ui/PageBanner'
import { getTeam } from '../../utils/useTeam'
import { FaLinkedin, FaFacebook, FaRegEnvelope } from 'react-icons/fa'
import { FiUsers, FiClock } from 'react-icons/fi'
import badge from '../../assets/images/badge.gif'

const TeamPage = () => {
  const {data: team = [], isLoading, isError} = useQuery({
    queryKey: ['team'],
    queryFn: getTeam
  })

  if(isLoading) return <LoadingState name={'Team'} />
  if(isError) return <ErrorState name={'Team'} />

  
  const teamByDepartment = team.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen">
      <PageBanner image={teamBanner} title={'Our Leadership Team'} subtitle="Meet the experts driving our mission forward" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Department Sections */}
        {Object.entries(teamByDepartment).map(([department, members]) => (
          <section key={department} className="mb-20">
            <div className="flex items-center border-b border-gray-200 pb-6 mb-8">
              <FiUsers className="text-gray-400 mr-3" size={20} />
              <h2 className="text-3xl font-light tracking-wide text-gray-800 uppercase">
                {department}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div 
                  key={member._id}
                  className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
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
              ))}
            </div>
          </section>
        ))}
        
        {/* CTA Section */}
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
      </div>
    </div>
  )
}

export default TeamPage