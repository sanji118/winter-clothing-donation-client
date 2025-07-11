import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getCampaignBySlug } from "../../services/campaignService";


const DonateNow = () => {
  const {slug} = useParams();
  const { data = donationData = [], isLoading, isError}  = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaignBySlug(slug)
  })
  return (
    <div>DonateNow</div>
  )
}

export default DonateNow