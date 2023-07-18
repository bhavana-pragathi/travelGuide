import {Li, Image, Name, Description} from './styledComponent'

const TravelItem = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails
  return (
    <Li>
      <Image src={imageUrl} alt={name} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Li>
  )
}

export default TravelItem
