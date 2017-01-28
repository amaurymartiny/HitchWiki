import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Icon, List, ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

import theme from '../../config/theme';
import { fetchSpotDetails } from './SpotDetailsState';

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
    this.props.dispatch(fetchSpotDetails(this.props.route.params.id));
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
        <Card
          title={
            <Text>
              <Text h3 style={styles.primaryColor}>{this.props.Cities.length ? this.props.Cities[this.props.Cities.length - 1] : (this.props.title || '-')}</Text>
              {"\n"}
              <Text>
                {this.props.Cities.slice(0, -1).map((city) => {
                  return city + ', ';
                })}
                {this.props.Country.length ? this.props.Country[0] : '-'}
              </Text>
            </Text>
          }
        >

          <View style={[styles.horizontal, styles.flexStart, styles.mdGutterVertical]}>
            <StarRating
              disabled={true}
              rating={this.props.rating_average}
              starSize={25}
              starColor={theme.secondary}
              selectedStar={() => {}}
            />
            <Text style={[styles.secondaryColor, styles.h5]}> {this.props.rating_average}/5</Text>
          </View>

          <View style={[styles.horizontal, styles.spaceBetween, styles.lgGutterVertical]}>
            <Text><FontAwesomeIcon name='thumbs-up' size={20} color={theme.secondary}/> {this.props.rating_count ? this.props.rating_count + ' ratings' : '-'}</Text>
            <Text><FontAwesomeIcon name='hourglass-half' size={20} color={theme.secondary}/> {this.props.waiting_time_average ? this.props.waiting_time_average + ' min' : '-'}</Text>
            <Text><FontAwesomeIcon name='comments' size={20} color={theme.secondary}/> {this.props.comment_count ? this.props.comment_count + ' comments' : '-'}</Text>
          </View>

          <Text style={[styles.h5, styles.mdGutterVertical]}>
            <FontAwesomeIcon name="file-image-o" size={22} color={theme.secondary} />  Description
          </Text>
          <Text>{this.props.Description || 'No description available.'}</Text>
          <List>
            {this.props.comments.map((comment, index) => {
              return(
                <ListItem
                  key={comment.comment_id}
                  leftIcon={{
                    name: 'comment-o',
                    type: 'font-awesome',
                    color: theme.secondary,
                    style: styles.alignTop
                  }}
                  title={(comment.user_name || 'Anonymous User') + ' on ' + this._formatDate(comment.timestamp)}
                  titleStyle={styles.caption}
                  wrapperStyle={styles.alignTop}
                  subtitle={
                    <View>
                      <Text>{comment.commenttext}</Text>
                    </View>
                  }
                  hideChevron={true}
                />
              )
            })}
          </List>
        </Card>

        {/*
        <Tile styleName='xl-gutter'>
          <Heading></Heading>
          <Subtitle>
            
            
          </Subtitle>
          <View styleName='horizontal space-between'>
            <Text><RNIcon name='thumbs-o-up' size={20} /> {this.props.rating_count}</Text>
            <Text><RNIcon name='comments-o' size={20} /> {this.props.comment_count}</Text>
            <Text><RNIcon name='hourglass-half' size={20} /> {this.props.waiting_time_average}</Text>
          </View>
        </Tile>

        <Divider styleName='section-header' />

        <Tile styleName='md-gutter'>
          <Title></Title>
          <Text styleName='md-gutter-vertical'></Text>

          
        </Tile>
      */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  h5: {
    fontSize: 20,
  },
  primaryColor: {
    color: theme.primary
  },
  secondaryColor: {
    color: theme.secondary
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row'
  },
  spaceBetween: {
    justifyContent: 'space-between'
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
    fontSize: 12
  },
  alignTop: {
    flex: 1,
    alignItems: 'flex-start'
  }
});

export default SpotDetailsView;
