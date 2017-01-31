import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, List, ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

import theme from '../../services/ThemeService';
import { fetchSpotDetails } from './SpotDetailsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot Details',
    },
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    Cities: PropTypes.array.isRequired,
    Country: PropTypes.array.isRequired,
    CardinalDirection: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
    rating_average: PropTypes.number,
    rating_count: PropTypes.number,
    rating_user: PropTypes.number,
    timestamp_user: PropTypes.number,
    ratings: PropTypes.array,
    waiting_time_average: PropTypes.number,
    waiting_time_count: PropTypes.number,
    comment_count: PropTypes.number,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchSpotDetails(this.props.route.params.spotId));
  }

  formatDate(timestamp) {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    return `${day}.${month}.${year}`;
  }

  render() {
    return (
      <ScrollView>
        <Card
          title={
            <Text>
              <Text h3 style={styles.primaryColor}>{this.props.Cities.length ? this.props.Cities[0] : (this.props.title || '-')}</Text>
              {'\n'}
              <Text>
                {this.props.Cities.slice(1).map(city => `${city}, `)}
                {this.props.Country.length ? this.props.Country[0] : '-'}
              </Text>
            </Text>
          }
        >

          <View style={[styles.horizontal, styles.flexStart, styles.mdGutterVertical]}>
            <StarRating
              disabled
              rating={this.props.rating_average}
              starSize={25}
              starColor={theme.secondary}
              selectedStar={() => {}}
            />
            <Text style={[styles.secondaryColor, styles.h5]}> {this.props.rating_average}/5</Text>
          </View>

          <View style={[styles.horizontal, styles.spaceBetween, styles.lgGutterVertical]}>
            <Text><FontAwesomeIcon name="thumbs-up" size={20} color={theme.secondary} /> {this.props.rating_count ? `${this.props.rating_count} rating${this.props.rating_count > 1 ? 's' : ''}` : '-'}</Text>
            <Text><FontAwesomeIcon name="hourglass-half" size={20} color={theme.secondary} /> {this.props.waiting_time_average ? `${this.props.waiting_time_average} min` : '-'}</Text>
            <Text><FontAwesomeIcon name="comments" size={20} color={theme.secondary} /> {this.props.comment_count ? `${this.props.comment_count} comment${this.props.comment_count > 1 ? 's' : ''}` : '-'}</Text>
          </View>

          <Text style={[styles.h5, styles.mdGutterVertical]}>
            <FontAwesomeIcon name="file-image-o" size={22} color={theme.secondary} />  Description
          </Text>
          <Text>{this.props.Description || 'No description available.'}</Text>
          <List>
            {this.props.comments.map((comment, index) => (
              <ListItem
                key={comment.comment_id}
                leftIcon={{
                  name: 'comment-o',
                  type: 'font-awesome',
                  color: theme.secondary,
                  style: styles.alignTop,
                }}
                title={`${comment.user_name || 'Anonymous User'} on ${this.formatDate(comment.timestamp)}`}
                titleStyle={styles.caption}
                wrapperStyle={styles.alignTop}
                subtitle={
                  <View>
                    <Text>{comment.commenttext}</Text>
                  </View>
                  }
                hideChevron
              />
              ))
            }
          </List>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  h5: {
    fontSize: 20,
  },
  primaryColor: {
    color: theme.primary,
  },
  secondaryColor: {
    color: theme.secondary,
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  mdGutterVertical: {
    marginTop: 5,
    marginBottom: 5,
  },
  lgGutterVertical: {
    marginTop: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 12,
  },
  alignTop: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default SpotDetailsView;
