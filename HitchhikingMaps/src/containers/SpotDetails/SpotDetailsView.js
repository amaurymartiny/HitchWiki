import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, List, ListItem, Button } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

import { SpotDetailsActions } from '../../ducks/SpotDetails';
import { OfflineSpotsActions } from '../../ducks/OfflineSpots';

import Background from '../../components/Background/Background';
import theme from '../../services/ThemeService';

class SpotDetailsView extends React.Component {

  static navigationOptions = {
    title: 'Spot Details',
  }

  static propTypes = {
    spot: PropTypes.any.isRequired
  }

  getSpot = () => {
    return this.props.offlineSpot || this.props.spot;
  }

  componentDidMount() {
    // fetch offline and online spot
    this.props.dispatch(OfflineSpotsActions.fetchOfflineSpot(this.props.navigation.state.params.spotId));
    this.props.dispatch(SpotDetailsActions.fetchSpotDetails(this.props.navigation.state.params.spotId));
  }

  formatDate(timestamp) {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    return `${day}.${month}.${year}`;
  }

  // TODO the API is giving back HTML, so for now we strip tags
  // We remove line breaks, remove everythign between <div></div>, and strip tags
  stripTags(string) {
    return string.replace(/\r?\n|\r/g, '').replace(/<div.*div>/ig, '').replace(/(<([^>]+)>)/ig, '');
  }

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
              <Text style={styles.h5}>{this.getSpot().Cities.join(', ')}, {this.getSpot().Country[0]}</Text>
            </View>

            <View style={[styles.horizontal, styles.spaceBetween, styles.xlGutterVertical]}>
              <Text><Ionicon name="ios-thumbs-up" size={20} color={theme.secondary} /> {this.getSpot().rating_count ? `${this.getSpot().rating_count} rating${this.getSpot().rating_count > 1 ? 's' : ''}` : '-'}</Text>
              <Text><Ionicon name="ios-timer" size={20} color={theme.secondary} /> {this.getSpot().waiting_time_average ? `${this.getSpot().waiting_time_average} min` : '-'}</Text>
              <Text><Ionicon name="ios-text" size={20} color={theme.secondary} /> {this.getSpot().comment_count ? `${this.getSpot().comment_count} comment${this.getSpot().comment_count > 1 ? 's' : ''}` : '-'}</Text>
            </View>

            <Text style={[styles.h5, styles.xlGutterVertical]}>Description</Text>
            <Text>{this.stripTags(this.getSpot().Description) || 'No description available.'}</Text>
            <List containerStyle={styles.list}>
              {this.getSpot().comments.map((comment, index) => (
                <ListItem
                  key={comment.comment_id}
                  leftIcon={{
                    name: 'ios-text-outline',
                    type: 'ionicon',
                    color: theme.secondary,
                    style: styles.alignTop,
                  }}
                  title={`${comment.user_name || 'Anonymous User'} on ${this.formatDate(comment.timestamp)}`}
                  titleStyle={styles.small}
                  wrapperStyle={styles.alignTop}
                  subtitle={this.stripTags(comment.commenttext)}
                  subtitleStyle={[styles.small, styles.subtitle]}
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
              onPress={() => this.props.dispatch(OfflineSpotsActions.saveOfflineSpot(this.props.navigation.state.params.spotId, this.getSpot()))}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12
  },
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
  center: {
    flex: 1,
    alignItems: 'center'
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
    fontWeight: 'normal'
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
