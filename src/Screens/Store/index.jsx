import { ScrollView } from "react-native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { getProducts } from '../../Contexts/Data'
import { Card, ProductDetails } from "../../Components/Card"
import { useEffect } from "react"
import { ButtonCuston } from '../../Components/Button'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Navigator, Screen } = createSharedElementStackNavigator()

export const Store = ({ navigation }) => {
    return (
        <Navigator>
            <Screen name="Catalogo" component={Catalogo} />
            <Screen name="Detalhes" component={Detalhes} />
        </Navigator>
    )
}

export const Catalogo = ({ navigation }) => {
    const finalizeOrder = async () => {
        try {
            const sacolaValue = await AsyncStorage.getItem('sacola')
            let sacola = sacolaValue != null ? JSON.parse(sacolaValue) : {}

            const pedidoValue = await AsyncStorage.getItem('pedidos')
            let pedidos = pedidoValue != null ? JSON.parse(pedidoValue) : {}

            const uniqueId = Date.now().toString()
            pedidos[uniqueId] = sacola

            await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos))
            await AsyncStorage.setItem('sacola', JSON.stringify({}))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <ScrollView>
            {
                getProducts().map(
                    (item) => (<Card {...item} navigation={navigation} />)
                )
            }
            <ButtonCuston onPress={finalizeOrder} placeholder='Finalizar' />
        </ScrollView>
    )
}

export const Detalhes = ({ navigation, route }) => {
    const params = route.params
    useEffect(() => {
        navigation.setOptions({ headerTitle: params.title })
    }, [])
    return (<ScrollView><ProductDetails {...params} /></ScrollView>)
}
