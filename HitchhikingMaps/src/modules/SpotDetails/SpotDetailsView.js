import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, List, ListItem, Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

import theme from '../../services/ThemeService';
import { fetchSpotDetails } from './SpotDetailsState';
import { fetchOfflineSpot, saveOfflineSpot } from '../OfflineSpots/OfflineSpotsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot Details',
    },
  }

  static propTypes = {
    spot: PropTypes.any.isRequired
  }

  getSpot = () => {
    return this.props.offlineSpot || this.props.spot;
  }

  componentDidMount() {
    // fetch offline and online spot
    this.props.dispatch(fetchOfflineSpot(this.props.route.params.spotId));
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
              <Text h3 style={styles.primaryColor}>{this.getSpot().Cities.length ? this.getSpot().Cities[0] : (this.getSpot().title || '-')}</Text>
              {'\n'}
              <Text>
                {this.getSpot().Cities.slice(1).map(city => `${city}, `)}
                {this.getSpot().Country.length ? this.getSpot().Country[0] : '-'}
              </Text>
            </Text>
          }
        >

          <View style={[styles.horizontal, styles.flexStart, styles.mdGutterVertical]}>
            <StarRating
              disabled
              rating={this.getSpot().rating_average}
              starSize={25}
              starColor={theme.secondary}
              selectedStar={() => {}}
            />
            <Text style={[styles.secondaryColor, styles.h5]}> {this.getSpot().rating_average}/5</Text>
          </View>

          <View style={[styles.horizontal, styles.spaceBetween, styles.lgGutterVertical]}>
            <Text><FontAwesomeIcon name="thumbs-up" size={20} color={theme.secondary} /> {this.getSpot().rating_count ? `${this.getSpot().rating_count} rating${this.getSpot().rating_count > 1 ? 's' : ''}` : '-'}</Text>
            <Text><FontAwesomeIcon name="hourglass-half" size={20} color={theme.secondary} /> {this.getSpot().waiting_time_average ? `${this.getSpot().waiting_time_average} min` : '-'}</Text>
            <Text><FontAwesomeIcon name="comments" size={20} color={theme.secondary} /> {this.getSpot().comment_count ? `${this.getSpot().comment_count} comment${this.getSpot().comment_count > 1 ? 's' : ''}` : '-'}</Text>
          </View>

          <Text style={[styles.h5, styles.mdGutterVertical]}>
            <FontAwesomeIcon name="file-image-o" size={22} color={theme.secondary} />  Description
          </Text>
          <Text>{this.getSpot().Description || 'No description available.'}</Text>
          <List containerStyle={styles.list}>
            {this.getSpot().comments.map((comment, index) => (
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
          <Button
            backgroundColor={theme.blue}
            title={this.props.offlineSpot ? 'Saved' : 'Save Offline'}
            icon={{ 'type': 'ionicon', name: this.props.offlineSpot ? 'ios-checkmark-circle-outline' :'ios-bookmarks' }}
            disabled={!!this.props.offlineSpot}
            onPress={() => this.props.dispatch(saveOfflineSpot(this.props.route.params.spotId, this.getSpot()))}
          />
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
  list: {
    marginBottom: 15
  }
});

export default SpotDetailsView;
