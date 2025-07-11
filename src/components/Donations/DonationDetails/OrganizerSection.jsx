

const OrganizerSection = ({organizer}) => {
  return (
    <div className="relative bg-pink-100 rounded-3xl p-8 text-center overflow-hidden">
        <div className="absolute font-bold underdog text-xl bg-cyan-900 p-5 text-white rotate-[-50deg] w-70 -left-20 ">Organizer:</div>
        <div>
            <img src={organizer.avatar} alt={organizer.name} className="w-35 h-35 rounded-full mx-auto mb-5"/>
            <h1 className="font-bold md:text-xl py-2">{organizer.name}</h1>
            <p className="opacity-80">{organizer.organization}</p>
            <p className="opacity-80">Contact no : {organizer.phone}</p>
        </div>
    </div>
  )
}

export default OrganizerSection