import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'
import {MainDiv, Heading, LoaderContainer, Ul} from './styledComponents'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {travelData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({travelData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {travelData} = this.state
    return (
      <Ul>
        {travelData.map(eachItem => (
          <TravelItem key={eachItem.id} travelDetails={eachItem} />
        ))}
      </Ul>
    )
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderTravelPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <MainDiv>
        <Heading>Travel Guide</Heading>
        {this.renderTravelPage()}
      </MainDiv>
    )
  }
}

export default TravelGuide
