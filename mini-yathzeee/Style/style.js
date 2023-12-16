import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  player: {
    color: 'Black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  title2: {
    color: 'Black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    baddingBottom: 20
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer2: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredText: {
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  centeredText2: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  centeredTextInput: {
    textAlign: 'center',
  },
  centeredButton: {
    textAlign: 'center',
  },
  buttonContainer: {
    margin: 30,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "steelblue",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonContainer2: {
    margin: 30,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonText: {
    color: "#fff",
    fontSize: 20,
  }
});

export default styles;