import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { getData, setData } from '../Contexts/Data'
import { Style } from '../Contexts/Theme';
import { ButtonCuston } from '../Components/Button';

export const Home = ({ navigation }) => {
    var user_ = {}
    useEffect(() => {
        const CallBack = (user) => {
            if (!user) {
                navigation.navigate('Register')
                return false
            }
            if (!user.login) {
                navigation.navigate('Login')
                return false
            }
            user_ = user
        }
        getData(CallBack, 'user')
    })
    const onPress = () => {
        user_.login = false
        setData('user', user_)
        navigation.navigate('Login')
    }

    return (
        <View style={Style.container}>
            <Text>LOJA DE PRODUTOS</Text>
            <ButtonCuston onPress={onPress} placeholder='Logoff' />
            <StatusBar style="auto" />
        </View>
    );
}
