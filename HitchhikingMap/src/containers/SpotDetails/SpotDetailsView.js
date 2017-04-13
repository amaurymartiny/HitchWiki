import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, List, ListItem, Button } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import CachedImage from 'react-native-cached-image';

import { SpotDetailsActions } from '../../ducks/SpotDetails';
import { OfflineSpotsActions } from '../../ducks/OfflineSpots';

import theme from '../../services/ThemeService';

class SpotDetailsView extends React.Component {

  static navigationOptions = {
    title: 'Spot Details',
  }

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired,
    offlineSpots: React.PropTypes.object.isRequired,
    spot: React.PropTypes.object.isRequired,
  }

  /**
   * Format date nicely (not possible to use moment.js)
   * @param  {[type]} timestamp The timestamp given by Hitchwiki API is not a ISO timestamp, but yyyymmdd
   * @return {[type]}           [description]
   */
  // TODO put in a helper function file?
  static formatDate(timestamp) {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    return `${day}.${month}.${year}`;
  }

  // TODO the API is giving back HTML, so for now we strip tags
  // We remove line breaks, remove everythign between <div></div>, and strip tags
  static stripTags(string) {
    return string.replace(/\r?\n|\r/g, '').replace(/<div.*div>/ig, '').replace(/(<([^>]+)>)/ig, '');
  }

  componentDidMount() {
    // Fetch online spot
    this.props.dispatch(SpotDetailsActions.fetchSpotDetailsRequest(this.props.navigation.state.params.spotId));
  }

  /**
   * Get Spot selector
   * @return {Object} Offline spot it exists, online spot otherwise
   */
  getSpot = () => this.props.offlineSpots[this.props.navigation.state.params.spotId] || this.props.spot

  /**
   * Get Spot selector
   * @return {Object} Offline spot it exists, online spot otherwise
   */
  getIsOffline = () => !!this.props.offlineSpots[this.props.navigation.state.params.spotId]

  render() {
    return (
      <View style={styles.fullScreen}>
        <ScrollView>
          <Card>

            <View style={[styles.center, styles.mdGutterVertical]}>
              <StarRating
                disabled
                style={styles.starRating}
                rating={this.getSpot().rating_average}
                starSize={25}
                starColor={theme.secondary}
                selectedStar={() => {}}
              />
            </View>

            <View style={[styles.center, styles.mdGutterVertical]}>
              <Text style={styles.h5}>{this.getSpot().Cities.length ? `${this.getSpot().Cities.join(', ')}, ` : ''}{this.getSpot().Country[0]}</Text>
            </View>

            {this.getIsOffline() &&
              <View style={[styles.center, styles.mdGutterVertical]}>
                <CachedImage
                  resizeMode="cover"
                  style={styles.mapImage}
                  source={{ uri: this.getSpot().metadata.mapUri }}
                  useQueryParamsInCacheKey
                />
              </View>
            }

            <View style={[styles.horizontal, styles.spaceBetween, styles.xlGutterVertical]}>
              <Text><Ionicon name="ios-thumbs-up" size={20} color={theme.secondary} /> {this.getSpot().rating_count ? `${this.getSpot().rating_count} rating${this.getSpot().rating_count > 1 ? 's' : ''}` : 'No ratings'}</Text>
              <Text><Ionicon name="ios-timer" size={20} color={theme.secondary} /> {this.getSpot().waiting_time_average ? `${this.getSpot().waiting_time_average} min` : '-'}</Text>
              <Text><Ionicon name="ios-text" size={20} color={theme.secondary} /> {this.getSpot().comment_count ? `${this.getSpot().comment_count} comment${this.getSpot().comment_count > 1 ? 's' : ''}` : 'No comments'}</Text>
            </View>

            <Text style={styles.xlGutterVertical}>{SpotDetailsView.stripTags(this.getSpot().Description) || 'No description available.'}</Text>
            <List containerStyle={styles.list}>
              {this.getSpot().comments.map(comment => (
                <ListItem
                  key={comment.comment_id}
                  leftIcon={{
                    name: 'ios-text-outline',
                    type: 'ionicon',
                    color: theme.secondary,
                    style: styles.alignTop,
                  }}
                  title={`${comment.user_name || 'Anonymous User'} on ${SpotDetailsView.formatDate(comment.timestamp)}`}
                  titleStyle={styles.small}
                  wrapperStyle={styles.alignTop}
                  subtitle={SpotDetailsView.stripTags(comment.commenttext)}
                  subtitleStyle={[styles.small, styles.subtitle]}
                  hideChevron
                />
                ))
              }
            </List>
            <Button
              backgroundColor={theme.blue}
              title={this.getIsOffline() ? 'Saved' : 'Save Offline'}
              icon={{ type: 'ionicon', name: this.getIsOffline() ? 'ios-checkmark-circle-outline' : 'ios-bookmarks' }}
              disabled={this.getIsOffline()}
              onPress={() => this.props.dispatch(OfflineSpotsActions.saveOfflineSpotRequest(this.props.navigation.state.params.spotId, this.getSpot(), this.props.navigation.state.params.latlng))}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12,
  },
  h5: {
    fontSize: 20,
    textAlign: 'center',
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
  center: {
    flex: 1,
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  mdGutterVertical: {
    marginTop: 10,
  },
  lgGutterVertical: {
    marginTop: 20,
  },
  xlGutterVertical: {
    marginTop: 40,
  },
  starRating: {
    alignSelf: 'stretch',
  },
  subtitle: {
    color: 'black',
    fontWeight: 'normal',
  },
  alignTop: {
    flex: 1,
    alignItems: 'flex-start',
  },
  list: {
    marginBottom: 15,
  },
  mapImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
  },
});

export default SpotDetailsView;
