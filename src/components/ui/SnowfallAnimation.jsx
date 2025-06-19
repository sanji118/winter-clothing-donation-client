
import ReactSnowfall from 'react-snowfall'

const SnowfallAnimation = () => {
  return (
    <div>
        <ReactSnowfall 
        color="#A8DADC" 
        snowflakeCount={60} 
        style={{ position: 'fixed' }} 
      />
    </div>
  )
}

export default SnowfallAnimation