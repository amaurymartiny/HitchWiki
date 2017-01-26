import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Icon, List, ListItem } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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
              <Text h3>{this.props.Cities.length ? this.props.Cities[this.props.Cities.length - 1] : this.props.title}</Text>
              {"\n"}
              <Text>
                {this.props.Cities.slice(0, -1).map((city) => {
                  return city + ', ';
                })}
                {this.props.Country.length && this.props.Country[0]}
              </Text>
              {"\n"}
              <Text style={{justifyContent: 'space-between'}}>
                <Text><MaterialIcon name='thumb-up' size={20} /> {this.props.rating_count}</Text>
                <Text><MaterialIcon name='chat-bubble-outline' size={20} /> {this.props.comment_count}</Text>
                <Text><MaterialIcon name='av-timer' size={20} /> {this.props.waiting_time_average}</Text>
              </Text>
            </Text>
          }
        >

          <View style={styles.horizontal}>
            <StarRating
              disabled={true}
              rating={this.props.rating_average}
              starSize={25}
              selectedStar={() => {}}
            />
            <View>
              <Text><MaterialIcon name='thumb-up' size={20} /> {this.props.rating_count}</Text>
              <Text><MaterialIcon name='chat-bubble-outline' size={20} /> {this.props.comment_count}</Text>
              <Text><MaterialIcon name='av-timer' size={20} /> {this.props.waiting_time_average}</Text>
            </View>
          </View>

          <Text h4><MaterialIcon name="description" size={20} style={{marginTop: 5}} /> Description</Text>
          <Text>{this.props.Description || 'No description available.'}</Text>
          <List>
            {this.props.comments.map((comment, index) => {
              return(
                <ListItem
                  key={comment.comment_id}
                  leftIcon={{
                    name: 'chat-bubble-outline',
                    color: 'black',
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
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
