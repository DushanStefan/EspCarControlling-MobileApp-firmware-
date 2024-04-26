




// import Example from './ex';
import React, { useState, useEffect } from 'react';
import { Pressable,View, Text, TouchableOpacity, StyleSheet,Animated } from 'react-native';
import BluetoothSerial, { Device } from 'react-native-bluetooth-serial-next';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ActivityIndicator,MD2Colors,IconButton, MD3Colors } from 'react-native-paper';

const App: React.FC = () => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);


  

  useEffect(() => {
    const initBluetooth = async () => {
      try {
        await BluetoothSerial.requestEnable();
        const devices = await BluetoothSerial.list();

        const esp32Device = devices.find(device => device.name === 'ESP32_dush');

        if (esp32Device) {
          await BluetoothSerial.connect(esp32Device.id);
          setConnectedDevice(esp32Device);
        }
      } catch (error) {
        console.error('Bluetooth initialization error', error);
      }
    };

    initBluetooth();

    return () => {
      BluetoothSerial.disconnect();
    };
  }, []);

 

  const sendCommand = (command: string) => {
    if (connectedDevice) {
      BluetoothSerial.write(command)
        .then(() => console.log('Command sent:', command))
        .catch((error) => console.error('Write error', error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bluetooth Car Control</Text>
      {/* <View style={styles.buttonsContainer}> */}
      
      <Pressable style={styles.button}
        onPressIn={() =>sendCommand('F')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'FORWARD' : 'Forward'}</Text>
        )}
        </Pressable>

        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('B')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'BACKWARD' : 'Backward'}</Text>
        )}
        </Pressable>

        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('L')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'LEFT' : 'Left'}</Text>
        )}
        </Pressable>


        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('R')}
        onPressOut={() =>sendCommand('lost')}
        >
          {/* {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'RIGHT' : 'Right'}</Text>
        )} */}
        {({ pressed }) => (
        <>
          {/* <FontAwesomeIcon icon={ faMugSaucer } /> */}
          {/* <Icon name="arrow-right" size={30} color={pressed ? 'blue' : 'black'} /> */}
          {/* < ArrowRightAltIcon /> */}
          <IconButton
            icon="camera"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <Text style={styles.buttonText}>{pressed ? 'RIGHT' : 'Right'}</Text>
        </>
      )}
        </Pressable>


        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('S')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'STOP' : 'Stop'}</Text>
          
        )}
        </Pressable>


        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('X')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'L_ON' : 'l_on'}</Text>
          
        )}
        </Pressable>

        <Pressable style={styles.button}
        onPressIn={() =>sendCommand('Z')}
        onPressOut={() =>sendCommand('lost')}
        >
          {({pressed}) => (
          <Text style={styles.buttonText}>{pressed ? 'L_OFF' : 'l_off'}</Text>
          
        )}
        </Pressable>


        {/* <TouchableOpacity style={styles.button} onPress={() => sendCommand('F')}>
          <Text style={styles.buttonText}>Forward</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => sendCommand('B')}>
           <Text style={styles.buttonText}>Backward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => sendCommand('L')}>
          <Text style={styles.buttonText}>Left</Text>
       </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => sendCommand('R')}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => sendCommand('S')}>
          <Text style={styles.buttonText}>Stop</Text>
         </TouchableOpacity> */}


      {/* </View> */}

      
      {/* <Example/> */}
      
      {/* <IconButton
            icon="car"
            iconColor={MD3Colors.error50}
            size={100}
            onPress={() => console.log('Pressed')}
          />
      <ActivityIndicator animating={true} color={MD2Colors.red800} /> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
    },
  });

export default App;