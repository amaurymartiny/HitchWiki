import React, { PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { Tile, Heading, Title, Subtitle, Text, ListView, View, RichMedia, Icon } from '@shoutem/ui';
import StarRating from 'react-native-star-rating';

import * as Actions from './SpotDetailsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot Details',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchSpotDetails(this.props.route.params.id))
  }

  render() {
    return (
      <ScrollView>
        <Tile styleName="xl-gutter">

          <Heading>{this.props.Cities.length ? this.props.Cities[this.props.Cities.length - 1] : this.props.title}</Heading>
          <Subtitle>
            {this.props.Cities.slice(0, -1).map((city) => {
              return city + ', ';
            })}
            {this.props.Country.length && this.props.Country[0]}
          </Subtitle>
          <StarRating
            disabled={true}
            rating={this.props.rating_average}
            starSize={25}
            selectedStar={() => {}}
          />
          <Text styleName="xl-gutter">{this.props.rating_count} <Icon name='ic_user_profile' /></Text>

          <Title styleName="md-gutter-top">Description</Title>
          <Text>HEdslfslkdafjdl dsafjklds fjlkdsfj ldksjf lkdsjf lksdjf alkds jfldksaj flksdfj lkdasj flkadsjf.</Text>

          <Title styleName="md-gutter-top">Comments</Title>
          <ListView
            data={this.props.comments}
            renderRow={comment => {
              return <Text>{comment.commenttext}</Text>
            }}
          />


        </Tile>
      </ScrollView>
    );
  }
}

export default SpotDetailsView;
