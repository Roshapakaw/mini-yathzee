import {Text,View} from 'react-native';
import styles from '../Style/style';

export default function Footer() {
    return(
        <View style={styles.footer}>
            <Text style={styles.author}>Author: Teemu Rajaniemi</Text>
        </View>
    )
}