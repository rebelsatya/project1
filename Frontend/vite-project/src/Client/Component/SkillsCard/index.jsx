import './index.css'

const SkillsCard = props => {
  const {g} = props
  const {imageUrl, name} = g
  return (
    <li className="bg-container-skill">
      <img src={imageUrl} className="img-SkillIcon" alt={name} />
      <h1>{name}</h1>
    </li>
  )
}
export default SkillsCard
