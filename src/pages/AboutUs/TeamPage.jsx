import { useQuery } from '@tanstack/react-query'
import teamBanner from '../../../public/pageBanners/team-banner.jpg'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import PageBanner from '../../components/ui/PageBanner'
import { getTeam } from '../../services/teamService'
import TeamSection from '../../components/TeamPage/TeamSection'
import TeamCTASection from '../../components/TeamPage/TeamCTASection'

const TeamPage = () => {
  const { data: team = [], isLoading, isError } = useQuery({
    queryKey: ['team'],
    queryFn: getTeam
  })

  if (isLoading) return <LoadingState name={'Team'} />
  if (isError) return <ErrorState name={'Team'} />

  // Group team members by department
  const teamByDepartment = team.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = []
    }
    acc[member.department].push(member)
    return acc
  }, {})

  return (
    <div className="bg-white min-h-screen">
      <PageBanner image={teamBanner} title={'Our Leadership Team'} subtitle="Meet the experts driving our mission forward" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {Object.entries(teamByDepartment).map(([department, members]) => (
          <TeamSection 
            key={department} 
            department={department} 
            members={members} 
          />
        ))}
        
        <TeamCTASection />
      </div>
    </div>
  )
}

export default TeamPage