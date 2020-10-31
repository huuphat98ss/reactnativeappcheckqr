import React, {Component} from 'react';

import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  Alert,
  View,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkInfor: '',
      showData: false,
      count: 1,
      resdata: 'not',
      // data: [],
      // isLoading: true,
    };
  }
  // componentDidMount = () => {
  //   fetch('http://192.168.1.4:3456/search')
  //     // .then((res) => {
  //     //   console.log('a b c :' + res);
  //     //   this.setState({resdata: 'ok'});
  //     // })
  //     // .catch((error) => console.error(error));
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log('a b c :' + json);
  //       this.setState({resdata: json});
  //     })
  //     .catch((error) => console.error(error));
  //   // .finally(() => {
  //   //   this.setState({isLoading: false});
  //   // });
  // };
  // componentDidMount() {
  //   fetch('https://reactnative.dev/movies.json')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({data: json.movies});
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => {
  //       this.setState({isLoading: false});
  //     });
  // }

  changeShowData = () => {
    this.setState({showData: true});
  };
  changeCountLink = (data) => {
    if (this.state.linkInfor === data) {
      return this.setState({count: this.state.count + 1});
    } else {
      return this.setState({count: 1});
    }
  };
  ifScaned = (e) => {
    this.changeShowData();
    this.changeCountLink(e.data);
    this.setState({linkInfor: e.data});
  };
  onPressLink = async (data) => {
    // Linking.openURL(`http://192.168.0.187:3456/search?${data}`).catch((err) =>
    //   Alert.alert('QR convert', data),
    // );
    console.log(data);
    Linking.openURL(`http://192.168.1.5:4345/search/${data}`).catch((err) =>
      Alert.alert('QR convert', data),
    );
    // Linking.openURL(`http://localhost:3456/search?${data}`)
    //   .then((dataresult) => {
    //     return ` <h1>${dataresult.dataCoopare.Owner}</h1>`;
    //   })
    //   .catch((err) => console.error('An error occurred', err));
    //console.log(data);
    // try {
    //   console.log(data);
    //   let res = await fetch(`http://192.168.0.187:3456/search?${data}`);
    //   let result = await res.json();
    //   // console.log(result);
    //   let dataresult = () => {
    //     return `htx ${result.dataCoopare.nameOfCooperative}, chu nong ho: ${result.dataFarmer.farmOwner}`;
    //   };
    //   Alert.alert('ket qua tim duoc', dataresult());
    //   if (result.success) {
    //     this.setState({resdata: 'success'});
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert('error', 'ma khong hop le');
    // }
  };
  render() {
    // const {data, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <QRCodeScanner
            containerStyle={{backgroundColor: '#FFF'}}
            onRead={this.ifScaned}
            reactivate={true} // first time true
            permissionDialogMessage="need premission to Access Camera"
            reactivateTimeout={2000}
            showMarker={true}
            markerStyle={{borderColor: '#FFF', borderRadius: 10}}
            // bottomContent={
            //   <TouchableOpacity>
            //     <Text style={{fontSize: 21, color: 'rgb(0,122,255)'}}>
            //       Scan QRCode
            //     </Text>
            //   </TouchableOpacity>
            // }
          />
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Kết quả tìm được</Text>
              {this.state.showData ? (
                <TouchableHighlight
                  style={styles.sectionDescription}
                  onPress={() => this.onPressLink(this.state.linkInfor)}>
                  <Text style={styles.touchLink}>
                    {' '}
                    <Text style={styles.countAlert}>
                      {this.state.count === 1
                        ? null
                        : `(` + this.state.count + `)`}
                    </Text>{' '}
                    click vào link này{' '}
                    <Text style={styles.highlight}>{this.state.linkInfor}</Text>{' '}
                    để xem chi tiế t sản phẩm
                  </Text>
                </TouchableHighlight>
              ) : null}
            </View>
            <View>
              <Text>connect server is abc: {this.state.resdata}</Text>
              {/* <FlatList
                data={this.state.resdata}
                // keyExtractor={({id}, index) => id}
                renderItem={({item}) => <Text>{item.email}</Text>}
              /> */}
            </View>
            {/* <View style={{flex: 1, padding: 24}}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={data}
                  keyExtractor={({id}, index) => id}
                  renderItem={({item}) => (
                    <Text>
                      {item.title}, {item.releaseYear}
                    </Text>
                  )}
                />
              )}
            </View>
         */}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  header: {
    flex: 6,
    alignItems: 'center',
  },
  body: {
    backgroundColor: Colors.white,
    flex: 4,
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    flex: 1,
    margin: 10,
    color: Colors.dark,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  touchLink: {
    backgroundColor: '#FFF',
    paddingBottom: 10,
  },
  countAlert: {
    color: 'red',
    fontWeight: '700',
  },
  highlight: {
    fontWeight: '700',
    color: 'red',
  },
});
export default App;
