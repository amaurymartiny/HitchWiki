import React, { PropTypes } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card} from 'react-native-elements';
import RNIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import * as moment from 'moment';

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

  _formatDate(timestamp) {
    const year = timestamp.substring(0,4);
    const month = timestamp.substring(4,6);
    const day = timestamp.substring(6,8);
    return day + '.' + month + '.' + year;
  }

  render() {
    return (
      <ScrollView>

        <Card>
          <Text>Test</Text>
        </Card>

        {/*
        <Tile styleName='xl-gutter'>
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
          <View styleName='horizontal space-between'>
            <Text><RNIcon name='thumbs-o-up' size={20} /> {this.props.rating_count}</Text>
            <Text><RNIcon name='comments-o' size={20} /> {this.props.comment_count}</Text>
            <Text><RNIcon name='hourglass-half' size={20} /> {this.props.waiting_time_average}</Text>
          </View>
        </Tile>

        <Divider styleName='section-header' />

        <Tile styleName='md-gutter'>
          <Title><RNIcon name='pencil-square' size={18} /> Description</Title>
          <Text styleName='md-gutter-vertical'>{this.props.Description || 'No description available.'}</Text>

          {this.props.comments.map((comment, index) => {
            return(
              <Row key={comment.comment_id}>
                <Icon name='comment' styleName='top' />
                <View styleName='vertical'>
                  <View styleName='horizontal space-between'>
                    <Subtitle>{comment.user_name || 'Anonymous User'}</Subtitle>
                    <Caption>{this._formatDate(comment.timestamp)}</Caption>
                  </View>
                  <Text styleName='multiline'>{comment.commenttext}</Text>
                </View>
                <Divider styleName='line' />
              </Row>
            )
          })}
        </Tile>
      */}
      </ScrollView>
    );
  }
}

export default SpotDetailsView;
